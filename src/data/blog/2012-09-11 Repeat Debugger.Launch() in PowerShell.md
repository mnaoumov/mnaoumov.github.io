---
description: "Shows how to set a named breakpoint in PowerShell profile using Set-PSBreakPoint so scripts can trigger the debugger inline."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2012-09-11T00:00:00-07:00
created: 2026-04-13T13:01:40-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Repeat Debugger.Launch() in PowerShell"
url:
  - https://mnaoumov.wordpress.com/2012/09/12/repeat-debugger-launch-in-powershell/
disabled rules:
  - yaml-title
---

# 2012-09-11 Repeat Debugger.Launch() in PowerShell

I decided to put the stuff here [again](<./2012-05-22 Debugger.Launch() analogue for PowerShell.md>) as I found it is useful to extract the most important part from there

[Whole article](http://msgoodies.blogspot.com.au/2010/02/invoking-powershell-debugger-from.html)

Important (for me) part of the article

Add the following code to your PowerShell profile.

```powershell
function Invoke-Debugger{}
New-Alias id Invoke-Debugger
$null = Set-PSBreakPoint –Command Invoke-Debugger
```

Now you can set breakpoints from code itself.

Just write

```powershell
function MyFunction()
{
    DoSomeStuff()
    Invoke-Debugger()
    DoOtherStuff()
    # or even simpler
    id
}
```

You will get to the breakpoint you set and you can debug it, see callstack, fetch local variables etc…
