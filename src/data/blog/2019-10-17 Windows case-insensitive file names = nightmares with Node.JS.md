---
description: Windows filesystem canonical casing causes Node.js module require cache misses when __dirname and process.cwd() differ in letter case.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[nodejs](<../Tags/nodejs.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[filesystem](<../Tags/filesystem.md>)"
pubDatetime: 2019-10-17T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "Windows case-insensitive file names = nightmares with Node.JS"
url:
  - https://mnaoumov.wordpress.com/2019/10/18/windows-case-insensitive-file-names-nightmares-with-node-js/
disabled rules:
  - yaml-title
---

# 2019-10-17 Windows case-insensitive file names = nightmares with Node.JS

Hi folks!

I've recently discovered a weird bug when I was trying to test some Node.JS project on Windows

It took me hours to figure out the problem. And I would like to share my findings.

I will simplify the code avoiding all the unnecessary details.

```shell
$ cd e:\dev\foo
$ .\build.cmd

...
TypeError: myModule2.myFunction is not a function
    at Object.<anonymous> (E:\Dev\foo\script.js:7:11)
...
```

When I asked other developers, it worked perfectly on their machines (obviously!)

Due to the nature of the issue, I've got an intuition that maybe it is Windows-related. So I checked the same code on MacOS and build was working fine. To be more accurate, I was using bash shell script instead of cmd, but they are essentially the same.

Then I assumed the problem is in the fact, that project sits on drive **E**. I copied the project into **c:\dev\foo** and build was working fine again. It was also working fine from **d:\dev\foo** and **f:\dev\foo** folders, but kept failing from **e:\dev\foo**

Strange, isn't it?

Then I checked, it is working fine from **e:\dev2\foo** folder

Then I ran two builds side-by-side and was running them step-by-step to see the differences. Eventually I nailed it!

Did you notice I was running the script from **e:\dev\foo** folder but the script was saying **E:\Dev\foo** folder? Actually it is the thing. The **E:\ vs e:\** part is not important, actually Node.JS would always use capitalized version of the drive letter. However **Dev vs dev** part IS important. Despite the fact, that Windows uses case-insensitive file system, internally some canonical variant of the name is being stored.

To prove it, see the output from the PowerShell commands

```powershell
$ (dir e:\ -Filter dev).Name
Dev
$ (dir c:\ -Filter dev).Name
dev
```

Clearly **e:\dev** is stored internally as **E:\Dev**

So when I ran

```shell
$ cd e:\Dev\foo
$ .\build.cmd
```

it worked fine (finally!)

Note, that I did not have to specify capital **E:\**

Once I found a problem, I started to dig further to get more understanding

Let's look at **build.cmd**

```
@node "%~dp0\script.js"
```

**`%~dp0`** - returns the full path to the folder where **build.cmd** is located. And it will be a canonical form E:\Dev\foo regardless of what we typed in the `cd` command

Inside the **script.js** the current folder is used in two different ways `__dirname` and `process.cwd()` .

In our case `__dirname` is **E:\Dev\foo**, `process.cwd()` is **E:\dev\foo**

Those two values don't match and now we can see what exactly was failing

Again, in the simplified form **script.js**

```js
const myModulePath1 = __dirname + '/myModule';
const myModule1 = require(myModulePath1)
myModule1.myFunction = () => {};

const myModulePath2 = process.cwd() + '/myModule';
const myModule2 = require(myModulePath2);
myModule2.myFunction(); // Fails here
console.log('Works fine');
```

The thing is, `require` uses cache by script name. So when `__dirname === process.cwd()` , correspondingly `myModulePath1 === myModulePath2` . And due to the cache, `myModule1 === myModule2` . Therefore, `myModule2.myFunction()` is defined

But if those path differ, `myModule2` is a brand-new variable where `myFunction` is not set.

It took me a while, but I've finally got it.

Also it is interesting, that this problem is not happening if I try it from **cmd**, it seems that it doesn't respect case specified in the `cd` command. The issue is reproducible from **PowerShell**

If you want to try this on your own, try [https://gist.github.com/mnaoumov/debe6db18a0f3a568d1dc4d23df4b499](https://gist.github.com/mnaoumov/debe6db18a0f3a568d1dc4d23df4b499)

I believe essentially it is a bug in Node.JS for Windows because it should do a case-insensitive cache lookup on case-insensitive file systems. Going to create a bug about it

Stay tuned!

**UPD**: I've created a bug for Node.JS [https://github.com/nodejs/node/issues/30015](https://github.com/nodejs/node/issues/30015) which was immediately marked as duplicate to the closed issue and then I found a note in the documentation [https://nodejs.org/api/modules.html#modules_module_caching_caveats](https://nodejs.org/api/modules.html#modules_module_caching_caveats) . Basically they say they won't fix it. Good to know
