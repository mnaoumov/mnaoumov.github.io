---
description: "Script to open any PowerShell cmdlet's source code directly in .NET Reflector for inspection."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[reflector](<../Tags/reflector.md>)"
  - "[reverse-engineering](<../Tags/reverse-engineering.md>)"
pubDatetime: 2012-10-09T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell Cmdlets sources"
url:
  - https://mnaoumov.wordpress.com/2012/10/09/powershell-cmdlets-sources/
disabled rules:
  - yaml-title
---

# 2012-10-09 PowerShell Cmdlets sources

Sometime you want to understand how exactly PowerShell cmdlets work.

And fortunately we can see exact source code for them in a Reflector

Inspired by the [this](http://www.nivot.org/post/2008/10/30/ATrickToJumpDirectlyToACmdletsImplementationInReflector.aspx), I wrote the following script **Reflect-Cmdlet.ps1**

```powershell
#requires -version 2

param(
    [Parameter(Mandatory = $true, Position = 0, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true, ParameterSetName="Command")]
    [Management.Automation.CommandInfo] $Command,

    [Parameter(Mandatory = $true, Position = 0, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true, ParameterSetName="CommandName")]
    [string] $CommandName
)

# TODO: use path to your Reflector instead

$reflectorPath = "c:\Work\Tools\Reflector\Reflector.exe"

if ($CommandName) {
    $Command = Get-Command $CommandName
}

while ($Command.CommandType -eq "Alias") {
    "Command '$($Command.Name)' is an alias for command '$($Command.Definition)'"
    $Command = Get-Command $Command.Definition
}

switch ($Command.CommandType) {
    "Cmdlet" {
        $type = $Command.ImplementingType
        $dll = $Command.DLL
        if (-not (Test-Path $reflectorPath)) {
            throw "Reflector is not found in '$reflectorPath'"
        }

        & $reflectorPath /select:$type $dll
    }
    "Function" {
        "Command '$($Command.Name)' is a function with the following definition:`n`n$($Command.Definition)"
    }
    default {
        "Command '$($Command.Name)' has an unsupported type $($Command.CommandType)"
    }
}
```

Now it can be used in a lot of ways

```powershell
Reflect-Cmdlet "Write-Host"

"Write-Debug" | Reflect-Cmdlet

Get-Command cls | Reflect-Cmdlet
```
