import curated from "@/data/obsidian-resources.json";
import { getOwnerRepos, type GitHubRepo } from "./getProjects";
import { mapConcurrent } from "./mapConcurrent";

export interface ObsidianResource {
  title: string;
  href: string;
  group: string;
  role: string;
  description: string;
  site?: string;
  retired?: boolean;
  previousName?: string;
  language?: string;
  replacements?: { title: string; href: string }[];
}

export const RESOURCE_GROUPS = [
  { id: "plugins", title: "Plugins" },
  { id: "tools", title: "Developer libraries and tools" },
  { id: "community", title: "Learning and community" },
];

const EXCLUDED_REPOS = new Set([
  "obsidian-resources",
  "obsidian-community-vault",
  "obsidian-file-explorer-bug-vault",
  "obsidian-typings-build-test",
]);

let resourcesPromise: Promise<ObsidianResource[]> | undefined;

export function getObsidianResources(): Promise<ObsidianResource[]> {
  resourcesPromise ??= loadResources();
  return resourcesPromise;
}

// The JSON preserves editorial details and third-party contributions. Owned
// public repositories are discovered at build time, even without a docs site.
async function loadResources(): Promise<ObsidianResource[]> {
  const resources = new Map<string, ObsidianResource>(
    curated.map(resource => [resource.href, { ...resource }])
  );
  try {
    const repos = (await getOwnerRepos()).filter(isObsidianRepo);
    const discovered = await mapConcurrent(repos, async repo => {
      const href = `https://github.com/mnaoumov/${repo.name}`;
      const existing = resources.get(href);
      const resource: ObsidianResource = existing
        ? { ...existing }
        : await newResource(repo);
      resource.description = repo.description || resource.description;
      resource.retired = resource.retired || repo.archived;
      if (repo.homepage?.startsWith("https://mnaoumov.dev/")) {
        resource.site = repo.homepage;
      }
      return resource;
    });
    for (const resource of discovered) {
      resources.set(resource.href, resource);
    }
  } catch (error) {
    // An outage must not publish an incomplete directory. The snapshot still
    // makes the page usable when developing offline.
    if (process.env.CI) {
      throw error;
    }
    process.emitWarning(
      `Using the curated Obsidian resources: ${String(error)}`
    );
  }
  return [...resources.values()].sort(
    (a, b) =>
      Number(Boolean(a.retired)) - Number(Boolean(b.retired)) ||
      a.title.localeCompare(b.title)
  );
}

function isObsidianRepo(repo: GitHubRepo): boolean {
  return (
    !repo.fork &&
    repo.size > 0 &&
    !EXCLUDED_REPOS.has(repo.name) &&
    !repo.name.endsWith("-demo-vault") &&
    !repo.name.startsWith("obsidian-sample-plugin") &&
    /^(obsidian-|create-obsidian-plugin$|generator-obsidian-plugin$)/.test(
      repo.name
    )
  );
}

async function newResource(repo: GitHubRepo): Promise<ObsidianResource> {
  const response = await fetch(
    `https://raw.githubusercontent.com/mnaoumov/${repo.name}/${repo.default_branch}/manifest.json`
  );
  if (!response.ok && response.status !== 404) {
    throw new Error(`Manifest for ${repo.name} answered ${response.status}`);
  }
  const manifest: { name?: string; description?: string } | undefined =
    response.ok ? await response.json() : undefined;
  return {
    title: manifest?.name || repo.name,
    href: `https://github.com/mnaoumov/${repo.name}`,
    group: manifest ? "plugins" : "tools",
    role: "Author",
    description: manifest?.description || repo.description || repo.name,
  };
}
