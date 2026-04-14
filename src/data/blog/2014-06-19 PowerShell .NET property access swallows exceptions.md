---
description: Demonstrates that PowerShell silently returns null when a .NET property getter throws an exception, and how to avoid it.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2014-06-19T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell .NET property access swallows exceptions"
url:
  - https://mnaoumov.wordpress.com/2014/06/19/powershell-net-property-access-swallows-exceptions/
disabled rules:
  - yaml-title
---

# 2014-06-19 PowerShell .NET property access swallows exceptions

Hi folks

Recently I discovered some WTF which I would like to discuss.

```powershell
$p = New-Object -TypeName System.Diagnostics.Process
```

then check

```powershell
$p.ExitCode
```

returns nothing

```powershell
$p.ExitCode -eq $null
```

returns **True**

Let's check the type of **ExitCode** property

```powershell
$p | Get-Member -Name ExitCode
```

returns

```
TypeName: System.Diagnostics.Process

Name MemberType Definition
---- ---------- ----------
ExitCode Property System.Int32 ExitCode {get;}
```

So we see a return type is **System.Int32** which is not nullable. So **ExitCode** property cannot return null.

Hmm… How is that possible?

Let's try another way

```powershell
$p.get_ExitCode()
```

it returns

```
Exception calling "get_ExitCode" with "0" argument(s): "No process is associated with this object." At line:1 char:16 + $p.get_ExitCode <<<< () + CategoryInfo : NotSpecified: (:) [], MethodInvocationException + FullyQualifiedErrorId : DotNetMethodException
```

So clearly when you get a property which throws an exception you swallows the exception and returns **$null**

I did not find any PowerShell documentations that states such behavior.

The only thing I found is a similar [StackOverflow question](http://stackoverflow.com/questions/16482316/calculated-properties-do-not-throw-exceptions-in-powershell-what-are-the-workar) about calculated properties.

So in cases if you need to get a property and you don't want to swallow exceptions you have to use **get_Property()** approach
