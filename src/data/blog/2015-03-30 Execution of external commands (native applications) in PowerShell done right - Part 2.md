---
description: Improved Invoke-NativeApplication with an IsError property on each output line and a prompt function edge-case fix.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2015-03-30T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Execution of external commands (native applications) in PowerShell done right - Part 2"
url:
  - https://mnaoumov.wordpress.com/2015/03/31/execution-of-external-commands-native-applications-in-powershell-done-right-part-2/
disabled rules:
  - yaml-title
---

# 2015-03-30 Execution of external commands (native applications) in PowerShell done right - Part 2

[Part 1](<./2015-01-10 Execution of external commands in PowerShell done right.md>) [Part 3](<./2015-04-04 Execution of external commands (native applications) in PowerShell done right - Part 3.md>)

Hi folks in the previous blogpost I described a problem.

Today while fixing a [defect](https://github.com/dahlbyk/posh-git/pull/183) in posh-git I found that the solution was not ideal and came up with improved version

```powershell
function Invoke-NativeApplication
{
    param
    (
        [ScriptBlock] $ScriptBlock,
        [int[]] $AllowedExitCodes = @(0)
    )

    $backupErrorActionPreference = $ErrorActionPreference

    $ErrorActionPreference = "Continue"
    try
    {
        & $ScriptBlock 2>&1 | ForEach-Object -Process `
            {
                $isError = $_ -is [System.Management.Automation.ErrorRecord]
                "$_" | Add-Member -Name IsError -MemberType NoteProperty -Value $isError -PassThru
            }
        if ($AllowedExitCodes -notcontains $LASTEXITCODE)
        {
            throw "Execution failed with exit code $LASTEXITCODE"
        }
    }
    finally
    {
        $ErrorActionPreference = $backupErrorActionPreference
    }
}

function Invoke-NativeApplicationSafe
{
    param
    (
        [ScriptBlock] $ScriptBlock
    )

    Invoke-NativeApplication -ScriptBlock $ScriptBlock -AllowedExitCodes (0..255) | `
        Where-Object -FilterScript { -not $_.IsError }
}

Set-Alias -Name exec -Value Invoke-NativeApplication
Set-Alias -Name safeexec -Value Invoke-NativeApplicationSafe
```

The key thing is **IsError** property that is attached to each string returned from **exec** method

This gives us ability to perform any additional filtering easily, e.g.

```powershell
# simulate some program which writes to both STDOUT and STDERR

$result = exec { cmd /c "echo message1 & echo message2 & echo error3 1>&2 & echo error4 1>&2 & echo message5" }

$result | ForEach-Object -Process `
    {
        if ($_.IsError)
        {
            Write-Host -Object "Error: $_" -ForegroundColor Red
        }
        else
        {
            Write-Host -Object $_ -ForegroundColor Green
        }
    }
```

I think I covers any scenarios that may be required

**NOTE**: Surprisingly I found that actually order is not guaranteed. You may receive STDOUT and STDERR messages not in exact order. I knew that before when I was working with **System.Diagnostics.Process** in .NET, but I thought it is better working in PowerShell, but nope.

Each run gives different results such as

```

message1 message2 message5 error3 error4

```

**NOTE2:** While I was working on the bug mentioned at the beginning of this blogpost, I found that **exec** and **safeexec** don't work properly within **prompt()** function

```powershell
function prompt() { exec { cmd /c "echo message1" } }
```

And I didn't find a way to fix it so I had to fix the corresponding problem [differently](https://github.com/mnaoumov/posh-git/commit/1a1f18607c4b361547638120e3e41469a3973b85).

Stay tuned

**UPD:** Yeah, I've managed to fix for prompt as well!

```powershell
function Invoke-NativeApplication
{
    param
    (
        [ScriptBlock] $ScriptBlock,
        [int[]] $AllowedExitCodes = @(0)
    )

    $backupErrorActionPreference = $ErrorActionPreference

    $ErrorActionPreference = "Continue"
    try
    {
        if (Test-CalledFromPrompt)
        {
            $lines = & $ScriptBlock
        }
        else
        {
            $lines = & $ScriptBlock 2>&1
        }

        $lines | ForEach-Object -Process `
            {
                $isError = $_ -is [System.Management.Automation.ErrorRecord]
                "$_" | Add-Member -Name IsError -MemberType NoteProperty -Value $isError -PassThru
            }
        if ($AllowedExitCodes -notcontains $LASTEXITCODE)
        {
            throw "Execution failed with exit code $LASTEXITCODE"
        }
    }
    finally
    {
        $ErrorActionPreference = $backupErrorActionPreference
    }
}

function Invoke-NativeApplicationSafe
{
    param
    (
        [ScriptBlock] $ScriptBlock
    )

    Invoke-NativeApplication -ScriptBlock $ScriptBlock -AllowedExitCodes (0..255) | `
        Where-Object -FilterScript { -not $_.IsError }
}

function Test-CalledFromPrompt
{
    (Get-PSCallStack)[-2].Command -eq "prompt"
}

Set-Alias -Name exec -Value Invoke-NativeApplication
Set-Alias -Name safeexec -Value Invoke-NativeApplicationSafe
```

I found that if you are calling **exec** from **prompt()** redirection STDERR to STDOUT **2>&1** doesn't work. But somehow it works without redirection. That's weird but works.

Another funny thing is to determine if we are calling from **prompt()** or not. See function **Test-CalledFromPrompt**. It's hacky but works :)

Stay tuned
