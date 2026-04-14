---
description: "PowerShell script to import Visual Studio command prompt environment variables (vcvarsall.bat) into a PowerShell session."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[build-tools](<../Tags/build-tools.md>)"
pubDatetime: 2012-09-14T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell and Visual Studio tools"
url:
  - https://mnaoumov.wordpress.com/2012/09/14/powershell-and-visual-studio-tools/
disabled rules:
  - yaml-title
---

# 2012-09-14 PowerShell and Visual Studio tools

When Visual Studio is installed it has special command prompts with tools in PATH variables such as **VS2012 x86 Native Tools Command Prompt**

I wrote similar scripts for PowerShell (inspired by [this](http://allen-mack.blogspot.com.au/2008/03/replace-visual-studio-command-prompt.html))

```powershell
#requires -version 2

param(
  [string] $version = "11.0"
)

$vsToolsPath = "${Env:ProgramFiles(x86)}\Microsoft Visual Studio $version\VC"
$setVariablesBatch = 'vcvarsall.bat'

if (!(Test-Path $vsToolsPath)) {
    throw "Visual Studio $version tools path $vsToolsPath not found."
}

Push-Location "$vsToolsPath"

if (!(Test-Path $setVariablesBatch)) {
    throw "$vsToolsPath\$setVariablesBatch batch not found."
}

cmd /c "$setVariablesBatch & set" | ForEach-Object {
  if ($_ -match "=") {
    $variablePair = $_ -split "="
    $name = $variablePair[0]
    $value = $variablePair[1]
    Set-Item -Force -Path "ENV:\$name" -Value "$value"
  }
}
Pop-Location
Write-Host "`nVisual Studio $version Command Prompt variables set." -ForegroundColor Yellow
```
