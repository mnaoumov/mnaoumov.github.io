---
description: Follow-up on clipboard-based RDP file transfer, describing clipboard hang issues and a planned chunked clipboard watcher solution.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[rdp](<../Tags/rdp.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[clipboard](<../Tags/clipboard.md>)"
pubDatetime: 2013-08-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "How to reach unreachable or copy files to RDP - Part 2"
url:
  - https://mnaoumov.wordpress.com/2013/08/21/how-to-reach-unreachable-or-copy-files-to-rdp-part-2/
disabled rules:
  - yaml-title
---

# 2013-08-20 How to reach unreachable or copy files to RDP - Part 2

[Part 1](<./2013-06-19 How to reach unreachable or copy files to RDP.md>)

When I tried to transfer 7mb of binary file using the approach from the part 1, it took so long, so I could not complete it.

Then I had to switch to [more efficient base64 conversion](<./2013-08-20 Efficient Base64 conversion in PowerShell.md>)

With that approach I immediately converted my 7mb binary to 10mb of base64 text file.

But when I tried to copy-paste it via clipboard over RDP, it hanged. I tried notepad and wordpad.

Then when I tried to split 10mb into 1mb chunks and copy-paste them, I could do that with wordpad. After paste it hanged 15-20 seconds. Then I could copy-paste next chunk. Needless to say, that was very annoying to jump back and forward to copy the whole file.

So I came up with an idea which I am going to implement and write in the next blogpost.

The idea was to run two PowerShell scripts: one on the host machine, second - on the RDP machine. Then copy-paste file by chunks and detect clipboard changes. Having this approach we can choose chunk size small enough to have RDP paste without hangs. Then by changing clipboard we notify host machine that RDP machine is ready for the next chunk.

So I see it as a client-server application driven by clipboard :)

Please stay tuned to see how I'm going to implement that…
