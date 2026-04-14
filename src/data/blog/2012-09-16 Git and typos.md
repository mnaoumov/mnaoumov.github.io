---
description: "Shows how to enable git help.autocorrect to automatically fix and run mistyped git commands."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
pubDatetime: 2012-09-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Git and typos"
url:
  - https://mnaoumov.wordpress.com/2012/09/17/git-and-typos/
disabled rules:
  - yaml-title
---

# 2012-09-16 Git and typos

Found very useful config value **help.autocorrect** for git.

It will execute your command and if it obvious (for git :)) what you supposed to do

![git-statud.png](<./!!files/2012-09-16 Git and typos/git-statud.png>)

To turn the feature on execute

```bash
git config --global help.autocorrect 1
```
