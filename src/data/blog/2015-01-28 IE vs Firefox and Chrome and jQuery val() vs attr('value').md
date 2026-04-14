---
description: Cross-browser bug where jQuery .val() returns null on non-form elements in Firefox and Chrome but works in IE.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[jquery](<../Tags/jquery.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[cross-browser](<../Tags/cross-browser.md>)"
pubDatetime: 2015-01-28T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "IE vs Firefox and Chrome and jQuery val() vs attr('value')"
url:
  - https://mnaoumov.wordpress.com/2015/01/29/ie-vs-firefox-and-chrome-and-jquery-val-vs-attrvalue/
disabled rules:
  - yaml-title
---

# 2015-01-28 IE vs Firefox and Chrome and jQuery val() vs attr('value')

Hi folks

I am currently fixing one bug at work and found an interesting problem.

Something works in IE but doesn't work on Firefox and Chrome.

After some debugging I found the problem

```html
<span id="someSpan" value="some value">some caption</span>
```

And it is used in JavaScript

```js
var value = $('#someSpan').val();
```

This works only in IE. In Firefox and Chrome it returns null.

According to documentation jQuery .val() function makes sense mostly for form elements and it just checks elem.value property, but this property is set only in IE.

So the fix is

```js
var value = $('#someSpan').attr('value');
```

Gotcha!

Stay tuned!
