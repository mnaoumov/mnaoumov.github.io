---
description: "Explains how to use a PowerShell profile script to automatically run commands on every PowerShell session start."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[windows](<../Tags/windows.md>)"
pubDatetime: 2012-08-29T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "How to add script to PowerShell 'startup'_"
url:
  - https://mnaoumov.wordpress.com/2012/08/29/how-to-add-script-to-powershell-startup/
disabled rules:
  - yaml-title
---

# 2012-08-29 How to add script to PowerShell 'startup'_

I am using for that [PowerShell Profile](http://technet.microsoft.com/en-us/library/ee692764.aspx) scripts.

```powershell
if (!Test-Path $profile)
{
    New-Item $profile -Type File -Force
}

notepad $profile
```

Here we can add scripts to be loaded always on PowerShell process startup.
