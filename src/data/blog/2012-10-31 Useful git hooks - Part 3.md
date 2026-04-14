---
description: Completion of the git hooks suite with functional tests using PoshUnit and UI Automation PowerShell Extensions.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[unit-testing](<../Tags/unit-testing.md>)"
pubDatetime: 2012-10-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Useful git hooks - Part 3"
url:
  - https://mnaoumov.wordpress.com/2012/11/01/useful-git-hooks-part-3/
disabled rules:
  - yaml-title
---

# 2012-10-31 Useful git hooks - Part 3

Continuing [Useful git hooks - Part 2](<./2012-10-11 Useful git hooks - Part 2.md>)

Finally I finished all my hooks I wanted

I don't want to repeat myself so please follow README in my repository [https://bitbucket.org/mnaoumov/githooks](https://bitbucket.org/mnaoumov/githooks) for complete reference of all hooks implemented.

Actually the hooks were mostly written more than two weeks ago but I did not want to publish them because I wanted to write a functional tests for them. For that purpose I tried to find a good PowerShell unit testing framework and then I ended up implementing my own - [PoshUnit](https://github.com/mnaoumov/PoshUnit)

I think I covered the most important test cases but who knows? Any beta-testing is very welcomed.

Also I would like to share my findings about [UI Automation PowerShell Extensions](http://uiautomation.codeplex.com/). I used this library for UI tests of my hook dialogs and even PowerShell prompts. It is very feature-rich library but unfortunately not very well documented so I spent sometime in Reflector to find cmdlets I needed. If you are interested see my **Tests** folder for usage of cmdlets like **Get-UIA...**.

All the tests were made fully compatible with PowerShell 2 and 3

Any feedback and suggestions are highly appreciated.

[Useful git hooks - Part 4](<./2013-01-29 Useful git hooks - Part 4.md>)
