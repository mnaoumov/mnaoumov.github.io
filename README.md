# mnaoumov.dev

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/mnaoumov) [![Deploy](https://img.shields.io/github/actions/workflow/status/mnaoumov/mnaoumov.github.io/deploy.yml?branch=main&label=deploy)](https://github.com/mnaoumov/mnaoumov.github.io/actions/workflows/deploy.yml)

Personal programming blog by Michael Naumov. Writing about TypeScript, PowerShell, Obsidian plugin development, and developer tooling.

Built with [Astro](https://astro.build/) and [AstroPaper](https://github.com/satnaing/astro-paper) theme.

## Publishing content

1. Run `npm run prepare:content` on the author's machine to sync posts from `F:/Obsidian/Content/Misha/Blog/mnaoumov.dev/Posts` and generate their OG images. This writes `src/data/blog/` and `public/posts/` but does not stage files or create commits.
2. Review the generated changes, stage the intended files and commit them.
3. Run `git push`. The pre-push hook validates the site with `npm run build`. It does not sync posts, change tracked content or create commits, so the commit selected by Git is the one pushed. Ordinary pushes do not require the vault.

`npm run sync:posts` copies posts only. `npm run test:hooks` checks the pre-push validation contract without building the site.

## Project list

The home page's project list collects itself at build time (`src/utils/getProjects.ts`):

- It lists every non-fork repo of `mnaoumov` whose GitHub homepage is a site under `https://mnaoumov.dev/<path>`. To add a site to the list, set the repo's homepage; nothing in this repo changes.
- The title comes from the repo name and the description from the repo. `OVERRIDES` in the same file rewords either.
- A repo shows as retired when it is archived, when its npm package (`<repo>` or `@mnaoumov/<repo>`, whose `repository` names the repo) is deprecated, or when `OVERRIDES` marks it so. A retired entry links the sites that replace it.
- Every listed site must answer 200. In CI a site that does not fails the build; locally it is a warning.
- Entries that are not repo sites stay in `PROJECTS` in `src/constants.ts`.
- `deploy.yml` also runs daily, so a new site appears within a day without a push. The build reads the API with the workflow's `GITHUB_TOKEN`; locally it is unauthenticated unless `GITHUB_TOKEN` is set.

## Obsidian resources

`/obsidian/` lists the plugins, developer tools and community resources I maintain or contribute to, with descriptions, download counts, a local text filter and a sort by name or downloads. `/obsidian/resources.json` exposes the same generated catalogue for completeness checks and other consumers.

The editorial snapshot in `src/data/obsidian-resources.json` preserves third-party contributions, roles, old plugin names and retired replacements. At build time, public non-fork repositories named `obsidian-*`, `create-obsidian-plugin` or `generator-obsidian-plugin` are discovered from GitHub, excluding empty repositories, demo vaults and the explicit sample, reproduction and index exclusions in `src/utils/get-obsidian-resources.ts`. The community vault is already listed under Community. Existing entries gain the current repository description, archive status and documentation homepage; new entries use `manifest.json` to distinguish plugins from tools. New owned projects therefore appear on the next daily build without editing the roster. Each entry whose repository is listed in the community directory's `community-plugins.json` gets its total downloads from `community-plugin-stats.json`, both read from `obsidianmd/obsidian-releases` at build time; an entry the directory does not list, such as a tool, shows no count, and `resources.json` carries the same number as `downloads`. Add third-party contributions and editorial details to the JSON snapshot, including projects whose public repository is still empty. GitHub failures stop CI; local offline builds retain the snapshot. Network work runs at most two requests concurrently.

## Obsidian digest

`/obsidian-digest/` is a monthly digest of what I shipped for Obsidian: new plugins and tools, and the features worth knowing about. It has an index of every issue and its own feed at `/obsidian-digest/rss.xml`, and the header links it once one issue is published.

- Each issue is a file in `src/data/obsidian-digest/` named by its month (`2026-10.md`). Unlike posts, issues live in this repo and are not synced from the vault. `src/data/obsidian-digest/README.md` has the frontmatter.
- A month with nothing worth posting gets no file, so the index never lists an empty month.
- `npm run digest:releases -- <from YYYY-MM> [<to YYYY-MM>] [--out <file>]` collects every release of the Obsidian repos published in those months into a Markdown worksheet, newest month first, with each repo's first release marked. It reads the GitHub API with `GITHUB_TOKEN`, or with the `gh` CLI's login when that is unset. In PowerShell, quote the separator: `npm run digest:releases '--' 2026-10`.

## See also

| Project                                                                 | Features                                                                                                                     | How mnaoumov.dev differs                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Astro Modular`](https://github.com/davidvkimball/astro-modular)       | Astro blog theme for Obsidian users; vault as CMS; wikilinks, callouts, embeds; graph view; comments; feature toggles        | Same goal as `Astro Modular`: an Astro blog written in Obsidian; copies posts from the vault with a script rather than using the vault as the content folder; adds: GitHub project list, Obsidian resources catalogue, monthly Obsidian digest |
| [`AstroPaper`](https://github.com/satnaing/astro-paper)                 | Minimal, accessible Astro blog theme; tags, archives, search, RSS, dynamic OG images                                         | Extends `AstroPaper`: built on it; adds: vault post sync, GitHub project list, Obsidian resources catalogue, monthly Obsidian digest                                                                                                           |
| [`Digital Garden`](https://community.obsidian.md/plugins/digitalgarden) | Obsidian plugin publishing selected notes as a website; wikilinks, embeds, backlinks, graph                                  | Covers part of `Digital Garden`: publishes Obsidian notes as a site; a blog with posts chosen by folder, not a note-by-note garden; omits: backlinks, graph                                                                                    |
| [`Obsidian Stats`](https://www.obsidianstats.com/)                      | Directory of every community plugin and theme; download counts, trends, new plugins, latest updates                          | Covers part of `Obsidian Stats`: lists Obsidian plugins and their releases; narrower: one author's plugins and tools, plus contributions to other projects; omits: download counts and trends                                                  |
| [`Quartz`](https://github.com/jackyzha0/quartz)                         | Static-site generator for Markdown and Obsidian vaults; wikilinks, backlinks, graph view, full-text search, popover previews | Same goal as `Quartz`: publishes Obsidian-written Markdown as a site; a dated blog with RSS rather than a linked knowledge base; omits: backlinks, graph, link previews                                                                        |

Last searched for similar projects on 2026-11-25.

## Filing an issue (for AI agents and humans)

Open issues through the [issue forms](https://github.com/mnaoumov/mnaoumov.github.io/issues/new/choose), not as blank issues.

Filing from the CLI or the API (`gh issue create --body`, or an AI agent filing for you) skips the form, and `gh issue create --template` cannot load an issue form. In that case, open the matching form in [`.github/ISSUE_TEMPLATE/`](https://github.com/mnaoumov/mnaoumov.github.io/tree/HEAD/.github/ISSUE_TEMPLATE), copy every field as a `### <label>` heading in the form's order, and fill in each one. Always state the version you used and your operating system.
