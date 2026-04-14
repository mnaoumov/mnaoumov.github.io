---
description: HFS (HTTP File Server) is a reliable free tool for peer-to-peer large file transfers, after uTorrent Remote and JustBeamIt both failed.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[file-sharing](<../Tags/file-sharing.md>)"
  - "[networking](<../Tags/networking.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[tools](<../Tags/tools.md>)"
pubDatetime: 2017-01-05T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "HFS - Send large file P2P"
url:
  - https://mnaoumov.wordpress.com/2017/01/05/hfs-send-large-file-p2p/
disabled rules:
  - yaml-title
---

# 2017-01-05 HFS - Send large file P2P

Hi folks

Sometimes I need to send a large file to someone. There are many services but all of them have some limitations such as file limit Normally you just want to send your stuff to one person, so using any cloud-based services would be an unnecessary overkill.

So we are looking for a free P2P service supporting files of any size.

1\. uTorrent Remote - FAIL!

In the past that was the easiest solution. Just drag&drop your file into uTorrent. It will create a private tracker and gives you an url you can share with your coworker and he downloads your stuff via torrents.

This stuff seems to be broken now. It keeps saying that your computer is turned off, which is not true. The shared link leads you to https://remote.utorrent.com/send?... but most of the links on that page are broken. Magnet link is working but still the download is not starting. I tried advanced settings such as **bt.enable_tracker** but it made no difference.

Result - FAIL!

2\. JustBeamIt - FAIL!

http://www.justbeamit.com/

This is the only free P2P service with unlimited file size support I could find. I used it in the past and it used to be very helpful. But now I tried to send my 14Gb file and it broke two times.

Result - FAIL!

3\. HFS - SUCCESS! http://www.rejetto.com/hfs/

I installed the tool, showed which file I would like it to share for me.

Then I found an open port checking with http://www.canyouseeme.org/

Then I gave a direct link and my coworker could download my big file!

HFS supports download resumes in case of failures. So I think this approach is the way to go!

Result - SUCCESS!

Regards, Michael
