---
description: Fixing Invoke-NativeApplication to handle Windows exit codes beyond 0-255 using an IgnoreExitCode switch.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2015-04-04T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Execution of external commands (native applications) in PowerShell done right - Part 3"
url:
  - https://mnaoumov.wordpress.com/2015/04/05/execution-of-external-commands-native-applications-in-powershell-done-right-part-3/
disabled rules:
  - yaml-title
---

# 2015-04-04 Execution of external commands (native applications) in PowerShell done right - Part 3

[Part 1](<./2015-01-10 Execution of external commands in PowerShell done right.md>), [Part 2](<./2015-03-30 Execution of external commands (native applications) in PowerShell done right - Part 2.md>)

Hi folks

I realized that my previous implementation has a flaw. I though that exit code always 0..255 but this is the case only in DOS. In Windows it can be any signed 32-bit integer. So I had to fix it. You cannot create an array with all int values in PowerShell because of out-of-memory, so I had to take a switch approach.

```powershell
function Invoke-NativeApplication
{
    param
    (
        [ScriptBlock] $ScriptBlock,
        [int[]] $AllowedExitCodes = @(0),
        [switch] $IgnoreExitCode
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
        if ((-not $IgnoreExitCode) -and ($AllowedExitCodes -notcontains $LASTEXITCODE))
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

    Invoke-NativeApplication -ScriptBlock $ScriptBlock -IgnoreExitCode | `
        Where-Object -FilterScript { -not $_.IsError }
}

function Test-CalledFromPrompt
{
    (Get-PSCallStack)[-2].Command -eq "prompt"
}

Set-Alias -Name exec -Value Invoke-NativeApplication
Set-Alias -Name safeexec -Value Invoke-NativeApplicationSafe
```

I've also created a repository which contains all my attempts to the problem https://github.com/mnaoumov/Invoke-NativeApplication

Stay tuned!
