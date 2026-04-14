---
description: Practical guide to debugging Obsidian plugins using Chrome DevTools, eval-loaded source navigation, TypeScript compilation, and hot reload.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[obsidian](<../Tags/obsidian.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[typescript](<../Tags/typescript.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2022-05-10T11:08:43-06:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:59-06:00
title: "How to debug Obsidian plugins"
disabled rules:
  - yaml-title
url:
  - https://mnaoumov.wordpress.com/2022/05/10/how-to-debug-obsidian-plugins/
  - https://forum.obsidian.md/t/how-to-debug-obsidian-plugins/37298
---

# 2022-05-10 How to debug Obsidian plugins

Hi folks

I am using [Obsidian](https://obsidian.md) on a daily basis and sometimes I need to investigate some plugin behavior.

I would like to share some tricks. Some of them I even discovered on my own, as I could not find them by googling.

## Developer Tools

As Obsidian is an Electron app, it's essentially the wrapper on Google Chrome, so if you know how to debug things there, you already know the most essential parts.

Just press `Ctrl + Shift + I` and you will open `Developer Tools`.

## Plugin ID

Your plugin logic resides in `[Vault Path]\.obsidian\plugins\[Plugin ID]\main.js`

Usually if you know the plugin name, it's simple to find the `Plugin ID` but if it is not the case, just go to `Settings > Community Plugins > [Plugin Name] .> Copy share link`

![image-2022-05-10-12-29-01.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-12-29-01.png>)

And the link looks like `obsidian://show-plugin?id=[Plugin Id]`

## Debug without sources

Plugins are loaded dynamically using `eval` JavaScript function, therefore it is impossible to search for the plugin code during execution in `Sources` pane in `Developer Tools`.

So this requires a little trick. Go to `Developer Tools` and type in the console

```js
app.plugins.plugins["[Plugin ID]"].constructor
```

Here obviously `[Plugin ID]` has to be replaced with the real `Plugin ID`.

As the result you will get a function in the console

![image-2022-05-10-12-57-24.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-12-57-24.png>)

If you click on that function, you will be redirected to the `Sources` pane with the code of `eval`-ed plugin.

![image-2022-05-10-15-16-17.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-15-16-17.png>)

Here you can debug normally, set breakpoints etc.

If you want to make permanent changes you can modify `[Vault Path]\.obsidian\plugins\[Plugin ID]\main.js` accordingly.

## TypeScript sources

Actually the main language for Obsidian plugins is TypeScript. It is being later on compiled into JavaScript `[Vault Path]\.obsidian\plugins\[Plugin ID]\main.js`.

For more advanced changes, dealing with compiled JavaScript is troublesome. Async functions are being compiled into JavaScript generator functions. Overall, the experience is not as pleasant.

To get TypeScript sources you have to find `[plugin-repo-url]`

![image-2022-05-10-15-28-38.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-15-28-38.png>)

```bash
git clone [plugin-repo-url]
cd [plugin-dir]
npm install # installs all the dependencies required to compile the plugin
npm run dev # start the daemon that watches changes in the TypeScript source code and compiles them into main.js
```

Then you can make your changes, `main.js` will be automatically recompiled every time you save TypeScript changes.

When you are done, copy `main.js` into `[Vault Path]\.obsidian\plugins\[Plugin ID]\main.js`

## Reload changed plugin

You have multiple ways to reload the plugin after changes

1. Just restart Obsidian app.
2. Manually turn on and off the plugin

![image-2022-05-10-15-36-21.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-15-36-21.png>)

1. Reload all plugins at once

![image-2022-05-10-15-37-08.png](<./!!files/2022-05-10 How to debug Obsidian plugins/image-2022-05-10-15-37-08.png>)

1. Reload via code in `Developer Tools` console.

```js
await app.plugins.disablePlugin("[Plugin ID]");
await app.plugins.enablePlugin("[Plugin ID]");
```

1. Use `Hot Reload` plugin

[Hot Reload](https://github.com/pjeby/hot-reload) plugin automatically reloads plugins under certain conditions. See its documentation.

Also note that this plugin doesn't exist in the standard community plugins registry, so it has to be installed manually.

***

Hopefully this guide will help you to master Obsidian plugins. Don't forget to send pull requests if you made useful changes to the plugins.

Stay tuned.
