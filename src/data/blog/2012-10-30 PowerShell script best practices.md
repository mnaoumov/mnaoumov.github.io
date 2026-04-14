---
description: "Best practices for PowerShell scripts: error handling preamble, strict mode, PSScriptRoot, and readability rules."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[best-practices](<../Tags/best-practices.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2012-10-30T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell script best practices"
url:
  - https://mnaoumov.wordpress.com/2012/10/31/powershell-script-best-practices/
disabled rules:
  - yaml-title
---

# 2012-10-30 PowerShell script best practices

I would like to share some ideas that I believe is best practices in PowerShell development

# Script Prefixing

In the beginning of all my scripts I add

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$PSScriptRoot = $MyInvocation.MyCommand.Path | Split-Path
```

Line 1 - enforcing PowerShell version

Line 3 - Automatically implement the standard `-Verbose`, `-Debug`, `-ErrorAction`, `-ErrorVariable`, `-Confirm`, and `-?` arguments for you and maybe some other minor stuff.

Line 8 - Enforces all errors to become terminating unless you override with per-command `-ErrorAction` parameters or wrap in a try-catch block `script:` prefix is used to fix some known issue with PSv3CTP2 ISE bug

Line 9 - Ensures you only refer to variables that exist (great for typos) and enforces some other "best-practice" coding rules.

Line 10 - This gets the absolute path of the folder containing the script that is running. This is useful when referring to other files relative to the script without relying on the current working directory. The variable name is chosen as such because this is the name of the variable PowerShell gives you for free when you write a module thereby making future refactoring to a module easier. Also I would like to mention that this variable became automatically set in PowerShell 3 for ps1 scripts, so Line 10 is not needed if you are targetting PowerShell 3 only.

Most of these descriptions were stolen word-by-word from Jason Stangroome ([http://blog.codeassassin.com/](http://blog.codeassassin.com/))

# Readability

I think readability of the scripts is very important. So

- Always use proper indents in your script files
- Never use aliases, use vanilla cmdlets instead. Bad: `dir` Good: `Get-ChildItem`
- Always use full property names rather than shorthands Bad: `Get-ChildItem -ea 0` Good: `Get-ChildItem -ErrorAction SilentlyContinue`

See [here](http://learn-powershell.net/2012/03/21/scripting-games-2012-tip-dont-use-aliases/) also
