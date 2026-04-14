---
description: Use the Sysinternals regjump tool installed via Chocolatey to open Registry Editor directly at any specified key path.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[registry](<../Tags/registry.md>)"
  - "[chocolatey](<../Tags/chocolatey.md>)"
  - "[tools](<../Tags/tools.md>)"
pubDatetime: 2019-07-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:33:59-06:00
title: "Open Regedit on a specific key"
url:
  - https://mnaoumov.wordpress.com/2019/07/18/open-regedit-on-a-specific-key/
disabled rules:
  - yaml-title
---

# 2019-07-18 Open Regedit on a specific key

Hi folks.

Sometimes you need to jump to a specific key and it is pretty annoying to navigate to it manually.

Related question [https://superuser.com/questions/115854/open-registry-directly-to-a-given-key](https://superuser.com/questions/115854/open-registry-directly-to-a-given-key)

They added an address bar to Windows 10 but for previous versions we need to use a [regjump](http://technet.microsoft.com/en-us/sysinternals/bb963880.aspx) tool

I've installed it via [Chocolatey](http://chocolatey.org)

```shell
choco install regjump -y
```

And now I just happily type

```shell
regjump my-super-long-registry-path
```

Stay tuned
