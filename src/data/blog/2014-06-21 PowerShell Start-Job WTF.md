---
description: Troubleshoots Start-Job scope issues with PSScriptRoot and shows how to invoke a script path asynchronously using ScriptBlock.Create.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2014-06-21T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell Start-Job WTF"
url:
  - https://mnaoumov.wordpress.com/2014/06/21/powershell-start-job-wtf/
disabled rules:
  - yaml-title
---

# 2014-06-21 PowerShell Start-Job WTF

Hi folks

Another WTF...

Let's consider the following scenario:

**Script1.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
Trap { throw $_ }

& "$(PSScriptRoot)\Script2.ps1"
# TODO: Invoke Script2.ps1 asynchronously

```

**Script2.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
Trap { throw $_ }

& "$(PSScriptRoot)\Script3.ps1"
```

**Script3.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
Trap { throw $_ }

"Invoking Script3.ps1"
```

Now we want to modify **Script1.ps1** to run **Script2.ps1** asynchronously

Let's modify line \#13

```powershell
$job = Start-Job -FilePath "$(PSScriptRoot)\Script2.ps1" $job | Wait-Job | Receive-Job
```

If we run **Script1.ps1** it fails with

```
Receive-Job : Cannot bind argument to parameter 'Path' because it is an empty string.
At C:\dev\Script1.ps1:14 char:30
+ $job | Wait-Job | Receive-Job <<<<
    + CategoryInfo          : InvalidData: (:String) [Split-Path], ParameterBindingValidationException
    + FullyQualifiedErrorId : ParameterArgumentValidationErrorEmptyStringNotAllowed,Microsoft.PowerShell.Commands.SplitPathCommand
```

Stack trace is not helpful at all. But I narrowed down the issue to the line \#10 of **Script2.ps1**

```powershell
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
```

The problem here that **$MyInvocation.ScriptName** is null

This happened because **Start-Job** reads the content of **Script2.ps1** and executes it not in a script scope but as a separate ScriptBlock.

To emulate the problem we can use

```powershell
$code = Get-Content -Path .\Script2.ps1 | Out-String
$scriptBlock = [ScriptBlock]::Create($code)
& $scriptBlock
```

And this fails with the same error

We cannot get rid of the this **PSScriptRoot** function because it is required to invoke **Script3.ps1**

So to fix it let's try another approach

```powershell
$job = Start-Job -ScriptBlock { & "$(PSScriptRoot)\Script2.ps1" }
$job | Wait-Job | Receive-Job
```

And this fails with

```
The term 'PSScriptRoot' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of th e name, or if a path was included, verify that the path is correct and try again.
At C:\dev\Script1.ps1:14 char:1
+  <<<< $job | Wait-Job | Receive-Job
    + CategoryInfo          : ObjectNotFound: (PSScriptRoot:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

This happens because **\$(PSScriptRoot)** function is accessed inside the started job and is not available at this stage. So we need to expand **"\$(PSScriptRoot)\Script2.ps1"** before the job started

```powershell
$script2 = "$(PSScriptRoot)\Script2.ps1"
$job = Start-Job -ScriptBlock { & $script2 }
$job | Wait-Job | Receive-Job
```

And this fails with

```
The expression after '&' in a pipeline element produced an invalid object. It must result in a command name, script block or CommandInfo object.
At C:\dev\Script1.ps1:15 char:1
+  <<<< $job | Wait-Job | Receive-Job
    + CategoryInfo          : InvalidOperation: (:) [], RuntimeException
    + FullyQualifiedErrorId : BadExpression
```

The reason for that is the fact that we are using **$script2** variable inside the started job and this variable is not available.

We need to construct a ScriptBlock from the string

```powershell
$script2 = "$(PSScriptRoot)\Script2.ps1"
$scriptBlock = [ScriptBlock]::Create($script2)
$job = Start-Job -ScriptBlock $scriptBlock
$job | Wait-Job | Receive-Job
```

And this works as expected

So our final cleaned version

```powershell
$job = Start-Job -ScriptBlock ([ScriptBlock]::Create("$(PSScriptRoot)\Script2.ps1"))
$job | Wait-Job | Receive-Job
```

Oh man... That was not easy...
