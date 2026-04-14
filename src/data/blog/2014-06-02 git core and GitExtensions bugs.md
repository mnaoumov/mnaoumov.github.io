---
description: Summary of bug fixes and pull requests contributed to git core and GitExtensions for ANSI sequences and file history issues.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-extensions](<../Tags/git-extensions.md>)"
  - "[open-source](<../Tags/open-source.md>)"
pubDatetime: 2014-06-02T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "git core and GitExtensions bugs"
url:
  - https://mnaoumov.wordpress.com/2014/06/03/git-core-and-gitextensions-bugs/
disabled rules:
  - yaml-title
---

# 2014-06-02 git core and GitExtensions bugs

Hi my dear readers.

I've discovered and fixed a few git core and GitExtensions defects

**git core: sideband.c: Get rid of ANSI sequences for non-terminal shell**

Patch sent to git mail group: http://marc.info/?l=git&m=140149202319544&w=2

**GitExtensions: pre-receive hook output invalid characters**

Issue: https://github.com/gitextensions/gitextensions/issues/1313

Pull request: https://github.com/gitextensions/gitextensions/pull/2345

**GitExtensions: Visual Studio plugin - file history for files outside of solution**

Issue: https://github.com/gitextensions/gitextensions/issues/2349

Pull request: https://github.com/gitextensions/gitextensions/pull/2353

**Unofficial patch release 2.47.3.1000**

https://github.com/mnaoumov/gitextensions/releases/tag/2.47.3.1000
