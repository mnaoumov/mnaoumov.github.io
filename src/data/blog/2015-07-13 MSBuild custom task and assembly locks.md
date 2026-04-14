---
description: Copying a custom MSBuild task assembly to a temp folder before loading it to prevent file locking after build.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[msbuild](<../Tags/msbuild.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[build](<../Tags/build.md>)"
pubDatetime: 2015-07-13T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "MSBuild custom task and assembly locks"
url:
  - https://mnaoumov.wordpress.com/2015/07/13/msbuild-custom-task-and-assembly-locks/
disabled rules:
  - yaml-title
---

# 2015-07-13 MSBuild custom task and assembly locks

Hi folks

Sometimes you may want to perform some operations during build which are impossible or at least too difficult to perform using vanilla MSBuild.

For that purpose you may want to use custom task.

The simplest usage would look like

```xml
<UsingTask
  TaskName="MyCoolAssembly.MyCoolTask"
  AssemblyFile="MyCoolAssembly.dll"
/>
<Target
  Name="MyCoolTarget">
  <MyCoolTask />
</Target>
```

It can be made more complex and pass addition parameters and even define output parameters. But that is not the topic of this blogpost. Read [MSBuild documentation](https://msdn.microsoft.com/en-us/library/t9883dzc.aspx) if you want to know more.

I would like to discuss one thing that annoys me.

MSBuild loads custom assembly dll into its main AppDomain and therefore this assembly becomes locked until MSBuild exited. So by default after compilation completed MyCoolAssembly.dll couldn't be removed until Visual Studio (or command prompt) reopened.

There are some workarounds you may find in questions like this http://stackoverflow.com/questions/13510465/the-mystery-of-stuck-inactive-msbuild-exe-processes-locked-stylecop-dll-nuget

But I'd prefer a solution which would work regardless of the way MSBuild called.

And recently I invented a way to solve this problem

```xml
<PropertyGroup>
  <TempFolder>$([System.IO.Path]::GetTempPath())$([System.Guid]::NewGuid())</TempFolder>
</PropertyGroup>
<Target
  Name="CopyTaskAssemblyToTempFolder"
  BeforeTargets="BeforeBuild">
  <Copy
    SourceFiles="$(MSBuildThisFileDirectory)MyCoolAssembly.dll"
    DestinationFolder="$(TempFolder)"
  />
</Target>
<UsingTask
  TaskName="MyCoolAssembly.MyCoolTask"
  AssemblyFile="$(TempFolder)\MyCoolAssembly.dll"
/>
<Target
  Name="MyCoolTarget">
  <MyCoolTask />
</Target>
```

Here my dll is being copied to the unique temp folder and then loaded and executed from there.

Well, ideally the dll should be removed after execution but to mark dll for deletion we'll need to P/Invoke [MoveFileEx](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365240(v=vs.85).aspx) which is too complicated to put into MSBuild script. So my solution will litter into the temp folder a bit but I think it is not that big deal.

Stay tuned
