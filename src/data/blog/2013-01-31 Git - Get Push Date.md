---
description: How to record and retrieve the actual push date for git commits using git notes and server-side post-receive hooks.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[git-notes](<../Tags/git-notes.md>)"
pubDatetime: 2013-01-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "Git - Get Push Date"
url:
  - https://mnaoumov.wordpress.com/2013/01/31/git-get-push-date/
disabled rules:
  - yaml-title
---

# 2013-01-31 Git - Get Push Date

Git natively supports **Author Date** and **Committer date** for commits. However it is not very easy to detect when commit was actually pushed.

[Here](http://stackoverflow.com/questions/6795070/is-there-a-way-in-git-to-obtain-a-push-date-for-a-given-commit) some discussions about that

Well, if you were the developer, who pushed that commit, you can use

```bash
git reflog origin/master --date=iso
```

and get something like

```bash
4adc587 refs/remotes/origin/master@{2013-01-25 22:07:15 +1100}: update by push
```

So you could get something, but it is difficult to find reflog for the specific commit.

So, I decided to follow the idea with git notes.

Firstly, we need to enable reflogs in a git server repo

**Git-server-repo-path\config**

```bash
[core]
    ...
    logAllRefUpdates = true
```

Then add server-side hooks to add notes with push date to all the commits pushed

**Git-server-repo-path\hooks\post-receive**

```bash
#!/bin/sh

while read oldRef newRef refName
do
    psCommand=".\\hooks\\post-receive.ps1 -OldRef \"$oldRef\" -NewRef \"$newRef\" -RefName \"$refName\""
    c:/windows/system32/WindowsPowerShell/v1.0/PowerShell.exe -Sta -ExecutionPolicy RemoteSigned -NoProfile -Command "$psCommand"

    exitCode=$?

    if [ $exitCode != 0 ]
    then
        exit $exitCode
    fi
done
```

**Git-server-repo-path\hooks\post-receive.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
    [string] $OldRef,
    [string] $NewRef,
    [string] $RefName
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
Trap { throw $_ }

if ($RefName -notlike "refs/heads/*")
{
    Write-Debug "$RefName is not a branch commit"
    exit
}

$branchName = $RefName -replace "refs/heads/"

$reflog = git log -1 -g --date=iso --format=%gD $branchName
if ($reflog -notmatch ".*@\{(?<date>.*)\}")
{
    Write-Warning "Cannot parse reflog date: $reflog"
    exit
}

$pushDate = $Matches.date

$commits = @(git rev-list "$OldRef..$NewRef" --first-parent)

foreach ($commit in $commits)
{
    git notes --ref=push-date add -m $pushDate $commit
}
```

I could not find a native way to extract date from the reflog, so I have to use some regex (line \#25)

Ok, after that enabled on a server we are ready to use it on a client

Firstly we need to ensure that all the required notes were fetched

```bash
git fetch origin refs/notes/push-date:refs/notes/push-date
```

Then we can get push date for the commits using

```powershell
function Get-PushDate
{
    param
    (
        [string] $Ref
    )

    $pushDateString = @(git log -1 $Ref --notes=push-date --format=%N)[0]

    if ($pushDateString -eq "")
    {
        return $null;
    }

    return [DateTime] $pushDateString
}
```

Please see my [repo](https://github.com/mnaoumov/githooks) for more code.
