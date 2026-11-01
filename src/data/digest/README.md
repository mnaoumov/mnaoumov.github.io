# Obsidian digest

One file per monthly issue, named by the month it covers: `2026-10.md` is published at `/obsidian-digest/2026-10/`. Only `YYYY-MM.md` files are issues, so this README is not one.

Frontmatter:

- `summary` (required): one sentence, shown on the index, in the feed and as the page description.
- `draft` (optional): `true` keeps the issue off the site.

Body sections, each only when the month has something for it: `## New plugins`, `## New in existing plugins`, `## For plugin developers`, and `## Writing` for the month's posts on this blog about Obsidian, last. A post goes in when it passes the same test as a release: I would count it as my own original work about Obsidian. A short post is judged the same way, and a post in doubt goes in. `npm run digest:releases` lists every post of the month beside the releases, marking the ones tagged `obsidian`, and the screen decides which of them are about Obsidian.

The page title (`Obsidian digest: October 2026`) comes from the file name, so the body starts with the content, not with a heading of its own.
