import { PROJECTS, type Project } from "@/constants";
import { SITE } from "@/config";

// The hub collects its own project list: every repo of the owner whose GitHub
// homepage is a site under https://mnaoumov.dev/ is listed, so a new site shows
// up on the next (daily) build without anyone editing this repo. The repos
// themselves know nothing about the hub.

const OWNER = "mnaoumov";
const NPM_SCOPE = "@mnaoumov";

interface ProjectOverride {
  title?: string;
  description?: string;
  // Mark a repo retired before its npm package is deprecated.
  retired?: boolean;
  // Repo names whose sites replace a retired one.
  replacements?: string[];
}

// Wording overrides, keyed by repo name. Anything not listed here comes from
// the repo itself.
const OVERRIDES: Record<string, ProjectOverride> = {
  "mathdoku-online-calculator": {
    title: "MathDoku Online Calculator",
    description: "Online solver and calculator for MathDoku (KenKen) puzzles.",
  },
  "obsidian-dev-utils": {
    description:
      "Retired: split into five packages, each with its own documentation site.",
    retired: true,
    replacements: [
      "typescript-lib",
      "typescript-test-toolkit",
      "typescript-dev-toolkit",
      "obsidian-lib",
      "obsidian-dev-toolkit",
    ],
  },
  "obsidian-integration-testing": {
    description:
      "Run your plugin's tests inside a real, running Obsidian — desktop or Android.",
  },
  "obsidian-test-mocks": {
    description:
      "In-memory implementations of every class and function in obsidian.d.ts.",
  },
};

// Words the title-casing of a repo name would get wrong.
const TITLE_WORDS: Record<string, string> = {
  typescript: "TypeScript",
};

const HOMEPAGE_CHECK_ATTEMPTS = 3;

interface GitHubRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  archived: boolean;
  fork: boolean;
}

interface NpmPackument {
  "dist-tags"?: { latest?: string };
  repository?: { url?: string };
  versions?: Record<string, { deprecated?: string }>;
}

let projectsPromise: Promise<Project[]> | undefined;

export default function getProjects(): Promise<Project[]> {
  projectsPromise ??= loadProjects();
  return projectsPromise;
}

async function loadProjects(): Promise<Project[]> {
  let repoProjects: Project[];
  try {
    repoProjects = await loadRepoProjects();
  } catch (error) {
    // CI must not deploy a hub that silently lost its list; a local build may
    // be offline.
    if (process.env.CI) {
      throw error;
    }
    warn(`Could not load the repo project list: ${String(error)}`);
    repoProjects = [];
  }
  return [...PROJECTS, ...repoProjects];
}

async function loadRepoProjects(): Promise<Project[]> {
  const repos = (await fetchRepos()).filter(
    repo => !repo.fork && isSiteHomepage(repo.homepage)
  );

  const projects = await Promise.all(
    repos.map(async repo => {
      const override = OVERRIDES[repo.name] ?? {};
      const deprecation = await fetchNpmDeprecation(repo.name);
      const project: Project = {
        title: override.title ?? toTitle(repo.name),
        href: repo.homepage ?? "",
        description:
          override.description ?? deprecation ?? repo.description ?? "",
      };
      if (override.retired || repo.archived || deprecation !== undefined) {
        project.retired = { replacements: [] };
      }
      return { repo, override, project };
    })
  );

  const byName = new Map(
    projects.map(({ repo, project }) => [repo.name, project])
  );
  for (const { override, project } of projects) {
    if (project.retired && override.replacements) {
      project.retired.replacements = override.replacements.flatMap(name => {
        const replacement = byName.get(name);
        return replacement
          ? [{ title: replacement.title, href: replacement.href }]
          : [];
      });
    }
  }

  await checkHomepages(projects.map(({ project }) => project.href));

  return projects
    .map(({ project }) => project)
    .sort(
      (a, b) =>
        Number(Boolean(a.retired)) - Number(Boolean(b.retired)) ||
        a.title.localeCompare(b.title)
    );
}

async function fetchRepos(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos: GitHubRepo[] = [];
  for (let page = 1; ; page++) {
    const response = await fetch(
      `https://api.github.com/users/${OWNER}/repos?per_page=100&page=${page}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(
        `GitHub repo list page ${page} answered ${response.status} ${response.statusText}`
      );
    }
    const pageRepos = (await response.json()) as GitHubRepo[];
    repos.push(...pageRepos);
    if (pageRepos.length < 100) {
      return repos;
    }
  }
}

function isSiteHomepage(homepage: string | null): homepage is string {
  // The hub's own homepage is the bare origin; every listed site has a path.
  return (
    homepage !== null &&
    homepage.startsWith(SITE.website) &&
    homepage.length > SITE.website.length
  );
}

// Returns the deprecation message of the repo's npm package, or undefined when
// it has none or is not deprecated. A registry entry counts only when its
// repository field names this repo, so a stranger's package of the same name
// never does.
async function fetchNpmDeprecation(
  repoName: string
): Promise<string | undefined> {
  for (const packageName of [repoName, `${NPM_SCOPE}/${repoName}`]) {
    const response = await fetch(
      `https://registry.npmjs.org/${packageName.replace("/", "%2f")}`
    );
    if (response.status === 404) {
      continue;
    }
    if (!response.ok) {
      throw new Error(
        `npm registry answered ${response.status} ${response.statusText} for ${packageName}`
      );
    }
    const packument = (await response.json()) as NpmPackument;
    if (!isRepoUrl(packument.repository?.url, repoName)) {
      continue;
    }
    const latest = packument["dist-tags"]?.latest;
    const deprecated = latest
      ? packument.versions?.[latest]?.deprecated
      : undefined;
    return deprecated || undefined;
  }
  return undefined;
}

function isRepoUrl(url: string | undefined, repoName: string): boolean {
  const normalized = url
    ?.toLowerCase()
    .replace(/^git\+/, "")
    .replace(/\.git$/, "");
  return normalized === `https://github.com/${OWNER}/${repoName}`.toLowerCase();
}

function toTitle(repoName: string): string {
  return repoName
    .split("-")
    .map(
      word => TITLE_WORDS[word] ?? word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

async function checkHomepages(urls: string[]): Promise<void> {
  const failures = (
    await Promise.all(
      urls.map(async url => ({ url, status: await checkHomepage(url) }))
    )
  ).filter(({ status }) => status !== 200);
  if (failures.length === 0) {
    return;
  }

  const message = `Listed project sites that do not answer 200:\n${failures
    .map(({ url, status }) => `  ${url} -> ${status}`)
    .join("\n")}`;
  if (process.env.CI) {
    throw new Error(message);
  }
  warn(message);
}

async function checkHomepage(url: string): Promise<number | string> {
  let status: number | string = "no answer";
  for (let attempt = 1; attempt <= HOMEPAGE_CHECK_ATTEMPTS; attempt++) {
    try {
      status = (await fetch(url, { redirect: "follow" })).status;
      if (status === 200) {
        return status;
      }
    } catch (error) {
      status = String(error);
    }
    if (attempt < HOMEPAGE_CHECK_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
  return status;
}

function warn(message: string): void {
  process.emitWarning(message, { code: "MNAOUMOV_DEV_PROJECTS" });
}
