---
description: Pattern for structuring PowerShell scripts with a Main function so core logic appears at the top before helper functions.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2013-08-21T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:08:52-06:00
title: 'PowerShell scripts and "Pattern Main"'
url:
  - https://mnaoumov.wordpress.com/2013/08/21/powershell-scripts-and-pattern-main/
disabled rules:
  - yaml-title
aliases:
  - '2013-08-21 PowerShell scripts and "Pattern Main"'
linter-yaml-title-alias: '2013-08-21 PowerShell scripts and "Pattern Main"'
---

# 2013-08-21 PowerShell scripts and "Pattern Main"

Usually when I write PowerShell scripts I need to introduce a helper function

**Script.ps1**

```powershell
for ($i = 0; $i -lt 10; $i++)
{
    Write-Host "$i * $i = $($i * $i)"
}
```

We want to extract a separate function

```powershell
function Get-Square($n) { return $n * $n }

for ($i = 0; $i -lt 10; $i++)
{
    Write-Host "$i * $i = $(Get-Square $i)"
}
```

As you see, we had to declare helper function before we can use it. And when we introduce more and more functions we need to declare them before their usage.

I think this is very inconvenient. Your script file will eventually look like

```powershell
function HelperFunction1
{
...
}

function HelperFunction2
{
...
}

...

function HelperFunction20
{
...
}

# Only here core script itself that uses all the functions

```

Usually when you read your script you are interested in your core script logic more than helper functions so it is more logical to have it at the top of the script

To have it, I invented a very simple pattern "Main". You just need to wrap you core logic into a Main function at the beginning of the script and then call Main function at the end of the script.

```powershell
function Main
{
    # Put our core script logic here
}

function HelperFunction1
{
...
}

function HelperFunction2
{
...
}

...

function HelperFunction20
{
...
}

Main
```

Now it is easier to read and still a valid script.

Pretty simple, isn't it?
