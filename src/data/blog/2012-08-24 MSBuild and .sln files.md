---
description: "Explains how to make MSBuild emit the intermediate .metaproj file when building a .sln solution by setting msbuildemitsolution=1."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[msbuild](<../Tags/msbuild.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[build-tools](<../Tags/build-tools.md>)"
pubDatetime: 2012-08-24T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "MSBuild and .sln files"
url:
  - https://mnaoumov.wordpress.com/2012/08/24/msbuild-and-sln-files/
disabled rules:
  - yaml-title
---

# 2012-08-24 MSBuild and .sln files

When MSBuild builds solution file **MySolution.sln** it actually silently converts it to the well-known MSBuild **proj** file.

Sometime it is useful to see the converted version.

To do this you need to set environment variable

```bash
set msbuildemitsolution=1
```

then when you run```bash

MSBuild MySolution.sln

```

it will create corresponding **MySolution.sln.metaproj**
