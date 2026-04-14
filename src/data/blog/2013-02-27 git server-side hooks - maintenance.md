---
description: "Pattern for self-updating git server-side hooks: a proxy script checks out hook code directly from the repository on each run."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[devops](<../Tags/devops.md>)"
  - "[bare-repo](<../Tags/bare-repo.md>)"
pubDatetime: 2013-02-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "git server-side hooks - maintenance"
url:
  - https://mnaoumov.wordpress.com/2013/02/27/git-server-side-hooks-maintenance/
disabled rules:
  - yaml-title
---

# 2013-02-27 git server-side hooks - maintenance

Hi folks.

Server-side hooks that I wrote previously have one huge shortcoming - **Maintenance**

How do I modify server-side hooks at the moment?

I edit the hook on a client-side, then commit and push. After that I connect to a git server via Remote Desktop, and manually update hooks in the corresponding folder.

This is lame. This is a manual process, which causes its own complexity.

Ideally server-side hook should just reuse the hooks being pushed.

But usually git server repo is bare so it will require some special kind of checkout. Which I've just [blogged](<./2013-02-27 git checkout on bare repo.md>) :)

The following code assumes that hooks are located under **Tools/GitHooks** folder in git repo

**git-server-repo\hooks\pre-receive**

```bash
#!/bin/sh
#
while read oldRef newRef refName
do
    psCommand=".\\hooks\\HookProxy.ps1 -HookName pre-receive -Arguments \"-OldRef\", \"$oldRef\", \"-NewRef\", \"$newRef\", \"-RefName\", \"$refName\""
    c:/windows/system32/WindowsPowerShell/v1.0/PowerShell.exe -Sta -ExecutionPolicy RemoteSigned -NoProfile -Command "$psCommand"

    exitCode=$?

    if [ $exitCode != 0 ]
    then
        exit $exitCode
    fi
done
```

**git-server-repo\hooks\HookProxy.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
    [string] $HookName,
    [object[]] $Arguments
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

Trap { throw $_ }

function Main
{
    $tempDir = [Guid]::NewGuid()
    New-Item -Path $tempDir -ItemType Directory | Out-Null

    try
    {
        Git-CheckoutFile -Branch master -RelativeFilePath Tools\GitHooks -DestinationFolder $tempDir

        Invoke-Expression "$tempDir\GitHooks\$HookName.ps1 $Arguments"
    }
    finally
    {
        Remove-Item -Path $tempDir -Recurse -Force
    }

}

function Git-CheckoutFile
{
    param
    (
        [string] $Branch,
        [string] $RelativeFilePath,
        [string] $DestinationFolder
    )

    if ($RelativeFilePath -eq ".")
    {
        $RelativeFilePath = "*"
    }

    $RelativeFilePath = $RelativeFilePath -replace "\\", "/"

    $tempDir = [Guid]::NewGuid()
    New-Item -Path $tempDir -ItemType Directory | Out-Null

    git archive $Branch $RelativeFilePath --output "$tempDir\__temp.tar"
    tar -xf "$tempDir/__temp.tar" -C $tempDir
    Remove-Item "$tempDir/__temp.tar"

    if (-not (Test-Path $DestinationFolder))
    {
        New-Item -Path $DestinationFolder -ItemType Directory | Out-Null
    }

    Copy-Item -Path "$tempDir/$RelativeFilePath" -Destination $DestinationFolder -Recurse

    Remove-Item -Path $tempDir -Recurse -Force
}

Main
```

Absolutely the same approach could be used for other server-side hooks such as **post-receive**

And this works as expected

The idea is very simple. We write a proxy (**HookProxy.ps1**) which will extract corresponding hook from a repo and execute it. So **HookProxy.ps1** is the only piece of code should be deployed once to the server, and later on all hooks modifications are made via source control (master branch).

P.S. I've just realized that this can be useful for client-side hooks as well. It will get rid of the need to keep hooks updated in all possible branches.
