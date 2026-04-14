---
description: Step-by-step guide to setting up Visual Studio remote debugging over a TeamViewer VPN connection.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[teamviewer](<../Tags/teamviewer.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[powershell](<../Tags/powershell.md>)"
pubDatetime: 2012-10-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "Remote debugging over TeamViewer"
url:
  - https://mnaoumov.wordpress.com/2012/10/10/remote-debugging-over-teamviewer/
disabled rules:
  - yaml-title
---

# 2012-10-10 Remote debugging over TeamViewer

TeamViewer has ability to create VPN. And we spent some time investigating how to make remote debugging working through it.

1. Create administrator RemoteDbg on remote machine (Password1)
2. Create user RemoteDbg on dev machine (Password1)
3. Start TeamViewer with VPN on both machines
4. Run PowerShell script to change TeamViewer VPN to work [http://blogs.msdn.com/b/dimeby8/archive/2009/06/10/change-unidentified-network-from-public-to-work-in-windows-7.aspx](http://blogs.msdn.com/b/dimeby8/archive/2009/06/10/change-unidentified-network-from-public-to-work-in-windows-7.aspx)

```powershell
# 
# Name: ChangeCategory.ps1 

# Copyright: Microsoft 2009 
# Revision: 1.0 

# 
# This script can be used to change the network category of 

# an 'Unidentified' network to Private to allow common network 
# activity. This script should only be run when connected to 

# a network that is trusted since it will also affect the 
# firewall profile used. 

# This script is provided as-is and Microsoft does not assume any 
# liability. This script may be redistributed as long as the file 

# contains these terms of use unmodified. 
# 
# Usage: 

# Start an elevated Powershell command window and execute 
# ChangeCategory.ps1 

#  
$NLMType = [Type]::GetTypeFromCLSID('DCB00C01-570F-4A9B-8D69-199FDBA5723B')
$INetworkListManager = [Activator]::CreateInstance($NLMType)

$NLM_ENUM_NETWORK_CONNECTED  = 1
$NLM_NETWORK_CATEGORY_PUBLIC = 0x00
$NLM_NETWORK_CATEGORY_PRIVATE = 0x01
$UNIDENTIFIED = "Unidentified network"

$INetworks = $INetworkListManager.GetNetworks($NLM_ENUM_NETWORK_CONNECTED)

foreach ($INetwork in $INetworks)
{
    $Name = $INetwork.GetName()
    $Category = $INetwork.GetCategory()

    if ($INetwork.IsConnected -and ($Category -eq $NLM_NETWORK_CATEGORY_PUBLIC) -and ($Name -eq $UNIDENTIFIED))
    {
        $INetwork.SetCategory($NLM_NETWORK_CATEGORY_PRIVATE)
    }
}
```

1. Run TaskMgr.exe using Shift + Right mouse click as RemoteDbg on remote machine
2. Click "Show all processes" in task manager
3. Run msvsmon from task manager as admin
4. Create workspace on dev machine with source code
5. Add entry to hosts file with remote machine IP address and computer name
6. Add stored windows credential: machine: remote machine user: RemoteDbg password: Password1
7. Optionally enable local accounts to open admin shares:

```
Hive: HKEY_LOCAL_MACHINE Key: Software\Microsoft\Windows\CurrentVersion\Policies\System Name: LocalAccountTokenFilterPolicy Data Type: REG_DWORD Value: 1
```
