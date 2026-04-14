---
description: Fixing a Firefox-only strict mode error in MicrosoftAjaxWebForms.js caused by window.event being undefined, requiring a cross-browser property descriptor hack.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[asp-net](<../Tags/asp-net.md>)"
  - "[firefox](<../Tags/firefox.md>)"
pubDatetime: 2016-02-12T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "WTF! MicrosoftAjax.js vs 'use strict' vs Firefox vs IE"
url:
  - https://mnaoumov.wordpress.com/2016/02/12/wtf-microsoftajax-js-vs-use-strict-vs-firefox-vs-ie/
disabled rules:
  - yaml-title
---

# 2016-02-12 WTF! MicrosoftAjax.js vs 'use strict' vs Firefox vs IE

Hi folks

I fixed a very weird bug today.

Initially the bug was raised that some actions causes JavaScript error in Firefox:

```
TypeError: access to strict mode caller function is censored
```

This was not happening in IE or Chrome.

I started to debug and found that the problem is within MicrosoftAjax framework. I am working on a legacy ASP.NET WebForms project which uses and relies on it heavily.

For the blogging purposes I looked for a debug/unminified version of the problematic script and found it here: http://ajax.aspnetcdn.com/ajax/4.5.2/1/MicrosoftAjaxWebForms.Debug.js

I would like to refer to some lines so I uploaded the same file to gist.

The problematic line was https://gist.github.com/mnaoumov/55be04ca588ff22f851f#file-microsoftajaxwebforms-debug-js-L738

```js
while (caller.arguments.callee.caller && --recursionLimit) {
```

where at some stage **caller.arguments.callee** variable equals to the function that is defined in some script with

```js
"use strict";
```

directive

and therefore it prohibited to call its **caller**

And the reason why this issue occurred in Firefox only is the line https://gist.github.com/mnaoumov/55be04ca588ff22f851f#file-microsoftajaxwebforms-debug-js-L733

```js
var event = window.event;
```

**window.event** is **undefined** in Firefox. This **event** variable is not really needed. The only place it is used https://gist.github.com/mnaoumov/55be04ca588ff22f851f#file-microsoftajaxwebforms-debug-js-L785 would be called under pretty rare condition according to the code flow.

```js
activeElement = event ? (event.target || event.srcElement) : null;
```

So in order to fix the problem I think it is pretty safe to fake **window.event** for this function.

So I've written a hack

```js
/**
 * This is required to fix a bug in MicrosoftAjaxWebForms.js
 * in Firefox where if window.event is not initialized, it loops stack
 * via arguments.callee.caller chain and breaks because of the
 * "use strict" mode
 */
function hackEventWithinDoPostBack() {
    var originalDoPostBack = window.__doPostBack;

    window.__doPostBack = function hackedDoPostBack() {
        if (!window.event)
            window.event = {};
        return originalDoPostBack.apply(this, arguments);
    };
}
```

And this worked fine in Firefox. I thought it would work fine in IE and Chrome as well because I am checking for **window.event** before overriding but it was not!

IE11 started to fail in other places with the following error

```
Assignment to read-only properties is not allowed in strict mode
```

That was caused by the

```js
window.event = {};
```

line written above. I found that **window.event** still can be **undefined** but you are not allowed to set it explicitly.

That appeared to be a bit tricky to overcome and eventually I came up with a pretty sophisticated solution

```js
/**
 * This is required to fix a bug in MicrosoftAjaxWebForms.js
 * in Firefox where if window.event is not initialized, it loops stack
 * via arguments.callee.caller chain and breaks because of the
 * "use strict" mode
 *
 * Hacking window.event property is required because it is
 * not settable in Internet Explorer
 */
function hackEventWithinDoPostBack() {
    var originalEventDescriptor = Object.getOwnPropertyDescriptor(Window.prototype, "event");
    var hackEventVariable = false;
    var eventPropertyHolder;
    Object.defineProperty(window, "event", {
        configurable: true,
        get: function get() {
            var result = originalEventDescriptor ? originalEventDescriptor.get.apply(this, arguments) : eventPropertyHolder;
            if (result || !hackEventVariable)
                return result;
            return {};
        },
        set: function set(value) {
            if (originalEventDescriptor)
                originalEventDescriptor.set.apply(this, arguments);
            else
                eventPropertyHolder = value;
        }
    });

    var originalDoPostBack = window.__doPostBack;

    window.__doPostBack = function hackedDoPostBack() {
        hackEventVariable = true;
        originalDoPostBack.apply(this, arguments);
        hackEventVariable = false;
    };
}
```

This works in IE, Chrome and Firefox.

Such a workaround, isn't it?!

Stay tuned
