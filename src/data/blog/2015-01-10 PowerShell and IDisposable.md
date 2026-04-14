---
description: Implementing a PSUsing helper function in PowerShell that mimics C# using blocks for IDisposable objects.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2015-01-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "PowerShell and IDisposable"
url:
  - https://mnaoumov.wordpress.com/2015/01/11/powershell-and-idisposable/
disabled rules:
  - yaml-title
---

# 2015-01-10 PowerShell and IDisposable

Hi folks

C# has a nice syntactic sugar

```csharp
using (var myDisposable = new MyDisposable())
{
    // ...
}
```

which corresponds to

```csharp
MyDisposable myDisposable = null;
try
{
    myDisposable = new MyDisposable()
    // ...
}
finally
{
    if (myDisposable != null)
        myDisposable.Dispose()
}
```

Let's implement the same thing for PowerShell

```powershell
function PSUsing
{
    param
    (
        [IDisposable] $disposable,
        [ScriptBlock] $scriptBlock
    )

    try
    {
        & $scriptBlock
    }
    finally
    {
        if ($disposable -ne $null)
        {
            $disposable.Dispose()
        }
    }
}
```

We could not use **Using** because it is a reserved PowerShell word.

And we can use it like

```powershell
PSUsing ($myDisposable = New-Object -TypeName MyDisposable) `
{
    # ...
}
```

Stay tuned
