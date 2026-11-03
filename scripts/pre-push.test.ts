import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as path from "node:path";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const SOURCE = readFileSync(new URL("./pre-push.ts", import.meta.url), "utf8");
const COMPILED = ts.transpileModule(
  SOURCE.replaceAll("import.meta.dirname", JSON.stringify("/fixture/scripts")),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }
).outputText;

test("pre-push validates without writing files, staging content or creating commits", () => {
  const commands: string[] = [];
  const writes: string[] = [];
  executeHook({ commands, writes });

  assert.deepEqual(commands, ["npm run build"]);
  assert.deepEqual(writes, []);
});

test("pre-push stops and propagates a failed validation", () => {
  const commands: string[] = [];
  const writes: string[] = [];
  const failure = new Error("Build failed");

  assert.throws(
    () => executeHook({ commands, writes, failure }),
    error => error === failure
  );
  assert.deepEqual(commands, ["npm run build"]);
  assert.deepEqual(writes, []);
});

interface ExecuteHookParams {
  commands: string[];
  writes: string[];
  failure?: Error;
}

function executeHook(params: ExecuteHookParams): void {
  const { commands, writes, failure } = params;
  runInNewContext(COMPILED, {
    exports: {},
    console,
    require: (id: string) => {
      switch (id) {
        case "node:child_process":
          return {
            execSync: (command: string) => {
              commands.push(command);
              if (failure) {
                throw failure;
              }
              // A pending post and an unrelated staged file must never be committed by a push.
              return " M src/data/blog/alpha.md\nA  unrelated.txt\n";
            },
          };
        case "node:fs":
          return {
            readFileSync: () => "dynamicOgImage: true",
            existsSync: () => false,
            writeFileSync: () => writes.push("writeFileSync"),
            cpSync: () => writes.push("cpSync"),
            mkdirSync: () => writes.push("mkdirSync"),
          };
        case "node:path":
          return path;
        default:
          throw new Error(`Unexpected import: ${id}`);
      }
    },
  });
}
