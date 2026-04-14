---
description: "PowerShell script to append a directory to the system PATH and broadcast the change to running processes without rebooting."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[environment-variables](<../Tags/environment-variables.md>)"
pubDatetime: 2012-07-23T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell Add directory to Environment PATH variable"
url:
  - https://mnaoumov.wordpress.com/2012/07/24/powershell-add-directory-to-environment-path-variable/
disabled rules:
  - yaml-title
---

# 2012-07-23 PowerShell Add directory to Environment PATH variable

Interesting part here is **ApplyImmediately** parameter, which allows newly created processes to use updated PATH without rebooting. **NOTE**: existing processes (such as PowerShell) cannot use updated PATH. You should rerun the process.

```powershell
#requires -version 2

param(
    [string] $AddedFolder,
    [bool] $ApplyImmediately = $true
)

$environmentRegistryKey = 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment'

$oldPath = (Get-ItemProperty -Path $environmentRegistryKey -Name PATH).Path

# See if a new folder has been supplied.

if (!$AddedFolder)
{
    Write-Warning 'No Folder Supplied. $ENV:PATH Unchanged'
    return
}

if ($ENV:PATH | Select-String -SimpleMatch $AddedFolder)
{
    Write-Warning 'Folder already within $ENV:PATH'
    return
}

$newPath = $oldPath + ’;’ + $AddedFolder

Set-ItemProperty -Path $environmentRegistryKey -Name PATH -Value $newPath

if ($ApplyImmediately)
{
    if (-not ("Win32.NativeMethods" -as [Type]))
    {
        # import sendmessagetimeout from win32
        Add-Type -Namespace Win32 -Name NativeMethods -MemberDefinition @"
    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
    public static extern IntPtr SendMessageTimeout(
        IntPtr hWnd, uint Msg, UIntPtr wParam, string lParam,
        uint fuFlags, uint uTimeout, out UIntPtr lpdwResult);
"@
    }

    $HWND_BROADCAST = [IntPtr] 0xffff;
    $WM_SETTINGCHANGE = 0x1a;
    $result = [UIntPtr]::Zero

    # notify all windows of environment block change
    [Win32.Nativemethods]::SendMessageTimeout($HWND_BROADCAST, $WM_SETTINGCHANGE, [UIntPtr]::Zero, "Environment", 2, 5000, [ref] $result);
}
```
