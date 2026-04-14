---
description: "PowerShell snippet to change the author and committer date of an existing git commit using GIT_COMMITTER_DATE and --amend."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[powershell](<../Tags/powershell.md>)"
pubDatetime: 2012-09-23T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "git - change date of commit"
url:
  - https://mnaoumov.wordpress.com/2012/09/23/git-change-date-of-commit/
disabled rules:
  - yaml-title
---

# 2012-09-23 git - change date of commit

[git](<../../../Soft/Notes/Obsidian/git.md>) [PowerShell](<./Topics/PowerShell.md>)

If you want for whatever reason change date of the existing commit you can use the following snippet (PowerShell)

If you want to modify date of the last commit

```powershell
$commitDateString = "2010-01-01T14:30:00"
$env:GIT_COMMITTER_DATE = $commitDateString
git commit --amend --date $commitDateString
$env:GIT_COMMITTER_DATE = ""
```

For full list of supported date formats type

```powershell
git commit --help
```

and look at **DATE FORMATS** section

If you need to change date of the non-last commit you would need to use interactive rebase first, select edit for those commits that should be changed and then apply approach shown above
