import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// Collects the releases of every Obsidian repo of the owner published in a
// range of months, grouped by month, as a Markdown worksheet. The worksheet is
// the raw material of the monthly digest: someone still has to decide which
// release carries a feature worth a line. A repo's first release is marked,
// because a first release always goes in.
//
// Usage: npm run digest:releases -- <from YYYY-MM> [<to YYYY-MM>] [--out <file>]

const OWNER = "mnaoumov";

// Repos outside the owner's account whose releases the owner cuts.
const EXTRA_REPOS = ["dy-sh/obsidian-consistent-attachments-and-links"];

interface GitHubRepo {
  full_name: string;
  name: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
}

interface Release {
  repo: string;
  tag: string;
  name: string;
  url: string;
  body: string;
  published: Date;
  first: boolean;
}

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

async function main(): Promise<void> {
  const { from, to, out } = parseArgs(process.argv.slice(2));
  const headers = makeHeaders();

  const repos = [
    ...(await fetchOwnerRepos(headers))
      .filter(
        repo =>
          !repo.fork &&
          !repo.archived &&
          !repo.private &&
          repo.name.includes("obsidian")
      )
      .map(repo => repo.full_name),
    ...EXTRA_REPOS,
  ].sort();

  const releases: Release[] = [];
  for (const repo of repos) {
    releases.push(...(await fetchReleases(repo, headers)));
  }

  const inRange = releases.filter(release => {
    const month = toMonth(release.published);
    return month >= from && month <= to;
  });

  const worksheet = render(inRange, from, to, repos.length);
  if (out) {
    writeFileSync(out, worksheet);
    console.log(`Wrote ${inRange.length} release(s) to ${out}`);
  } else {
    process.stdout.write(worksheet);
  }
}

function parseArgs(args: string[]): { from: string; to: string; out?: string } {
  const months: string[] = [];
  let out: string | undefined;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--out") {
      out = args[++index];
    } else {
      months.push(arg);
    }
  }
  const [from, to = from] = months;
  if (!from || !MONTH_PATTERN.test(from) || !MONTH_PATTERN.test(to)) {
    throw new Error(
      "Usage: npm run digest:releases -- <from YYYY-MM> [<to YYYY-MM>] [--out <file>]"
    );
  }
  return { from, to, out };
}

function makeHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN ?? readGhToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Unauthenticated, the API allows 60 requests an hour, fewer than one run
// takes, so a local run borrows the gh CLI's login when it has one.
function readGhToken(): string | undefined {
  try {
    return (
      execSync("gh auth token", {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || undefined
    );
  } catch {
    return undefined;
  }
}

async function fetchPages<T>(
  url: string,
  headers: Record<string, string>
): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const response = await fetch(`${url}?per_page=100&page=${page}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(
        `${url} page ${page} answered ${response.status} ${response.statusText}`
      );
    }
    const pageItems = (await response.json()) as T[];
    items.push(...pageItems);
    if (pageItems.length < 100) {
      return items;
    }
  }
}

function fetchOwnerRepos(
  headers: Record<string, string>
): Promise<GitHubRepo[]> {
  return fetchPages<GitHubRepo>(
    `https://api.github.com/users/${OWNER}/repos`,
    headers
  );
}

async function fetchReleases(
  repo: string,
  headers: Record<string, string>
): Promise<Release[]> {
  // Prereleases never reach users, so they neither count as releases nor as a
  // repo's first one.
  return (
    await fetchPages<GitHubRelease>(
      `https://api.github.com/repos/${repo}/releases`,
      headers
    )
  )
    .filter(
      release => !release.draft && !release.prerelease && release.published_at
    )
    .map(release => ({
      repo,
      tag: release.tag_name,
      name: release.name || release.tag_name,
      url: release.html_url,
      body: (release.body ?? "").trim(),
      published: new Date(release.published_at as string),
      first: false,
    }))
    .sort((a, b) => a.published.getTime() - b.published.getTime())
    .map((release, index) => ({ ...release, first: index === 0 }));
}

function toMonth(date: Date): string {
  return date.toISOString().slice(0, 7);
}

function render(
  releases: Release[],
  from: string,
  to: string,
  repoCount: number
): string {
  const lines = [
    `# Releases ${from === to ? from : `${from} to ${to}`}`,
    "",
    `${releases.length} release(s) across ${repoCount} repo(s), newest month first.`,
    "",
  ];

  const byMonth = new Map<string, Release[]>();
  for (const release of releases) {
    const month = toMonth(release.published);
    byMonth.set(month, [...(byMonth.get(month) ?? []), release]);
  }

  for (const month of [...byMonth.keys()].sort().reverse()) {
    lines.push(`## ${month}`, "");
    const monthReleases = (byMonth.get(month) ?? []).sort(
      (a, b) =>
        a.repo.localeCompare(b.repo) ||
        a.published.getTime() - b.published.getTime()
    );
    for (const release of monthReleases) {
      const marker = release.first ? " - FIRST RELEASE" : "";
      lines.push(
        `### ${release.repo} ${release.tag}${marker}`,
        "",
        `${release.published.toISOString().slice(0, 10)} - ${release.url}`,
        ""
      );
      if (release.body) {
        lines.push(
          release.body
            .replace(/\r\n/g, "\n")
            // Keep the release's own headings below this worksheet's.
            .replace(/^#{1,3} /gm, "#### "),
          ""
        );
      }
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

await main();
