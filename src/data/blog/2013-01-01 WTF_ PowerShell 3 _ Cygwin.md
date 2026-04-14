---
description: PowerShell -Version 2 flag is ignored when launched from Cygwin, always running PowerShell 3 instead.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[cygwin](<../Tags/cygwin.md>)"
  - "[bug](<../Tags/bug.md>)"
  - "[windows](<../Tags/windows.md>)"
pubDatetime: 2013-01-01T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "WTF_ PowerShell 3 _ Cygwin"
url:
  - https://mnaoumov.wordpress.com/2013/01/01/wtf-powershell-3-cygwin/
disabled rules:
  - yaml-title
---

# 2013-01-01 WTF_ PowerShell 3 _ Cygwin

I found some WTF I cannot explain.

I have PowerShell 3 installed. But I have ability to run PowerShell 2 host

```bash
C:\Users\Michael>PowerShell -Version 2
Windows PowerShell
Copyright (C) 2009 Microsoft Corporation. All rights reserved.

C:\Users\Michael> $host.Version

Major  Minor  Build  Revision
-----  -----  -----  --------
2      0      -1     -1
```

But if I do the same from Cygwin it does not work properly

```bash
$ PowerShell -Version 2
Windows PowerShell
Copyright (C) 2012 Microsoft Corporation. All rights reserved.

C:\Users\Michael> $host.Version

Major  Minor  Build  Revision
-----  -----  -----  --------
3      0      -1     -1
```

WTF? Why it is still running PowerShell 3 ?!!

Moreover, I even tried to call cmd in between

```bash
$ cmd
Microsoft Windows [Version 6.2.9200]
(c) 2012 Microsoft Corporation. All rights reserved.

C:\Users\Michael>PowerShell -Version 2
Windows PowerShell
Copyright (C) 2012 Microsoft Corporation. All rights reserved.

C:\Users\Michael> $host.Version

Major  Minor  Build  Revision
-----  -----  -----  --------
3      0      -1     -1
```

The same effect..

Does anyone know why that happens?!

It very annoying, especially because of the [bug with breakpoints](<./2012-10-10 PowerShell Set-PSBreakpoint bug in PowerShell 3_.md>).

So far I could not find a way how to run PowerShell 2 from my machine, and I have to use VM for that… Very annoying!

If you curious why I need to run PowerShell from Cygwin, it is because of the [git hooks](<./2012-10-10 Useful git hooks.md>) I am writing. To develop server-side hooks I write PowerShell script, and because of the problem described above, I cannot use my nice trick with [breakpoints](<./2012-09-11 Repeat Debugger.Launch() in PowerShell.md>)

UPD: [Raised question on stackoverflow](http://stackoverflow.com/questions/14107544/why-i-cannot-run-powershell-2-from-cygwin)
