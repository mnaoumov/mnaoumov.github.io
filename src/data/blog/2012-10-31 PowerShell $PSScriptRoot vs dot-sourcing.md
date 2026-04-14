---
description: Bug in PowerShell 2 where dot-sourcing overwrites $PSScriptRoot; workaround using a function instead of a variable.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[bug](<../Tags/bug.md>)"
  - "[dot-sourcing](<../Tags/dot-sourcing.md>)"
pubDatetime: 2012-10-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell $PSScriptRoot vs dot-sourcing"
url:
  - https://mnaoumov.wordpress.com/2012/10/31/powershell-psscriptroot-vs-dot-sourcing/
disabled rules:
  - yaml-title
---

# 2012-10-31 PowerShell $PSScriptRoot vs dot-sourcing

In my previous [blogpost](<./2012-10-30 PowerShell script best practices.md>) I talked about **$PSScriptRoot** variable

Unfortunately there is a problem with that approach and dot-sourcing in PowerShell 2

Imagine we have

**C:\Scripts\Script1.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$PSScriptRoot = $MyInvocation.MyCommand.Path | Split-Path

. "$PSScriptRoot\SubFolder\Script2.ps1"
. "$PSScriptRoot\SubFolder\Script3.ps1"

Invoke-Script4
```

**C:\Scripts\SubFolder\Script2.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$PSScriptRoot = $MyInvocation.MyCommand.Path | Split-Path

function Invoke-Script4
{
    & "$PSScriptRoot\Script4.ps1"
}
```

**C:\Scripts\SubFolder\Script3.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
```

**C:\Scripts\SubFolder\Script4.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$PSScriptRoot = $MyInvocation.MyCommand.Path | Split-Path

"Script4.ps1 invoked"
```

Then if you invoke **C:\Scripts\Script1.ps1** in PowerShell 3 it is all good and works as expected

```bash
C:\> C:\scripts\Script1.ps1 Script4.ps1 invoked
```

However if you run the same in PowerShell 2

```bash
C:\> C:\Scripts\Script1.ps1
. : The term 'C:\Scripts\SubFolder\SubFolder\Script3.ps1' is not recognized as the name of a cmdlet, function, script f
ile, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct an
d try again.
At C:\Scripts\Script1.ps1:13 char:2
+ . <<<<  "$PSScriptRoot\SubFolder\Script3.ps1"
    + CategoryInfo          : ObjectNotFound: (C:\Scripts\SubF...der\Script3.ps1:String) [], ParentContainsErrorRecord
   Exception
    + FullyQualifiedErrorId : CommandNotFoundException
```

As you can see we have strange double SubFolder **C:\\Scripts\\SubFolder\\SubFolder\\Script3.ps1**

When we execute **Script1.ps1** it uses dot-sourcing for **Script2.ps1** which changes **$PSScriptRoot** variable and then when **Script1.ps1** executes its line \#13 that variable is already changed and pointing to the wrong folder

I found another blogpost about the same issue [http://rkeithhill.wordpress.com/2010/09/19/determining-scriptdir-safely/](http://rkeithhill.wordpress.com/2010/09/19/determining-scriptdir-safely/)

And finally I have got a reliable solution

Instead of defining **$PSScriptRoot** variable define the following function

```powershell
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
```

And replace usage **\$PSScriptRoot** with **\$(PSScriptRoot)**

This approach works as expected in PowerShell 2 and 3
