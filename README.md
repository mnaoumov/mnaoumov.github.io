# mnaoumov.dev

Personal programming blog by Michael Naumov. Writing about TypeScript, PowerShell, Obsidian plugin development, and developer tooling.

Built with [Astro](https://astro.build/) and [AstroPaper](https://github.com/satnaing/astro-paper) theme.

## Project list

The home page's project list collects itself at build time (`src/utils/getProjects.ts`):

- It lists every non-fork repo of `mnaoumov` whose GitHub homepage is a site under `https://mnaoumov.dev/<path>`. To add a site to the list, set the repo's homepage; nothing in this repo changes.
- The title comes from the repo name and the description from the repo. `OVERRIDES` in the same file rewords either.
- A repo shows as retired when it is archived, when its npm package (`<repo>` or `@mnaoumov/<repo>`, whose `repository` names the repo) is deprecated, or when `OVERRIDES` marks it so. A retired entry links the sites that replace it.
- Every listed site must answer 200. In CI a site that does not fails the build; locally it is a warning.
- Entries that are not repo sites stay in `PROJECTS` in `src/constants.ts`.
- `deploy.yml` also runs daily, so a new site appears within a day without a push. The build reads the API with the workflow's `GITHUB_TOKEN`; locally it is unauthenticated unless `GITHUB_TOKEN` is set.
