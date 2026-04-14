---
description: Bug report for NUnit console failing when error messages contain invalid XML characters such as null bytes.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[nunit](<../Tags/nunit.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[testing](<../Tags/testing.md>)"
  - "[xml](<../Tags/xml.md>)"
pubDatetime: 2014-06-04T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "NUnit issue"
url:
  - https://mnaoumov.wordpress.com/2014/06/04/nunit-issue/
disabled rules:
  - yaml-title
---

# 2014-06-04 NUnit issue

Raised the defect for NUnit https://github.com/nunit/nunit-console/issues/31 which fails if error message contains invalid xml characters such as **\u0000**

Going to fix but not sure what should we do: simply strip invalid characters or try to escape them somehow
