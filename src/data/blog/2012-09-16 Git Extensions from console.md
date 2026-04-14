---
description: "How to launch Git Extensions GUI from the command line on Windows by creating a custom git alias script."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-extensions](<../Tags/git-extensions.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[command-line](<../Tags/command-line.md>)"
pubDatetime: 2012-09-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Git Extensions from console"
url:
  - https://mnaoumov.wordpress.com/2012/09/16/git-extensions-from-console/
disabled rules:
  - yaml-title
---

# 2012-09-16 Git Extensions from console

I found a [way](http://danrigby.com/2012/03/22/how-to-launch-git-extensions-from-git-bash-on-windows/) to run Git Extensions from console. This is especially useful to do commits. You can review changes, stage or unstage them, more and more…

Installation is extremely simple

Create **C:\Program Files (x86)\Git\bin\git-ex** file with the following content

```bash
#!/bin/sh

"$PROGRAMFILES\GitExtensions\GitExtensions.exe" "$@" &
```

That's it!

Now you can go to console and type

```bash
git ex
```

or

```bash
git ex commit
```

For more commands see link above
