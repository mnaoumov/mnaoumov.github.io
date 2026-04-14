---
description: "Introduction to PsGet, a package manager for PowerShell modules installable with a one-liner."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[package-manager](<../Tags/package-manager.md>)"
pubDatetime: 2012-09-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PsGet - NuGet for PowerShell"
url:
  - https://mnaoumov.wordpress.com/2012/09/16/psget-nuget-for-powershell/
disabled rules:
  - yaml-title
---

# 2012-09-16 PsGet - NuGet for PowerShell

[PsGet](http://psget.net/) - Nice package manager for PowerShell

Installation is extremely simple

```powershell
(New-Object Net.WebClient).DownloadString("http://psget.net/GetPsGet.ps1") | iex
```

After that you can install a lot of packages from the [directory](http://psget.net/directory/)
