---
description: Documents a known PowerShell bug where Start-Process -PassThru does not expose ExitCode, with a workaround using Process.Start.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[process](<../Tags/process.md>)"
pubDatetime: 2014-06-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell Start-Process WTF"
url:
  - https://mnaoumov.wordpress.com/2014/06/21/powershell-start-process-wtf/
disabled rules:
  - yaml-title
---

# 2014-06-20 PowerShell Start-Process WTF

Hi folks

Another WTF... Let's try

```powershell
$p = Start-Process -FilePath cmd -ArgumentList "/c exit 123" -PassThru
$p.ExitCode
```

And it returned nothing. As I described in the previous [blogpost](<./2014-06-19 PowerShell .NET property access swallows exceptions.md>), this means that some exception occurred

```powershell
$p.get_ExitCode()
```

returns

```
Exception calling "get_ExitCode" with "0" argument(s): "Process was not started by this object, so requested information cannot be dete rmined." At line:1 char:16 + $p.get_ExitCode <<<< () + CategoryInfo : NotSpecified: (:) [], MethodInvocationException + FullyQualifiedErrorId : DotNetMethodException
```

That is a known PowerShell bug: Start-Process: http://connect.microsoft.com/PowerShell/feedback/details/585549/start-process-passthru-return-value and http://connect.microsoft.com/PowerShell/feedback/details/520554/start-process-does-not-return-exitcode-property

And here is the workaround

```powershell
$p = [System.Diagnostics.Process]::Start("cmd", "/c exit 123")
$p.ExitCode
```

returns **123**
