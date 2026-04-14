---
description: Reliable PowerShell technique to detect whether a git hook runs in a console or a GUI environment like Git Extensions.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[console](<../Tags/console.md>)"
  - "[gui](<../Tags/gui.md>)"
pubDatetime: 2013-01-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Detect Console mode vs UI"
url:
  - https://mnaoumov.wordpress.com/2013/01/31/detect-console-mode-vs-ui/
disabled rules:
  - yaml-title
---

# 2013-01-31 Detect Console mode vs UI

For my git hooks I needed to distinguish if git command was called from console or from UI (Git Extensions), because I wanted to have console prompts in first case, and WPF GUI in second.

At some stage we found one very complex implementation which worked fine with cmd, PowerShell, Bash and Git Extensions, but did not work for Cygwin and TortoiseGit. That implementation was not very reliable, because it relied on the parent process of git.exe process, that we checked inside the hook.

This check was working fine from **commit-msg**, however none of those checks worked for **pre-rebase**.

I tried all my best to find an implementation which will work with different hooks and environments.

And finally I [found](http://stackoverflow.com/a/6421754/1074455) an extremely easy implementation.

```powershell
function Test-RunningFromConsole
{
    try
    {
        $height = [Console]::WindowHeight
        return ($height -ne $null)
    }
    catch
    {
        return $false
    }
}
```

This check is absolutely reliable
