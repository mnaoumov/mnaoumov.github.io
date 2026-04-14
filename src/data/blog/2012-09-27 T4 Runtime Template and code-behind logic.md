---
description: "How to add a code-behind partial class to a T4 runtime template by manually editing the csproj file, with a Visual Studio add-in."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[t4](<../Tags/t4.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[code-generation](<../Tags/code-generation.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "T4 Runtime Template and code-behind logic"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/t4-runtime-template-and-code-behind-logic/
disabled rules:
  - yaml-title
---

# 2012-09-27 T4 Runtime Template and code-behind logic

By default T4 runtime template adds to the project corresponding generated cs file ![default-t4-structure.png](<./!!files/2012-09-27 T4 Runtime Template and code-behind logic/default-t4-structure.png>)

But what if we want to have some custom logic in separate C# file? We create a partial class and put that logic there. But default project structure is not very friendly with that. How would we name this file? Where would we put it?

I think the best approach to handle such case was shown us by ASP.NET WebForms ![aspx-structure.png](<./!!files/2012-09-27 T4 Runtime Template and code-behind logic/aspx-structure.png>)

I want to have something similar to that ![desired-t4-structure.png](<./!!files/2012-09-27 T4 Runtime Template and code-behind logic/desired-t4-structure.png>)

Unfortunately we cannot do it from Visual Studio and we have to edit our csproj file manually and add the following snippet there

```xml
<ItemGroup>
  <None Include="[PATH]\[TemplateName].tt">
    <Generator>TextTemplatingFilePreprocessor</Generator>
    <LastGenOutput>[TemplateName].tt.designer.cs</LastGenOutput>
  </None>
  <Compile Include="[PATH]\[TemplateName].tt.designer.cs">
    <AutoGen>True</AutoGen>
    <DesignTime>True</DesignTime>
    <DependentUpon>[TemplateName].tt</DependentUpon>
  </Compile>
  <Compile Include="[PATH]\[TemplateName].tt.cs">
    <SubType>Code</SubType>
    <DependentUpon>[TemplateName].tt</DependentUpon>
  </Compile>
</ItemGroup>
```

I used this approach a lot and eventually I ended up creating an add-in for VisualStudio which creates such project structure

[T4 Runtime Template with code-behind plugin](https://bitbucket.org/mnaoumov/t4/src/2cfd406c6a16/T4RuntimeTemplateWithCodeBehindPlugin-VS2012/Installer)
