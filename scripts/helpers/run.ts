import { execSync } from "node:child_process";

export function run(command: string): void {
  execSync(command, { stdio: "inherit" });
}

export function passthrough(command: string): void {
  const forwardedArgs = process.argv.slice(2);
  run([command, ...forwardedArgs].join(" "));
}
