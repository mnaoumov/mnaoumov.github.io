---
description: "Difference between Get-Content (returns array of lines) and ReadAllText (returns full string), with alternatives for both PowerShell versions."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[file-io](<../Tags/file-io.md>)"
pubDatetime: 2012-09-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell Get-Content vs _System.IO.File___ReadAllText"
url:
  - https://mnaoumov.wordpress.com/2012/09/20/powershell-get-content-vs-system-io-filereadalltext/
disabled rules:
  - yaml-title
---

# 2012-09-20 PowerShell Get-Content vs _System.IO.File___ReadAllText

The difference between

```powershell
Get-Content "FileName.txt"
```

and

```powershell
[System.IO.File]::ReadAllText("FileName.txt")
```

That first one returns array of lines in the file and second returns one string for whole file.

There are couple of other ways to achieve second behavior with **Get-Content** as well

According to [this](http://social.technet.microsoft.com/wiki/contents/articles/4788.powershell-v3-tips-and-tricks-what-s-new-in-v3-en-us.aspx) in PowerShell 3 you can do that using new parameter **Raw**

```powershell
Get-Content "FileName.txt" -Raw
```

The solution that works in PowerShell 2:

```powershell
Get-Content "FileName.txt" | Out-String
```
