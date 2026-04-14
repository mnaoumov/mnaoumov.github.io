---
description: "Common patterns for referencing assemblies in T4 design-time templates using GAC paths, absolute paths, and MSBuild variables."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[t4](<../Tags/t4.md>)"
  - "[code-generation](<../Tags/code-generation.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "T4 Assembly references for Design-time templates"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/t4-assembly-references-for-design-time-templates/
disabled rules:
  - yaml-title
---

# 2012-09-27 T4 Assembly references for Design-time templates

Generally assemblies in T4 added via **Assembly** directive

[MSDN detailed description](http://msdn.microsoft.com/en-us/library/gg586946.aspx)

Common snippets:

```
<#@ Assembly Name="AssemblyFromGAC" \#>
<#@ Assembly Name="AssemblyFromGAC, Version=4.0.0.0, Culture=neutral, PublicKeyToken=abcd1234abcd1234" \#>
<#@ Assembly Name="c:\path\to\file.dll" \#>
<#@ Assembly Name="$(SolutionDir)\Project1\$(OutDir)\Project1.dll" \#>
<#@ Assembly Name="$(ProjectDir)\$(OutDir)\Project1.dll" \#>
<#@ Assembly Name="$(ProjectDir)\$(OutDir)\$(TargetFileName)" \#>
```
