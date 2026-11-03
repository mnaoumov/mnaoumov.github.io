import { execSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

// Git has already selected the commit to push. Never generate content or commit here.
execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
