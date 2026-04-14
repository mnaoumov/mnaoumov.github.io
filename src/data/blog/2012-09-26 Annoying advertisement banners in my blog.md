---
description: "A JavaScript one-liner to hide WordPress advertisement banners in the browser, alongside recommending Adblock."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[css](<../Tags/css.md>)"
pubDatetime: 2012-09-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Annoying advertisement banners in my blog"
url:
  - https://mnaoumov.wordpress.com/2012/09/26/annoying-advertisement-banners-in-my-blog/
disabled rules:
  - yaml-title
---

# 2012-09-26 Annoying advertisement banners in my blog

I was told that advertisement banners in my blog are very annoying.

I have never seen any of that banners because I have [Adblock](https://chrome.google.com/webstore/detail/gighmmpiobklfepjocnamgkkbiglidom) extension for Chrome installed.

Or you can use the following JavaScript if you want :)

```js
document.getElementsByClassName('wpadvert')[0].style.display = 'none'
```
