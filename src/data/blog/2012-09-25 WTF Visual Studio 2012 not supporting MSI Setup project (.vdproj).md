---
description: "Visual Studio 2012 dropped .vdproj MSI setup project support; workaround options include WiX and InstallShield Limited Edition."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[msi](<../Tags/msi.md>)"
  - "[installer](<../Tags/installer.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-25T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "[WTF] Visual Studio 2012 not supporting MSI Setup project (.vdproj)"
url:
  - https://mnaoumov.wordpress.com/2012/09/26/wtf-visual-studio-2012-not-supporting-msi-setup-project-vdproj/
aliases:
  - "[WTF] Visual Studio 2012 not supporting MSI Setup project (.vdproj)"
disabled rules:
  - yaml-title
---

# 2012-09-25 WTF Visual Studio 2012 not supporting MSI Setup project (.vdproj)

Another WTF. Visual Studio 2012 is no longer supporting MSI Setup project (.vdproj) So when I tried to open a setup solution which worked fine in VS2010 it blew up.

Moreover VS2012 is not shipped with any other setup projects. For whatever reason Microsoft even doesn't advertise their [WiX](http://wix.codeplex.com/). Instead of that they recommend to install [InstallShield Limited Edition](http://learn.flexerasoftware.com/content/IS-EVAL-InstallShield-Limited-Edition-Visual-Studio).

WTF: You have to register there and within an hour you will get your own personal key. WTF: Visual Studio does not have any migration tool so you should reimplement your setup project from scratch.

Fortunately my project was extremely simple and I successfully migrated it.
