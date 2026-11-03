---
title: Debugging Obsidian plugins in VS Code
description: Attach VS Code to Obsidian's renderer and debug TypeScript with the Obsidian Dev Toolkit's generated source-map configuration.
pubDatetime: 2026-11-03T10:21:00-06:00
created: 2026-11-03T10:21:00-06:00
updated: 2026-11-03T10:21:00-06:00
tags:
  - obsidian
  - debugging
  - typescript
---

# Debugging Obsidian plugins in VS Code

In 2022 I wrote [How to debug Obsidian plugins](https://mnaoumov.dev/posts/2022-05-10-how-to-debug-obsidian-plugins/), mostly using Obsidian's Developer Tools. Those tools are still useful, but when developing a plugin I want breakpoints, local variables and stepping in the same editor as my TypeScript.

The `Obsidian Dev Toolkit` now includes a configuration generator for that workflow. Its [Debugging plugins guide](https://mnaoumov.dev/obsidian-dev-toolkit/guides/debugging/) is the maintained reference; this post explains the setup and the source-map detail that makes breakpoints work. The examples target desktop Obsidian and the toolkit's esbuild development build.

## Generate the VS Code configuration

With `@mnaoumov/obsidian-dev-toolkit` installed in your plugin project, open that project's root folder in VS Code and run:

```bash
npx generate-debug-config
```

The command creates `.vscode/launch.json` with an **Attach to Obsidian** configuration. It uses VS Code's built-in browser debugger with `"type": "chrome"` and `"request": "attach"`. There is no extra debugger extension to install.

If `launch.json` already exists, the generator leaves it alone. Merge the configuration from the [toolkit guide](https://mnaoumov.dev/obsidian-dev-toolkit/guides/debugging/#generate-the-attach-configuration) into your existing `configurations` array.

## Start Obsidian with the debug port

Completely quit Obsidian first. Opening another vault through an existing process will not give that process a new startup flag. On Windows, a per-user installation can be started from PowerShell with:

```powershell
& "$env:LOCALAPPDATA\Obsidian\Obsidian.exe" --remote-debugging-port=9222
```

Adjust the executable path for your installation. The [guide's startup examples](https://mnaoumov.dev/obsidian-dev-toolkit/guides/debugging/#start-obsidian-and-the-development-build) also cover macOS and Linux. Keep this endpoint local: a debugger attached to it can control the app.

Use a development vault. In the plugin project's toolkit configuration, set `OBSIDIAN_CONFIG_FOLDER` to that vault's configuration directory, then run:

```bash
npm run dev
```

Keep the watcher running and use the deployed `dist/dev/main.js`. The production bundle's compact ignore map does not provide the TypeScript mappings needed here.

Select **Run and Debug → Attach to Obsidian** in VS Code and press **F5**. If several vault windows are available, choose your development vault's renderer. Plugin code runs in that renderer; attaching a Node debugger to another runtime will not reach it.

Set a breakpoint inside a command callback, then invoke the command in Obsidian. This gives you an explicit action to test after attachment.

## The package name matters

The manifest's `id` identifies the installed plugin directory. For this esbuild source-map mapping, the important value is instead `name` in `package.json`.

For a package named `my-plugin-package`, the generated configuration contains:

```json
"sourceMapPathOverrides": {
  "app://obsidian.md/plugin:my-plugin-package/*": "${workspaceFolder}/*"
}
```

A source URL such as `app://obsidian.md/plugin:my-plugin-package/src/main.ts` therefore maps to `src/main.ts` under the VS Code workspace. Scoped package names must appear in full, for example `@example/my-plugin`.

The toolkit embeds the development source map in the bundle and adds `/* nosourcemap */` so Obsidian preserves it. You normally let the build do this; the useful debugging check is whether the URL in the map matches the override and your local file.

If you rename the package, update the existing configuration. If the workspace is a monorepo root rather than the plugin folder, adjust both `webRoot` and the override's destination. Other bundlers may use different source URLs, so inspect their maps before reusing this esbuild configuration.

## Catch code that runs during loading

To break inside `onload()`, attach the debugger and set the breakpoint **before reloading the plugin**. Disable and re-enable it, or use your development reload mechanism. A debugger cannot stop an earlier invocation that finished before it attached.

After a source edit, wait for the development build to finish and reload the plugin so Obsidian executes the new bundle. [Hot Reload](https://github.com/pjeby/hot-reload) or the toolkit's [Obsidian CLI reload option](https://mnaoumov.dev/obsidian-dev-toolkit/guides/bundlers/#reloading-a-development-build) can shorten that cycle.

## When a breakpoint stays unbound

Work through the connection and mapping separately:

1. Check the [local debugger target list](http://127.0.0.1:9222/json/list). If the connection is refused, confirm that Obsidian really restarted with the debug flag. For another port, generate with `npx generate-debug-config --port=9333` and start Obsidian with the same port.
2. Confirm that you attached to the right vault's renderer and enabled the plugin there.
3. Check the watcher output and deployment directory. The bundle in the vault must be the current development build of the sources open in VS Code.
4. Compare the source-map URL's package name with the override, and check that its destination resolves to your local TypeScript file.
5. Run **Debug: Diagnose Breakpoint Problems** in VS Code. Inspect the loaded scripts and source maps; add `"trace": true` to the configuration if you need a debugger trace.
6. Reload after attachment, then execute the callback containing the breakpoint. Choose an executable statement rather than a type declaration.

Obsidian's own DevTools remain the place to inspect the DOM, console and network. The [full debugging guide](https://mnaoumov.dev/obsidian-dev-toolkit/guides/debugging/) covers the mapping details and further diagnosis as the toolkit evolves.
