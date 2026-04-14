---
description: PowerShell function with regex patterns to parse git's auto-generated merge commit messages and extract branch names.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[regex](<../Tags/regex.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2013-01-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Parse git merge commit messages"
url:
  - https://mnaoumov.wordpress.com/2013/01/31/parse-git-merge-commit-messages/
disabled rules:
  - yaml-title
---

# 2013-01-31 Parse git merge commit messages

Sometime traversing git history, I need to determine what branches were merged at some point.

By default git constructs merge commit message by itself.

And if nobody changes that it can be parsed to get the merged branch names.

Using history of our git repo for last two years, I took all the merge commit messages, and built up set of regexes to parse it

```powershell
function Parse-MergeCommitMessage
{
    param
    (
        [string] $CommitMessage
    )

    $result = New-Object PSObject -Property `
    @{
        Parsed = $false;
        From = "N/A";
        Into = "N/A";
        SpecificCommit = $false
    }

    $patterns = `
    @(
        "^Merge branch '(?<from>\S*)'$",
        "^Merge remote branch '(?<from>\S*)'$",
        "^Merge remote-tracking branch '(?<from>\S*)'$",

        "^Merge (?<from>\S*) branch to (?<into>\S*)$",
        "^Merge (?<from>\S*) to (?<into>\S*)$",

        "^Merge branch '(?<from>\S*)' into (?<into>\S*)$",
        "^Merge remote branch '(?<from>\S*)' into (?<into>\S*)$",
        "^Merge remote-tracking branch '(?<from>\S*)' into (?<into>\S*)$",
        "^Merge branch (?<from>\S*) to (?<into>\S*)$",

        "^Merge branch '(?<from>\S*)' of (?<url>\S*)$",
        "^Merge branch '(?<from>\S*)' of (?<url>\S*) into (?<into>\S*)$",
        "^Merge branches '(?<into>\S*)' and '(?<from>\S*)'$",
        "^Merge branches '(?<into>\S*)' and '(?<from>\S*)' of (?<url>\S*)$"

        "(?<commit>^Merge commit '(?<from>\S*)'$)",
        "(?<commit>^Merge commit '(?<from>\S*)' into (?<into>\S*)$)"
    )

    foreach ($pattern in $patterns)
    {
        if ($CommitMessage -match $pattern)
        {
            $from = $Matches["from"]
            $into = $Matches["into"]
            $url = $Matches["url"]

            if (-not $into)
            {
                $into = "master"
            }

            if ($url)
            {
                $from = "origin/$from"
            }

            $result.From = $from
            $result.Into = $into
            $result.Parsed = $true
            $result.SpecificCommit = [bool] $Matches["commit"]

            break
        }
    }

    $result
}
```

For simplicity this function resolves all the remote branches as origin/... (line \#54) however in my hooks I provided more accurate mapping for predefined set of urls. You can take a [look](https://github.com/mnaoumov/githooks/blob/master/Tools/GitHooks/Common.ps1) for more details
