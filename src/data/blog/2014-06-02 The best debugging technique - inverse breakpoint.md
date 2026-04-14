---
description: Using Debugger.Launch and Debugger.Break in C# code to attach a debugger to hard-to-reach processes like Visual Studio plugins.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2014-06-02T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "The best debugging technique - inverse breakpoint"
url:
  - https://mnaoumov.wordpress.com/2014/06/03/the-best-debugging-technique-inverse-breakpoint/
disabled rules:
  - yaml-title
---

# 2014-06-02 The best debugging technique - inverse breakpoint

Hi folks

I found that someone still does not know the technique I've been using for ages.

The technique is used when I want to set a breakpoint to debug some problematic code and find it too difficult to start debugging or attach it to the appropriate process

Just put the following snippet into a problematic code. Then recompile and copy resultant exe/dll to the proper location.

```csharp
System.Diagnostics.Debugger.Launch();
System.Diagnostics.Debugger.Break();
```

First line triggers the UI dialog to attach debugger. Second line stops as on a breakpoint.

Some authors suggest to use only one of these lines but the behavior is not very reliable. That's why I use both of them at the time.

This technique is brilliant for debugging things like Visual Studio plugins or custom MSBuild tasks
