---
description: "Describes a critical bug in Firebug Lite 1.4 on IE7 and provides a bookmarklet to use the stable 1.3 version instead."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[firebug](<../Tags/firebug.md>)"
  - "[internet-explorer](<../Tags/internet-explorer.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2012-09-05T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Firebug Lite 1.4 fails in IE7"
url:
  - https://mnaoumov.wordpress.com/2012/09/05/firebug-lite-1-4-fails-in-ie7/
disabled rules:
  - yaml-title
---

# 2012-09-05 Firebug Lite 1.4 fails in IE7

Sometime I need to debug something on IE7 and I don't have rights to install something better.

[Firebug Lite](https://getfirebug.com/firebuglite) is the rescue. But 1.4 version has critical [bug](http://code.google.com/p/fbug/issues/detail?id=4918) because of which I had to rollback to the previous version. I prefer to use bookmarklets to enable Firebug Lite without changing sources but it is not that easy to find bookmarklet for version 1.3.

So here it is:

Add bookmark with the following url

```
javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I%20g%20T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I%20L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','3','releases/lite/1.3/firebug-lite.js','releases/lite/latest/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');
```
