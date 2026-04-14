---
description: How Set-StrictMode interacts with legacy PowerShell scripts and safe workarounds for missing variables and properties.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2013-07-23T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Set-StrictMode and legacy code issues"
url:
  - https://mnaoumov.wordpress.com/2013/07/23/set-strictmode-and-legacy-code-issues/
disabled rules:
  - yaml-title
---

# 2013-07-23 Set-StrictMode and legacy code issues

I am a big fan of [Set-StrictMode](http://technet.microsoft.com/en-us/library/hh849692.aspx) cmdlet.

I [always](<./2012-10-30 PowerShell script best practices.md>) add

```powershell
Set-StrictMode -Version Latest
```

into all my PowerShell scripts, this helps a lot to catch typos and call for missing variables earlier.

However, that's ok if you work with your own scripts only. But if you call some legacy scripts from your script, you can discover many hidden issues.

So here we will try to understand how to overcome such issues.

# Hammer Approach

If we can't or don't want to modify legacy code we can just temporary disable strict mode.

```powershell
Set-StrictMode -Off
try
{
   # call your legacy code
}
finally
{
    Set-StrictMode -Version Latest
}
```

# Missing Variable

Sometimes, I see code like

```powershell
if (-not $myVariable)
{
    # Do something ...
}
```

In non-strict mode, if variable does not exist, PowerShell treats it as $null

In strict mode we get

```
The variable '$myVariable' cannot be retrieved because it has not been set.
At line:1 char:16
+ if ($myVariable <<<< ) {}
    + CategoryInfo          : InvalidOperation: (myVariable:Token) [], RuntimeException
    + FullyQualifiedErrorId : VariableIsUndefined
```

Safe equivalent for check of variable existence is

```powershell
if (-not (Test-Path Variable:myVariable))
{
    # Do something ...
}
```

Equivalent for check for **$Global:myVariable** is

```powershell
Test-Path Variable:Global:myVariable
```

# Missing Property

Sometimes, code tries to access object's property which does not exist.

```powershell
$property = $object.MissingProperty
```

In non-strict mode, if property does not exist, PowerShell treats it as $null

In strict mode we get

```
Property 'MissingProperty' cannot be found on this object. Make sure that it exists.
At line:1 char:9
+ $object. <<<< MissingProperty
    + CategoryInfo          : InvalidOperation: (.:OperatorToken) [], RuntimeException
    + FullyQualifiedErrorId : PropertyNotFoundStrict
```

Safe equivalent would be

```powershell
$property = $object | Select-Object -ExpandProperty MissingProperty -ErrorAction SilentlyContinue
```
