import rss from "@astrojs/rss";
import getDigestIssues from "@/utils/getDigestIssues";
import { SITE } from "@/config";

export async function GET() {
  const issues = await getDigestIssues();
  return rss({
    title: `Obsidian digest | ${SITE.title}`,
    description:
      "My Obsidian-related work each month: new plugins and the features worth knowing about.",
    site: SITE.website,
    items: issues.map(issue => ({
      link: `/obsidian-digest/${issue.month}/`,
      title: issue.title,
      description: issue.entry.data.summary,
      // An issue covers its whole month, so it is dated by the month's end.
      pubDate: new Date(
        Date.UTC(
          Number(issue.month.slice(0, 4)),
          Number(issue.month.slice(5, 7)),
          0
        )
      ),
    })),
  });
}
