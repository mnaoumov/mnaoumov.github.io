---
description: "PowerShell function and alias that elevates a process with admin rights, mimicking Unix sudo behavior."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[uac](<../Tags/uac.md>)"
pubDatetime: 2012-08-28T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "sudo in PowerShell"
url:
  - https://mnaoumov.wordpress.com/2012/08/29/sudo-in-powershell/
disabled rules:
  - yaml-title
---

# 2012-08-28 sudo in PowerShell

Grabbed [here](http://poshcode.org/696)

```powershell
function Elevate-Process
{
    $file, [string]$arguments = $args;
    $psi = New-Object System.Diagnostics.ProcessStartInfo $file;
    $psi.Arguments = $arguments;
    $psi.Verb = "runas";
    $psi.WorkingDirectory = Get-Location;
    [System.Diagnostics.Process]::Start($psi);
}

Set-Alias sudo Elevate-Process;
```
