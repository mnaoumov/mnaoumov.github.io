---
description: "Shows the syntax for running a PowerShell command from a .cmd batch file, including how to escape quotes."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[batch-files](<../Tags/batch-files.md>)"
  - "[windows](<../Tags/windows.md>)"
pubDatetime: 2012-08-19T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Execute PowerShell command from batch file"
url:
  - https://mnaoumov.wordpress.com/2012/08/20/execute-powershell-command-from-batch-file/
disabled rules:
  - yaml-title
---

# 2012-08-19 Execute PowerShell command from batch file

**MyBatch.cmd**

```powershell
PowerShell -Command "& { /\* Insert your command here \*/ }"
```

NOTE that inside command you have to escape quote character (**"**) with backslash (**\\**)

```powershell
PowerShell -Command "& { \"\" -eq [string]::Empty }"
```
