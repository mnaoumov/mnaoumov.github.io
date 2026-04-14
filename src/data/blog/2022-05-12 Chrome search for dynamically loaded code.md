---
description: "Enabling the Chrome DevTools setting 'Search in anonymous and content scripts' allows searching inside dynamically eval-loaded JavaScript."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[chrome](<../Tags/chrome.md>)"
pubDatetime: 2022-05-12T10:12:26-06:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:04-06:00
title: "Chrome search for dynamically loaded code"
disabled rules:
  - yaml-title
url:
  - https://mnaoumov.wordpress.com/2022/05/12/chrome-search-for-dynamically-loaded-code/
---

# 2022-05-12 Chrome search for dynamically loaded code

Hi folks.

For years I thought that working with dynamically loaded JavaScript is difficult because it is not possible to search for it.

I had to insert `debugger` statements in my dynamic code in order to find it in the Chrome `Developer Tools` Source pane.

But then I suddenly found the setting in the `Developer Tools > Settings > Preferences > Search in anonymous and content scripts`

![image-2022-05-12-10-16-09.png](<./!!files/2022-05-12 Chrome search for dynamically loaded code/image-2022-05-12-10-16-09.png>)

This setting is something I needed for years!

Hope it helps.
