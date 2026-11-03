# mnaoumov.dev

Personal programming blog by Michael Naumov. Writing about TypeScript, PowerShell, Obsidian plugin development, and developer tooling.

Built with [Astro](https://astro.build/) and [AstroPaper](https://github.com/satnaing/astro-paper) theme.

## Publishing content

1. Run `npm run prepare:content` on the author's machine to sync posts from `F:/Obsidian/Blogs/mnaoumov.dev/Posts` and generate their OG images. This writes `src/data/blog/` and `public/posts/` but does not stage files or create commits.
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

`/obsidian/` lists the plugins, developer tools and community resources I maintain or contribute to, with descriptions and a local text filter. `/obsidian/resources.json` exposes the same generated catalogue for completeness checks and other consumers.

The editorial snapshot in `src/data/obsidian-resources.json` preserves third-party contributions, roles, old plugin names and retired replacements. At build time, public non-fork repositories named `obsidian-*`, `create-obsidian-plugin` or `generator-obsidian-plugin` are discovered from GitHub, excluding empty repositories, demo vaults and the explicit sample, reproduction and index exclusions in `src/utils/get-obsidian-resources.ts`. The community vault is already listed under Community. Existing entries gain the current repository description, archive status and documentation homepage; new entries use `manifest.json` to distinguish plugins from tools. New owned projects therefore appear on the next daily build without editing the roster. Add third-party contributions and editorial details to the JSON snapshot, including projects whose public repository is still empty. GitHub failures stop CI; local offline builds retain the snapshot. Network work runs at most two requests concurrently.

## Obsidian digest

`/obsidian-digest/` is a monthly digest of what I shipped for Obsidian: new plugins and tools, and the features worth knowing about. It has an index of every issue and its own feed at `/obsidian-digest/rss.xml`, and the header links it once one issue is published.

- Each issue is a file in `src/data/obsidian-digest/` named by its month (`2026-10.md`). Unlike posts, issues live in this repo and are not synced from the vault. `src/data/obsidian-digest/README.md` has the frontmatter.
- A month with nothing worth posting gets no file, so the index never lists an empty month.
- `npm run digest:releases -- <from YYYY-MM> [<to YYYY-MM>] [--out <file>]` collects every release of the Obsidian repos published in those months into a Markdown worksheet, newest month first, with each repo's first release marked. It reads the GitHub API with `GITHUB_TOKEN`, or with the `gh` CLI's login when that is unset. In PowerShell, quote the separator: `npm run digest:releases '--' 2026-10`.

## Filing an issue (for AI agents and humans)

Open issues through the [issue forms](https://github.com/mnaoumov/mnaoumov.github.io/issues/new/choose), not as blank issues.

Filing from the CLI or the API (`gh issue create --body`, or an AI agent filing for you) skips the form, and `gh issue create --template` cannot load an issue form. In that case, open the matching form in [`.github/ISSUE_TEMPLATE/`](https://github.com/mnaoumov/mnaoumov.github.io/tree/HEAD/.github/ISSUE_TEMPLATE), copy every field as a `### <label>` heading in the form's order, and fill in each one. Always state the version you used and your operating system.
