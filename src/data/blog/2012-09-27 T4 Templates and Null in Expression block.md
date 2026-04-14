---
description: "T4 templates throw ArgumentNullException on null expression blocks; fix by overriding ToStringWithCulture in the base class."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[t4](<../Tags/t4.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[code-generation](<../Tags/code-generation.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "T4 Templates and Null in Expression block"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/t4-templates-and-null-in-expression-block/
disabled rules:
  - yaml-title
---

# 2012-09-27 T4 Templates and Null in Expression block

Another annoying issue with T4 templates is its support for nulls.

If you have template

```
<#@ Template Language="C#" \#>
<#@ Output Extension=".txt" \#>
Null string: "<#= (string) null \#>"
```

Both design-time and runtime templates will fail with

```
An expression block evaluated as Null
System.ArgumentNullException: Value cannot be null.
Parameter name: objectToConvert
   at Microsoft.VisualStudio.TextTemplating.ToStringHelper.ToStringWithCulture(Object objectToConvert)
```

And this is very annoying because sometime you are calling external functions and you don't want to check for nulls all the time.

```
<#@ Template Language="C#" \#> Null string: "<#= (object) Helper.MyFunction() ?? "" \#>"
```

It is unacceptable.

So I decided to change base template class and handle 'null' case.

For runtime templates I modify base class which we created previously and fix **ToStringWithCulture** method

```csharp
public string ToStringWithCulture(object objectToConvert)
{
    if (objectToConvert == null)
        return "";
    ...
}
```
