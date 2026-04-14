import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, join } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CONFIG_PATH = join(ROOT, "src", "config.ts");
const DIST_POSTS = join(ROOT, "dist", "posts");
const PUBLIC_POSTS = join(ROOT, "public", "posts");

function main(): void {
  syncPosts();
  generateOgImages();
  stageChanges();
}

function syncPosts(): void {
  console.log("Syncing posts...");
  execSync("npm run sync:posts", { cwd: ROOT, stdio: "inherit" });
}

function generateOgImages(): void {
  console.log("Checking for posts missing OG images...");

  const configContent = readFileSync(CONFIG_PATH, "utf-8");
  const hasDynamic = configContent.includes("dynamicOgImage: true");

  if (!hasDynamic) {
    const enabledConfig = configContent.replace("dynamicOgImage: false", "dynamicOgImage: true");
    writeFileSync(CONFIG_PATH, enabledConfig);
  }

  try {
    console.log("Building to generate OG images...");
    execSync("npx astro build", { cwd: ROOT, stdio: "inherit" });

    copyNewOgImages();
  } finally {
    if (!hasDynamic) {
      writeFileSync(CONFIG_PATH, configContent);
    }
  }
}

function copyNewOgImages(): void {
  if (!existsSync(DIST_POSTS)) {
    console.log("No dist/posts directory found, skipping OG image copy.");
    return;
  }

  let copied = 0;
  const slugDirs = readdirSync(DIST_POSTS);

  for (const slug of slugDirs) {
    const distPng = join(DIST_POSTS, slug, "index.png");
    const publicPng = join(PUBLIC_POSTS, slug, "index.png");

    if (!existsSync(distPng)) {
      continue;
    }

    const needsCopy = !existsSync(publicPng) || checkSizeDiffers(distPng, publicPng);

    if (needsCopy) {
      const publicDir = join(PUBLIC_POSTS, slug);
      mkdirSync(publicDir, { recursive: true });
      cpSync(distPng, publicPng);
      copied++;
      console.log(`Copied OG image: ${slug}/index.png`);
    }
  }

  console.log(`OG images: ${copied} new/updated, ${slugDirs.length} total.`);
}

function checkSizeDiffers(a: string, b: string): boolean {
  return statSync(a).size !== statSync(b).size;
}

function stageChanges(): void {
  const status = execSync("git status --porcelain", { cwd: ROOT, encoding: "utf-8" });
  if (status.trim()) {
    console.log("Staging changes...");
    execSync("git add src/data/blog/ public/posts/", { cwd: ROOT, stdio: "inherit" });

    const diff = execSync("git diff --cached --name-only", { cwd: ROOT, encoding: "utf-8" });
    if (diff.trim()) {
      execSync('git commit -m "chore: sync posts and OG images"', { cwd: ROOT, stdio: "inherit" });
      console.log("Committed updated posts and OG images.");
    }
  } else {
    console.log("No changes to commit.");
  }
}

main();
