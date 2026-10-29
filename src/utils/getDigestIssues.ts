import { getCollection, type CollectionEntry } from "astro:content";

export interface DigestIssue {
  entry: CollectionEntry<"digest">;
  // `2026-10`: the file name, the slug and the month the issue covers.
  month: string;
  // `October 2026`.
  monthName: string;
  title: string;
}

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDigestMonth(month: string): string {
  return MONTH_FORMAT.format(new Date(`${month}-01T00:00:00Z`));
}

// Published issues, newest month first.
export default async function getDigestIssues(): Promise<DigestIssue[]> {
  const entries = await getCollection("digest", ({ data }) => !data.draft);
  return entries
    .map(entry => {
      const monthName = formatDigestMonth(entry.id);
      return {
        entry,
        month: entry.id,
        monthName,
        title: `Obsidian digest: ${monthName}`,
      };
    })
    .sort((a, b) => b.month.localeCompare(a.month));
}
