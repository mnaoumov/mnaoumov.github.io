---
description: Accidentally opening a large file in Sublime Text via Total Commander's F4 key consumed all available RAM, causing VirtualBox to fail.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[virtualbox](<../Tags/virtualbox.md>)"
  - "[sublime-text](<../Tags/sublime-text.md>)"
  - "[total-commander](<../Tags/total-commander.md>)"
pubDatetime: 2015-12-07T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Funny Out-of-memory error"
url:
  - https://mnaoumov.wordpress.com/2015/12/07/funny-out-of-memory-error/
disabled rules:
  - yaml-title
---

# 2015-12-07 Funny Out-of-memory error

Hey folks

I've just encountered a funny error

I tried to run my virtual machine from VirtualBox and got

![virtualbox.png](<./!!files/2015-12-07 Funny Out-of-memory error/virtualbox.png>)

I tried to reopen VirtualBox a few times but issue persisted.

I didn't run anything memory intensive.

Then I open Task Manager and see

![taskmanager.png](<./!!files/2015-12-07 Funny Out-of-memory error/taskmanager.png>)

Oh wow. Looking into Sublime

![sublime.png](<./!!files/2015-12-07 Funny Out-of-memory error/sublime.png>)

Ah! That's it. I accidentally pressed F4 in Total Commander so the file was opening in editor and eating my memory.

A gotcha moment :)

Stay tuned
