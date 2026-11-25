import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE = "F:/Obsidian/Content/Misha/Blog/mnaoumov.dev/Posts";
const TARGET = resolve(import.meta.dirname, "..", "src", "data", "blog");

function main(): void {
  // Check the source before touching the target, so a moved or missing source
  // can never leave the site with no posts.
  if (!existsSync(SOURCE)) {
    throw new Error(`Posts source not found: ${SOURCE}. Nothing was changed in ${TARGET}.`);
  }

  rmSync(TARGET, { recursive: true, force: true });
  cpSync(SOURCE, TARGET, { recursive: true });
  console.log(`Synced posts from ${SOURCE} to ${TARGET}`);
}

main();
