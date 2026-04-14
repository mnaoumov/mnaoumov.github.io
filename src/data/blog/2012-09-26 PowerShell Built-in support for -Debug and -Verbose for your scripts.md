---
description: "How to enable PowerShell common parameters -Debug and -Verbose in custom scripts using CmdletBinding and DebugPreference."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2012-09-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "[PowerShell] Built-in support for -Debug and -Verbose for your scripts"
url:
  - https://mnaoumov.wordpress.com/2012/09/26/powershell-built-in-support-for-debug-and-verbose-for-your-scripts/
aliases:
  - "[PowerShell] Built-in support for -Debug and -Verbose for your scripts"
disabled rules:
  - yaml-title
---

# 2012-09-26 PowerShell Built-in support for -Debug and -Verbose for your scripts

[Here](http://nancyhidywilson.wordpress.com/2011/11/21/powershell-using-common-parameters/) is very good article about adding support for so-called **Common Parameters** such as **\-Verbose** or **\-Debug**

Short overview of the article above

To enable support for **Common Parameters** you need to add the following snippet on top of your script

```powershell
[CmdletBinding()]
Param ()
```

So now you can invoke

```powershell
.\MyScript.ps1 -Debug -Verbose
```

If you don't like the fact that your script breaks on every **Write-Debug** you can use the following snippet

```powershell
if ($PSCmdlet.MyInvocation.BoundParameters["Debug"].IsPresent)
{
    $DebugPreference = "Continue"
    }
```

Another approach to enable **Write-Debug** and **Write-Verbose** everywhere would be to add the following snippet into your **PowerShell profile script**

```powershell
$global:DebugPreference = "Continue"
$global:VerbosePreference = "Continue"
```

It is especially useful if you have a complex chain of calls and you don't want to modify all of them.
