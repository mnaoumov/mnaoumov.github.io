---
description: "Bug report: Set-PSBreakpoint breakpoints are not hit when the script runs in a new PowerShell 3 process."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[bug](<../Tags/bug.md>)"
pubDatetime: 2012-10-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "PowerShell Set-PSBreakpoint bug in PowerShell 3_"
url:
  - https://mnaoumov.wordpress.com/2012/10/10/powershell-set-psbreakpoint-bug-in-powershell-3/
disabled rules:
  - yaml-title
---

# 2012-10-10 PowerShell Set-PSBreakpoint bug in PowerShell 3_

I found a very annoying problem in PowerShell 3

It does not stop on breakpoints if new PowerShell process is created.

It was fine in PowerShell 2

_**Steps to reproduce:**_

Create **MyScript.ps1** with the following content

```powershell
function MyFunction()
{
    Write-Host "Breakpoint should be hit"
}

Set-PSBreakpoint -Command MyFunction | Out-Null

MyFunction
```

And create **MyScript.cmd** with the following content

```shell
@echo off

echo PowerShell 2 stops on breakpoint PowerShell -Version 2 .\MyScript.ps1

echo PowerShell 3 does not stop on breakpoint PowerShell -Version 3 .\MyScript.ps1
```

Then run **MyScript.cmd**. You will see that when we run script in PowerShell 2 mode, it stops on the breakpoint we set. But this is not happening in PowerShell 3.

I could not find any explanations of that.

I found slightly similar bug: [PowerShell V3 breakpoint bug](http://www.sapien.com/blog/2012/09/24/powershell-v3-breakpoint-bug/)

**EDIT**: Raised a bug for Microsoft, please vote for it [https://connect.microsoft.com/PowerShell/feedback/details/767381/powershell-3-set-psbreakpoint-is-not-working-accross-different-powershell-exe-processes](https://connect.microsoft.com/PowerShell/feedback/details/767381/powershell-3-set-psbreakpoint-is-not-working-accross-different-powershell-exe-processes)
