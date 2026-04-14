---
description: "Explains why Sort-Object -Property fails on PowerShell hashtables and how to sort them correctly using a script block."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[hashtable](<../Tags/hashtable.md>)"
pubDatetime: 2012-09-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell Sort-Object and Hashtables"
url:
  - https://mnaoumov.wordpress.com/2012/09/18/powershell-sort-object-and-hashtables/
disabled rules:
  - yaml-title
---

# 2012-09-18 PowerShell Sort-Object and Hashtables

Maybe this will be obvious for everyone but I would like to share it anyway because I had some WTFs today :)

I had an array of objects with _anonymous type_ and I wanted to sort them by some property.

```powershell
$array = @(@{ Description = "bbb"; Value = 123 }, @{ Description = "aaa"; Value = 345 })

$array | Sort-Object -Property Description
```

I was surprised but last command did not work as expected. My array still remained unsorted.

```bash
Name                           Value
----                           -----
Value                          123
Description                    bbb
Value                          345
Description                    aaa
```

After some head-scratch finally I found the right way.

```powershell
$array | Sort-Object { $_.Description }
```

```
Name                           Value
----                           -----
Value                          345
Description                    aaa
Value                          123
Description                    bbb
```

The problem with first approach was that I have been using hashtables (**@{ ... }**) and property **Description** is not a real property of that object.

Another approach would be to convert objects from HashTables to real anonymous objects

```powershell
$array = @(@{ Description = "bbb"; Value = 123 }, @{ Description = "aaa"; Value = 345 }) | ForEach-Object { New-Object PSObject -Property $_ }

$array | Sort-Object -Property Description
```

```
Value Description
 ----- -----------
   345 aaa
   123 bbb
```
