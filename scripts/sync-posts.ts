import { cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE = "F:/Obsidian/Blogs/mnaoumov.dev/Posts";
const TARGET = resolve(import.meta.dirname, "..", "src", "data", "blog");

function main(): void {
  rmSync(TARGET, { recursive: true, force: true });
  cpSync(SOURCE, TARGET, { recursive: true });
  console.log(`Synced posts from ${SOURCE} to ${TARGET}`);
}

main();
