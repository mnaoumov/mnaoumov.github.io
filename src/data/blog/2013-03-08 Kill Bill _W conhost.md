---
description: PowerShell script to kill all orphaned conhost.exe processes while preserving the one attached to the current session.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[process-management](<../Tags/process-management.md>)"
  - "[conhost](<../Tags/conhost.md>)"
pubDatetime: 2013-03-08T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Kill Bill _W conhost"
url:
  - https://mnaoumov.wordpress.com/2013/03/09/kill-the-bill-w-conhost/
disabled rules:
  - yaml-title
---

# 2013-03-08 Kill Bill _W conhost

Sometimes we can have dozens of **conhost.exe** processes that eating our memory.

What is conhost?

Basically it is a process that runs at the same time with any console application you are running.

[Learn more](http://davidovitz.blogspot.com.au/2011/06/story-of-multiple-conhostexe.html)

What if we want to kill them all? We go to PowerShell and type

```powershell
Stop-Process -Name conhost
```

Oops? What happened? It also stopped our PowerShell process.

Ok, then, we want to stop all conhost process except the one which corresponds to the PowerShell.

After some checks and using the article linked above, I've found that the only reliable way to find out which conhost process corresponds to which console application, is to check their creation time.

```powershell
function Get-CorrespondingConhostProcessId
{
    param
    (
        $processId = $PID
    )

    $powerShellCreationDate = Get-ProcessCreationDate $processId

    $conhostProcessIds = Get-Process -Name conhost | `
        Select-Object -ExpandProperty Id

    foreach ($conhostProcessId in $conhostProcessIds)
    {
        $conhostCreationDate = Get-ProcessCreationDate $conhostProcessId

        $diff = $conhostCreationDate - $powerShellCreationDate

        if ([Math]::Abs($diff.TotalSeconds) -lt 1)
        {
            return $conhostProcessId
        }
    }
}

function Get-ProcessCreationDate
{
    param
    (
        [int] $ProcessId
    )

    $wmiDate = Get-WmiObject -Class Win32_Process -Filter "ProcessId = $ProcessId" | `
        Select-Object -ExpandProperty CreationDate

    [System.Management.ManagementDateTimeConverter]::ToDateTime($wmiDate)
}
```

Using functions we can write function

```powershell
function Kill-Conhost
{
    $correspondingConhostProcessId = Get-CorrespondingConhostProcessId
    Get-Process -Name conhost | `
        Where-Object { $_.Id -ne $correspondingConhostProcessId  } | `
        Stop-Process
}
```

Voila!
