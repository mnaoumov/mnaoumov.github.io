import { cpSync } from "node:fs";

import { run } from "./helpers/run.ts";

run("astro check");
run("astro build");
run("pagefind --site dist");

// Pagefind generates its search bundle into `dist/pagefind` during the build.
// Copy it into `public/pagefind` so the search UI also works in `astro dev`.
cpSync("dist/pagefind", "public/pagefind", { recursive: true });
