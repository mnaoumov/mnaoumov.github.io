---
description: Fix for a PowerShell 3 startup error caused by disconnected network drives, resolved via a registry key change.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[registry](<../Tags/registry.md>)"
  - "[networking](<../Tags/networking.md>)"
pubDatetime: 2014-06-05T01:00:00-06:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "PowerShell 3 - Attempting to perform the InitializeDefaultDrives operation on the FileSystem provider failed"
url:
  - https://mnaoumov.wordpress.com/2014/06/06/powershell-3-attempting-to-perform-the-initializedefaultdrives-operation-on-the-filesystem-provider-failed/
disabled rules:
  - yaml-title
---

# 2014-06-05 PowerShell 3 - Attempting to perform the InitializeDefaultDrives operation on the FileSystem provider failed

Hi folks

I found that after upgrade PowerShell to version 3 you may discover the following error on startup:

```
Attempting to perform the InitializeDefaultDrives operation on the 'FileSystem' provider failed.
```

Most probably this is caused by disconnected network drive in **My computer**

![network-location.png](<./!!files/2014-06-05 PowerShell 3 - Attempting to perform the InitializeDefaultDrives operation on the FileSystem provider failed/network-location.png>)

You can try to disconnect unused drives.

You can also try to fix it by setting some registry key using the following PowerShell script:

```powershell
Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -Name EnableLinkedConnection -Value 1 -Type DWord
```
