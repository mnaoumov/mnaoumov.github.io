---
description: Documents undocumented Type parameter behavior in Set-ItemProperty and how to correctly read and write typed registry values.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[registry](<../Tags/registry.md>)"
  - "[windows](<../Tags/windows.md>)"
pubDatetime: 2014-06-09T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "PowerShell Registry Set-ItemProperty gotchas"
url:
  - https://mnaoumov.wordpress.com/2014/06/10/powershell-registry-set-itemproperty-gotchas/
disabled rules:
  - yaml-title
---

# 2014-06-09 PowerShell Registry Set-ItemProperty gotchas

Hi folks

Recently I wanted to set a registry value via PowerShell using

```powershell
Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\Software\MyApp -Name MyKey -Value 1
```

If we take a look on his value regedit its type is **REG_SZ**

If the command above fails because it the node is not exist, let's create it first

```powershell
New-Item -Path Registry::HKEY_LOCAL_MACHINE\Software\MyApp
```

Let's consider some questions:

# How Can I Get Registry Value Type Using PowerShell?

Surprisingly **Get-ItemProperty** doesn't contain any information for the value type

But this snippet works

```powershell
(Get-Item -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\MyApp).GetValueKind("MyKey")
```

and returns **String**

Obviously **REG_SZ** corresponds to **String**

# How Can We Set Registry Value Type Other From REG_SZ?

**Set-ItemProperty** has one undocumented dynamic parameter **Type**

```powershell
Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\Software\MyApp -Name MyKey -Value 1 -Type DWord
```

Interestingly, **Type** parameter appears in auto-complete only if current drive provider is Registry.

```powershell
PS C:\> Set-ItemProperty -T<tab>
```

nothing happens

```powershell
PS HKLM:\> Set-ItemProperty -T<tab>
```

expands to **\-Type**

Alternatively we can use **New-ItemProperty** with documented **PropertyType** parameter

```powershell
New-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\MyApp -Name MyKey -Value 1 -PropertyType DWord -Force
```

**\-Force** parameter is required to override value if it already exists.

# What is the List Possible Types

To discover those types I tried

```powershell
Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\Software\MyApp -Name MyKey -Value 1 -Type BlahBlah
```

returns

```
Set-ItemProperty : Cannot bind parameter 'Type'. Cannot convert value "BlahBlah" to type "Microsoft.Win32.RegistryValueKind" due to invalid enumeration values. Specify one of the following enumeration values and try again. The possible enumeration values are "Unknown, String, ExpandString, Binary, DWord, MultiString, QWord".
At line:1 char:94
+ Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\Software\MyApp -Name MyKey -Value 1 -Type <<<<  BlahBlah
    + CategoryInfo          : InvalidArgument: (:) [Set-ItemProperty], ParameterBindingException
    + FullyQualifiedErrorId : CannotConvertArgumentNoMessage,Microsoft.PowerShell.Commands.SetItemPropertyCommand
```

This gives us a full list of possible values.

If we look at MSDN article for [Microsoft.Win32.RegistryValueKind](http://msdn.microsoft.com/en-us/library/microsoft.win32.registryvaluekind.aspx) we find a full map

| PowerShell type | Registry type |
| --- | --- |
| Binary | REG_BINARY |
| DWord | REG_DWORD |
| ExpandString | REG_EXPAND_SZ |
| MultiString | REG_MULTI_SZ |
| None | \- |
| QWord | REG_QWORD |
| String | REG_SZ |
| Unknown | \- |
