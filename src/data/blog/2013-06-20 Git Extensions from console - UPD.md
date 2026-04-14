---
description: How to launch Git Extensions from the console using a git alias, including a fix to avoid blocking the terminal.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-extensions](<../Tags/git-extensions.md>)"
  - "[command-line](<../Tags/command-line.md>)"
pubDatetime: 2013-06-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Git Extensions from console - UPD"
url:
  - https://mnaoumov.wordpress.com/2013/06/20/git-extensions-from-console-upd/
disabled rules:
  - yaml-title
---

# 2013-06-20 Git Extensions from console - UPD

A long time ago I've [blogged](<./2012-09-16 Git Extensions from console.md>) how to run **Git Extensions** from console

I didn't like the fact I had to create some extra files.

I build a simpler implementation using aliases

```bash
git config alias.ex "!'C:\Program Files (x86)\GitExtensions\GitExtensions.exe' "$@""
```

Now I can use my lovely

```bash
git ex
# or even git ex commit

# for list of all commands git ex help
```

**UPD2:**

I found that my new approach is wrong. It blocks console while Git Extensions is open. That's very bad. I had to improve the command and I had to change it dramatically. And I had to fight with escaping.

So here we are now

```bash
git config --global alias.ex '!sh -c ''\"C:\\Program Files (x86)\\GitExtensions\\GitExtensions.exe\" ''$@'' &'''
```

I made the alias as global because it does not make sense to reconfigure it for all repos over and over
