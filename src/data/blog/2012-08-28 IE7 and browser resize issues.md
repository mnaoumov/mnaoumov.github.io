---
description: "Documents IE7 positioning bugs triggered by browser resize and provides a CSS fix using position: relative on body."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[internet-explorer](<../Tags/internet-explorer.md>)"
  - "[css](<../Tags/css.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2012-08-28T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "IE7 and browser resize issues"
url:
  - https://mnaoumov.wordpress.com/2012/08/28/ie7-and-browser-resize-issues/
disabled rules:
  - yaml-title
---

# 2012-08-28 IE7 and browser resize issues

IE7 have bunch of positioning bugs when browser resized.

[See for more details](http://www.communitymx.com/content/article.cfm?cid=C37E0)

There is a nice css fix for some of them

```css
body
{
    position: relative;
}
```
