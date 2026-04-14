---
description: Using the cors-anywhere proxy to fetch a Google Drive download link via AJAX, bypassing the CORS restriction on the redirect.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[cors](<../Tags/cors.md>)"
  - "[google-drive](<../Tags/google-drive.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2018-02-05T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "Download Google Drive file via AJAX ignoring CORS"
url:
  - https://mnaoumov.wordpress.com/2018/02/05/download-google-drive-file-via-ajax-ignoring-cors/
disabled rules:
  - yaml-title
---

# 2018-02-05 Download Google Drive file via AJAX ignoring CORS

Hi folks

I have a csv file in Google Drive which I wanted to use from my JavaScript site.

If you copy share link from Google Drive you'll get something like https://drive.google.com/file/d/1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah/view

Which is interactive url. So we need to get a download link

It can be done via https://sites.google.com/site/gdocs2direct/

And then we get a link

https://drive.google.com/uc?export=download&id=1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah

But when you try to get it via AJAX

```js
var xhr = new XMLHttpRequest(); xhr.open('GET', 'https://drive.google.com/uc?export=download&id=1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah'); xhr.send()
```

```
Failed to load https://drive.google.com/uc?export=download&id=1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah: Redirect from 'https://drive.google.com/uc?export=download&id=1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah' to 'https://doc-04-8s-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/mf62896bdal2t1qphepajrlrkcs7i6jp/1517788800000/04678722407924784084/\*/1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah?e=download' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://my-server-url' is therefore not allowed access.
```

Not good. I spent a lot of time and finally found https://cors-anywhere.herokuapp.com/

Prepend this magic url with my url and the problem solved

```js
... xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=download&id=1_cG2NrtGfuHv_aQGOHWOAZx7wapBlEah');
...
```

Sweet!

Stay tuned
