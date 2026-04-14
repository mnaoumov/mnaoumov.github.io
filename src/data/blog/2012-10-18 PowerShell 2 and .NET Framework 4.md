---
description: How to configure PowerShell 2 to use .NET Framework 4 CLR via registry or config files.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[configuration](<../Tags/configuration.md>)"
pubDatetime: 2012-10-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "PowerShell 2 and .NET Framework 4"
url:
  - https://mnaoumov.wordpress.com/2012/10/18/powershell-2-and-net-framework-4/
disabled rules:
  - yaml-title
---

# 2012-10-18 PowerShell 2 and .NET Framework 4

By default PowerShell 2 is using .NET CLR 2.0.

It is quite annoying. I would like to be able to use something like **[string]::IsNullOrWhitespace** from .NET Framework 4

There are several [approaches](http://stackoverflow.com/questions/2094694/how-can-i-run-powershell-with-the-net-4-runtime)

1\. Modify .NET settings globally saying to use only latest .NET CLR version

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework]
"OnlyUseLatestCLR"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\.NETFramework]
"OnlyUseLatestCLR"=dword:00000001
```

2\. Modify or create the files **powershell.exe.config** and **powershell_ise.exe.config** in **$PSHOME** folder

```xml
<?xml version="1.0"?> 
<configuration> 
    <startup useLegacyV2RuntimeActivationPolicy="true"> 
        <supportedRuntime version="v4.0.30319"/> 
        <supportedRuntime version="v2.0.50727"/> 
    </startup> 
</configuration>
```

To check what you have use

```powershell
# Current PowerShell version

$host.Version

# Current .NET Framework version

[Environment]::Version
```

Unfortunately both of these approaches did not work well if you have PowerShell 3 installed.

If you run **PowerShell.exe -Version 2** it will run PowerShell version 2 with .NET version 2 If you use one of the approached shown above

**$host.Version** is always 3 even if you ran **PowerShell.exe -Version 2**.

**EDIT**: Raised a bug [https://connect.microsoft.com/PowerShell/feedback/details/767907/powershell-2-0-with-net-4-0-on-windows-8](https://connect.microsoft.com/PowerShell/feedback/details/767907/powershell-2-0-with-net-4-0-on-windows-8)
