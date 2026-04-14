---
description: Why ErrorActionPreference Stop hides the true error line number and how trap { throw $Error[0] } fixes it.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2014-12-25T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:04-06:00
title: 'PowerShell $ErrorActionPreference = "Stop" vs error tracing'
url:
  - https://mnaoumov.wordpress.com/2014/12/25/powershell-erroractionpreference-stop-vs-error-tracing/
disabled rules:
  - yaml-title
---

# 2014-12-25 PowerShell $ErrorActionPreference = _Stop_ vs error tracing

Hi folks

For a long time I noticed that sometime my failing scripts don't report error line correctly and recently I've managed to narrow down the issue

Consider the following script

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

function ThrowFunction($i)
{
    "ThrowFunction $i"
    $someNonExistingVariable
}

@(1, 2, 3) | ForEach-Object -Process { ThrowFunction $_ }
```

When we run it we get

```
C:\dev> .\MyScript.ps1
ThrowFunction 1
ForEach-Object : The variable '$someNonExistingVariable' cannot be retrieved because it has not been set.
At C:\dev\MyScript.ps1:18 char:28
+ @(1, 2, 3) | ForEach-Object <<<<  -Process { ThrowFunction $_ }
    + CategoryInfo          : InvalidOperation: (someNonExistingVariable:Token) [ForEach-Object], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined,Microsoft.PowerShell.Commands.ForEachObjectCommand
```

As you see it reports the problem in line \#18

Line 18:

```powershell
@(1, 2, 3) | ForEach-Object -Process { ThrowFunction $_ }
```

But the actual problem is in the line \#15

Line 15:

```powershell
$someNonExistingVariable
```

I found that if we change Line 8:

```powershell
$script:ErrorActionPreference = "Continue"
```

We get

```
C:\dev> .\MyScript.ps1
ThrowFunction 1
The variable '$someNonExistingVariable' cannot be retrieved because it has not been set.
At C:\dev\MyScript.ps1:15 char:29
+     $someNonExistingVariable <<<<
    + CategoryInfo          : InvalidOperation: (someNonExistingVariable:Token) [], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined

ThrowFunction 2
The variable '$someNonExistingVariable' cannot be retrieved because it has not been set.
At C:\dev\MyScript.ps1:15 char:29
+     $someNonExistingVariable <<<<
    + CategoryInfo          : InvalidOperation: (someNonExistingVariable:Token) [], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined

ThrowFunction 3
The variable '$someNonExistingVariable' cannot be retrieved because it has not been set.
At C:\dev\MyScript.ps1:15 char:29
+     $someNonExistingVariable <<<<
    + CategoryInfo          : InvalidOperation: (someNonExistingVariable:Token) [], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined
```

And you see that now line 15 is reported as expected.

Now the question is how to get the proper line and have "Stop" behavior.

I tried many approaches and none of them worked for me.

I tried

```powershell
trap { throw $_ }
```

```powershell
trap { $_.InvocationInfo }
```

```powershell
trap { Get-PSCallStack }
```

but none of them gets the proper line

Then I tried to switch

```powershell
$script:ErrorActionPreference = "Continue"
```

and found that as soon as I add any **trap**, the wrong line is being reported again.

So I am still looking for a working solution…

Stay tuned

**UPD**: Raised a question on StackOverflow: http://stackoverflow.com/questions/27645848/powershell-how-to-get-a-proper-error-line-number-with-erroractionpreference

**UPD2**: Thanks to the StackOverflow link above I've finally found a proper solution.

The magic line is

```powershell
trap { throw $Error[0] }
```

This script

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

trap { throw $Error[0] }

function ThrowFunction($i)
{
    "ThrowFunction $i"
    $someNonExistingVariable
}

@(1, 2, 3) | ForEach-Object -Process { ThrowFunction $_ }
```

returns

```
C:\Dev> .\MyScript.ps1
ThrowFunction 1
The variable '$someNonExistingVariable' cannot be retrieved because it has not been set.
At C:\Dev\MyScript.ps1:17 char:29
+     $someNonExistingVariable <<<<
    + CategoryInfo          : InvalidOperation: (someNonExistingVariable:Token) [], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined
```

Great!
