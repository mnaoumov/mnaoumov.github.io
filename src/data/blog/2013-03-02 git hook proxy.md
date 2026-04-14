---
description: Final implementation of a PowerShell git hook proxy that extracts and runs hooks from the repo for both client and server sides.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[devops](<../Tags/devops.md>)"
pubDatetime: 2013-03-02T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "git hook proxy"
url:
  - https://mnaoumov.wordpress.com/2013/03/02/git-hook-proxy/
disabled rules:
  - yaml-title
---

# 2013-03-02 git hook proxy

In my previous [blogpost](<./2013-02-27 git server-side hooks - maintenance.md>) I was talking about the idea of having proxy which extracts and executes hooks from the repo.

Initially proxy was written for server-side hooks, but later I found it useful to be used for client-side hooks as well.

After enabling this idea on production I've immediately faced with some minor issues and I would like to show the final versions.

**Example of client-side hook - local-repo-path\\.git\\hooks\\commit-msg**

```bash
#!/bin/sh
#
commitMessagePath=$1
psCommand=".\\.git\\hooks\\HookProxy.ps1 -Branch origin/master -HookName commit-msg -Arguments \"-CommitMessagePath\", \"$commitMessagePath\""
c:/windows/system32/WindowsPowerShell/v1.0/PowerShell.exe -Sta -ExecutionPolicy RemoteSigned -NoProfile -Command "$psCommand"
```

**Example of server-side hook - server-repo-path\\hooks\\pre-receive**

```bash
#!/bin/sh
#
while read oldRef newRef refName
do
    psCommand=".\\hooks\\HookProxy.ps1 -Branch master -HookName pre-receive -Arguments \"-OldRef\", \"$oldRef\", \"-NewRef\", \"$newRef\", \"-RefName\", \"$refName\""
    c:/windows/system32/WindowsPowerShell/v1.0/PowerShell.exe -Sta -ExecutionPolicy RemoteSigned -NoProfile -Command "$psCommand"

    exitCode=$?

    if [ $exitCode != 0 ]
    then
        exit $exitCode
    fi
done
```

**Final version of HookProxy.ps1 - local-repo-path\\.git\\hooks\\HookProxy.ps1 and server-repo-path\\hooks\\HookProxy.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
    [string] $Branch,
    [string] $HookName,
    [object[]] $Arguments
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

Trap { throw $_ }

function Main
{
    $tempDir = "temp_$([Guid]::NewGuid())"
    New-Item -Path $tempDir -ItemType Directory | Out-Null

    try
    {
        Git-CheckoutFile -Branch $Branch -RelativeFilePath tools\GitHooks -DestinationFolder $tempDir

        & "$PSHOME\PowerShell.exe" -Sta -ExecutionPolicy RemoteSigned -NoProfile -Command "$tempDir\GitHooks\$HookName.ps1 $Arguments"
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

    $tempDir = "temp_$([Guid]::NewGuid())"
    New-Item -Path $tempDir -ItemType Directory | Out-Null

    git archive $Branch $RelativeFilePath --output "$tempDir/__temp.tar"
    tar -xf "$tempDir/__temp.tar" -C $tempDir
    Remove-Item "$tempDir\__temp.tar"

    if (-not (Test-Path $DestinationFolder))
    {
        New-Item -Path $DestinationFolder -ItemType Directory | Out-Null
    }

    Copy-Item -Path "$tempDir/$RelativeFilePath" -Destination $DestinationFolder -Recurse

    Remove-Item -Path $tempDir -Recurse -Force
}

Main
```

I have to run to call a separate PowerShell process in line \#26 because one of my hooks internally used **Import-Module Some.dll**, and as we know as soon as assembly is loaded it could be deleted only when corresponding AppDomain is closed. Without this extra PowerShell process, proxy fails at line \#30 because corresponding dll file is locked.
