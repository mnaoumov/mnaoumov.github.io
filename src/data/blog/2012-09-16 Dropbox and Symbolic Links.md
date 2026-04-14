---
description: "Explains how to sync arbitrary folders with Dropbox by creating symbolic links using Link Shell Extension."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[dropbox](<../Tags/dropbox.md>)"
  - "[symbolic-links](<../Tags/symbolic-links.md>)"
  - "[windows](<../Tags/windows.md>)"
pubDatetime: 2012-09-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Dropbox and Symbolic Links"
url:
  - https://mnaoumov.wordpress.com/2012/09/16/dropbox-and-symbolic-links/
disabled rules:
  - yaml-title
---

# 2012-09-16 Dropbox and Symbolic Links

Sometime I want to synchronize my folder with Dropbox but I don't want to put my files into **C:\Users\[UserName]\Dropbox** Of course I can change Dropbox location to my folder but for me it is not enough.

So I ended up with idea to create **symbolic link** from my real folder and Dropbox folder.

It works as expected.

I did not like to create links manually so I found nice and simple drag-and-drop explorer extension [Link Shell Extensions](http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html) to perform the operation.
