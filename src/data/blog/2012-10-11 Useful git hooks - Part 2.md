---
description: Adds a commit-msg hook that enforces TFS work item ID prefixes on all commit messages.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[tfs](<../Tags/tfs.md>)"
pubDatetime: 2012-10-11T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "Useful git hooks - Part 2"
url:
  - https://mnaoumov.wordpress.com/2012/10/11/useful-git-hooks-part-2/
disabled rules:
  - yaml-title
---

# 2012-10-11 Useful git hooks - Part 2

Continuing [Useful git hooks](<./2012-10-10 Useful git hooks.md>)

Repo - [https://bitbucket.org/mnaoumov/githooks/](https://bitbucket.org/mnaoumov/githooks/)

I completely reviewed the idea of testing hooks

You just grab the code from repository, it has only **master** branch

Then you run **PrepareForTests.ps1**

And it creates local repository and branches to emulate the situations handled by hooks.

**README.md** contains good explanation how to test hooks.

Also I implemented **commit-msg** hook which checks that all your commit messages prefixed with corresponding TFS work item ID

![provide-tfs-work-item-id-dialog.png](<./!!files/2012-10-11 Useful git hooks - Part 2/provide-tfs-work-item-id-dialog.png>)

To be continued…

[Useful git hooks – Part 3](<./2012-10-31 Useful git hooks - Part 3.md>)
