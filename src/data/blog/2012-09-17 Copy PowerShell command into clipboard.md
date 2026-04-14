---
description: "One-liner to copy the last executed PowerShell command to the clipboard using Get-History and clip."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[clipboard](<../Tags/clipboard.md>)"
pubDatetime: 2012-09-17T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Copy PowerShell command into clipboard"
url:
  - https://mnaoumov.wordpress.com/2012/09/17/copy-powershell-command-into-clipboard/
disabled rules:
  - yaml-title
---

# 2012-09-17 Copy PowerShell command into clipboard

Sometime I want to post my PowerShell commands into blog. I don't like default host with stupid rectangular selection.

So the workaround I am using is

```powershell
(Get-History)[-1].CommandLine | clip
```

It will copy last command you typed into Clipboard
