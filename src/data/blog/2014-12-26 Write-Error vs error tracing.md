---
description: PowerShell Write-Error always reports line 1 instead of the actual error location, with no clean workaround found.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[error-handling](<../Tags/error-handling.md>)"
pubDatetime: 2014-12-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Write-Error vs error tracing"
url:
  - https://mnaoumov.wordpress.com/2014/12/26/write-error-vs-error-tracing/
disabled rules:
  - yaml-title
---

# 2014-12-26 Write-Error vs error tracing

Hi folks

The only unresolved problem with error tracing left is the problem with **Write-Error**

Consider the script

```powershell
$someComplexCondition = $false

if ($someComplexCondition)
{
    Write-Error -Message "Some complex condition"
}
else
{
    Write-Error -Message "Other complex condition"
}
```

When I run it it says

```
C:\Dev> .\MyScript.ps1
C:\Dev\MyScript.ps1 : Other complex condition
At line:1 char:15
+ .\MyScript.ps1 <<<<
    + CategoryInfo          : NotSpecified: (:) [Write-Error], WriteErrorException
    + FullyQualifiedErrorId : Microsoft.PowerShell.Commands.WriteErrorException,MyScript.ps1
```

And I noticed that **Write-Error** always reports itself as at line:1 According to the stack trace it looks like it's line \#1 because it was called from the shell and more interesting **char:15** because

```powershell
".\MyScript.ps1 ".Length -eq 15
```

If we change file name, this **char:15** will be changed accordingly.

The question is how to get the actual line when the error occurred.

In our case I would like to get **line:9**

I did not find a solution.

Raised a question on StackOverflow: [http://stackoverflow.com/questions/27654028/get-a-line-number-where-write-error-occurred/27656478](http://stackoverflow.com/questions/27654028/get-a-line-number-where-write-error-occurred/27656478)
