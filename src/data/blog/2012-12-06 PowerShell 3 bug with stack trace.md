---
description: PowerShell 3 shows incorrect line numbers in stack traces when CmdletBinding and ErrorActionPreference are combined; trap workaround included.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[bug](<../Tags/bug.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2012-12-06T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "PowerShell 3 bug with stack trace"
url:
  - https://mnaoumov.wordpress.com/2012/12/06/powershell-3-bug-with-stack-trace/
disabled rules:
  - yaml-title
---

# 2012-12-06 PowerShell 3 bug with stack trace

I found another PowerShell 3 bug

Let's create the following **Script.ps1** script

```powershell
[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"

$null.ToString()
```

if we run it in PowerShell 3 we will see

```bash
C:\Scripts\Script.ps1 : You cannot call a method on a null-valued expression.
At line:1 char:1
+ C:\Scripts\Script.ps1
+ ~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (:) [Script.ps1], RuntimeException
    + FullyQualifiedErrorId : InvokeMethodOnNull,Script.ps1
```

As you see stacktrace here shown as **At line:1 char:1**.

If we run the same script from PowerShell 2

```bash
ToString : You cannot call a method on a null-valued expression.
At C:\Scripts\Script.ps1:8 char:15
+ $null.ToString <<<< ()
    + CategoryInfo          : InvalidOperation: (ToString:String) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : InvokeMethodOnNull
```

which is much better, it shows real stacktrace

I found that if we comment line \#1 or \#6, PowerShell 3 shows stacktrace a bit better

```bash
ToString : You cannot call a method on a null-valued expression.
At C:\Scripts\Script.ps1:8 char:1
+ $null.ToString <<<< ()
    + CategoryInfo          : InvalidOperation: (ToString:String) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : InvokeMethodOnNull
```

it shows correct line but still incorrect column. And I could not find a way to show column properly.

But I found a workaround how to show line properly and keep lines \#1 and \#6 unchanged.

You just need to insert **Trap** statement it will now work

```powershell
[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Trap { throw $_ }
$null.ToString()
```

I created a bug for Microsoft. Please vote for it if possible. [https://connect.microsoft.com/PowerShell/feedback/details/773611/powershell-3-bug-with-stack-trace](https://connect.microsoft.com/PowerShell/feedback/details/773611/powershell-3-bug-with-stack-trace)
