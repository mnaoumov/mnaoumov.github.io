---
description: "PowerShell git helper snippets: get current branch, resolve refs, test fast-forward, find commit's originating branch."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2013-01-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:33:18-06:00
title: "Interesting git helpers snippets"
url:
  - https://mnaoumov.wordpress.com/2013/01/31/interesting-git-helpers-snippets/
disabled rules:
  - yaml-title
---

# 2013-01-31 Interesting git helpers snippets

I would like to share some useful git snippets, which I've used in my git hooks. Snippets originally written in PowerShell but can be easily rewritten for your favorite language.

[Here](https://github.com/mnaoumov/githooks/blob/master/Tools/GitHooks/Common.ps1) are the full sources

## Get Current Branch Name

```powershell
git rev-parse --abbrev-ref HEAD
```

## Safely Resolve Ref

```powershell
git rev-parse --verify --quiet $Ref
```

It returns hash of the valid ref, or $null for invalid ones.

## Test if One Commit is Fast-forward for Other

```powershell
function Test-FastForward
{
    param
    (
        [string] $From,
        [string] $To
    )

    $From = git rev-parse $From
    $mergeBase = git merge-base $From $To

    $mergeBase -eq $From
}
```

## Get Repo Root Path

```powershell
git rev-parse --show-toplevel
```

## Get Commit's Originating Branch

```powershell
function Get-OriginatingBranch
{
    param
    (
        [string] $Ref
    )

    $branches = @(git branch --all --contains $Ref) | `
        ForEach-Object { $_ -replace "\*? +" -replace "remotes/" }

    foreach ($branch in $branches)
    {
        $refs = git rev-list "$Ref^..$branch" --first-parent
        if ($refs -contains $Ref)
        {
            return $branch
        }
    }
}
```

This function is not 100% reliable, because it checks the branches that contains commit directly (not via merge). It could return wrong result, if the branch was created after the commit was made.

(inspired by [https://github.com/SethRobertson/git-what-branch/](https://github.com/SethRobertson/git-what-branch/))

Secondly this check is not detects commits from pull merges. I have implemented check for pull merges as well, but it is even more unreliable.
