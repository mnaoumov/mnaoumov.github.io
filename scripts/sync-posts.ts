import { execSync } from "node:child_process";
import { resolve } from "node:path";

const SOURCE = "/f/Obsidian/Blogs/mnaoumov.dev/Posts/";
const TARGET = resolve(import.meta.dirname, "..", "src", "data", "blog") + "/";

function main(): void {
  execSync(`rsync -a --delete "${SOURCE}" "${TARGET}"`, { stdio: "inherit" });
}

main();
