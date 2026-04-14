---
description: A PowerShell exec helper that correctly captures stdout and stderr from native commands and checks exit codes.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2015-01-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Execution of external commands in PowerShell done right"
url:
  - https://mnaoumov.wordpress.com/2015/01/11/execution-of-external-commands-in-powershell-done-right/
disabled rules:
  - yaml-title
---

# 2015-01-10 Execution of external commands in PowerShell done right

[Part 2](<./2015-03-30 Execution of external commands (native applications) in PowerShell done right - Part 2.md>) [Part 3](<./2015-04-04 Execution of external commands (native applications) in PowerShell done right - Part 3.md>)

Hi folks

Execution external (native) commands in PowerShell is not an easy thing. It looks like it is simple but it has a lot of downsides.

We'll consider the following command

```powershell
cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345"
```

And use it like that

It writes a message to STDOUT, a message to STDERR and returns some exit code.

# Capturing Output

```powershell
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345"
STDERR
> $result
STDOUT
```

As you see, STDERR was not captured to the variable and written to the console.

Let's try to redirect STDERR to STDOUT first

```powershell
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1
> $result
STDOUT
cmd.exe : STDERR
At line:1 char:14
+ $result = cmd <<<<  /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1
    + CategoryInfo          : NotSpecified: (STDERR  :String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
```

So we see that error is captured to the variable but is thrown when we extract it.

The reason for that is the fact that STDERR was captured not as string but as **ErrorRecord**

```powershell
> $result[1].GetType().FullName
System.Management.Automation.ErrorRecord
```

To extract it

```powershell
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1 | % { "$_" }
> $result
STDOUT
STDERR
```

Looks good.

But if we have

```powershell
> $ErrorActionPreference = "Stop"
> # ... some code
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1 | % { "$_" }
cmd.exe : STDERR
At line:1 char:14
+ $result = cmd <<<<  /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1 | % { "$_" }
    + CategoryInfo          : NotSpecified: (STDERR  :String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
```

it fails again. The code above works only when **$ErrorActionPreference = "Continue"**

So the correct approach would be to change it to back and forward

```powershell
> $ErrorActionPreference = "Stop"
> # ... some code
> $backupErrorActionPreference = $ErrorActionPreference
> $ErrorActionPreference = "Continue"
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1 | % { "$_" }
> $ErrorActionPreference = $backupErrorActionPreference
> $result
STDOUT
STDERR
```

# Capturing Failures

We've already discussed **$ErrorActionPreference = "Stop"** before

this setting makes the whole script fail on the first error occurred.

But this does not respect external commands exit codes.

Normally exit code 0 considered as success and all others as failure. We'll add a check manually

```powershell
> $ErrorActionPreference = "Stop"
> # ... some code
> $backupErrorActionPreference = $ErrorActionPreference
> $ErrorActionPreference = "Continue"
> $result = cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" 2>&1 | % { "$_" }
> $ErrorActionPreference = $backupErrorActionPreference
> $result
STDOUT
STDERR
> if ($LASTEXITCODE -ne 0)
>> {
>>     throw "Exit code $LASTEXITCODE"
>> }
>>
Exit code 345
At line:3 char:10
+     throw <<<<  "Exit code $LASTEXITCODE"
    + CategoryInfo          : OperationStopped: (Exited 345:String) [], RuntimeException
    + FullyQualifiedErrorId : Exit code 345
```

# Final Version

Let's create a helper to consolidate all the complexity required in one place. We'll two more features: ability to prefix STDERR messages if necessary and whitelist of exit codes that we want to consider as success.

```powershell
function exec
{
    param
    (
        [ScriptBlock] $ScriptBlock,
        [string] $StderrPrefix = "",
        [int[]] $AllowedExitCodes = @(0)
    )

    $backupErrorActionPreference = $script:ErrorActionPreference

    $script:ErrorActionPreference = "Continue"
    try
    {
        & $ScriptBlock 2>&1 | ForEach-Object -Process `
            {
                if ($_ -is [System.Management.Automation.ErrorRecord])
                {
                    "$StderrPrefix$_"
                }
                else
                {
                    "$_"
                }
            }
        if ($AllowedExitCodes -notcontains $LASTEXITCODE)
        {
            throw "Execution failed with exit code $LASTEXITCODE"
        }
    }
    finally
    {
        $script:ErrorActionPreference = $backupErrorActionPreference
    }
}
```

And now

```powershell
> $result = exec { cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" }
Execution failed with exit code 345
At line:26 char:18
+             throw <<<<  "Execution failed with exit code $LASTEXITCODE"
    + CategoryInfo          : OperationStopped: (Execution failed with exit code 345:String) [], RuntimeException
    + FullyQualifiedErrorId : Execution failed with exit code 345
> $result = exec { cmd /c "echo STDOUT & echo STDERR 1>&2 & exit 345" } -StderrPrefix "STDERR: " -AllowedExitCodes @(0, 345)
> $result
STDOUT
STDERR: STDERR
```

Not that easy, heh?

Stay tuned!
