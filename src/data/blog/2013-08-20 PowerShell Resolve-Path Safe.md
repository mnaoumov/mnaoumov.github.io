---
description: How to resolve paths for non-existent files in PowerShell using GetUnresolvedProviderPathFromPSPath instead of Resolve-Path.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[file-io](<../Tags/file-io.md>)"
pubDatetime: 2013-08-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell Resolve-Path Safe"
url:
  - https://mnaoumov.wordpress.com/2013/08/21/powershell-resolve-path-safe/
disabled rules:
  - yaml-title
---

# 2013-08-20 PowerShell Resolve-Path Safe

PowerShell cmdlet **Resolve-Path** converts from relative path to the absolute

```shell
PS C:\dev> Resolve-Path .\file-exists.txt

Path
----
C:\dev\file-exists.txt
```

However if we need to resolve path for non-existent file it fails

```
PS C:\dev> Resolve-Path .\file-not-exists.txt
Resolve-Path : Cannot find path 'C:\dev\file-not-exists.txt' because it does not exist.
At line:1 char:13
+ Resolve-Path <<<<  .\file-not-exists.txt
    + CategoryInfo          : ObjectNotFound: (C:\dev\file-not-exists.txt:String) [Resolve-Path], ItemNotFoundExceptio
   n
    + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.ResolvePathCommand
```

The goal for this blogpost is to find a reliable way

My first approach was

```powershell
[System.IO.Path]::GetFullPath(".\file-not-exists.txt")
```

But this is not right because it resolves path not from the current folder, but from the working folder where PowerShell process was started (C:\Users\Michael for me)

To fix that we need to change with working folder

```powershell
[Environment]::CurrentDirectory = $PWD
[System.IO.Path]::GetFullPath(".\file-not-exists.txt")
```

I think that's too much of effort for such a simple thing. And moreover who knows maybe this will affect something else

I [found](http://stackoverflow.com/questions/3038337/powershell-resolve-path-that-might-not-exist) other interesting approaches

And I liked the top one from the link above

```powershell
function Resolve-PathSafe
{
    param
    (
        [string] $Path
    )

    $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Path)
}
```

So now it works

```shell
PS C:\dev> Resolve-PathSafe .\file-not-exists.txt
C:\dev\file-not-exists.txt
```
