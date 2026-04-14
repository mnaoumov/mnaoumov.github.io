---
description: Technique for debugging unexpected focus changes by monkey-patching HTMLElement.prototype.focus with a debugger breakpoint.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[dom](<../Tags/dom.md>)"
pubDatetime: 2015-02-13T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Debugging weird focus behavior in browser"
url:
  - https://mnaoumov.wordpress.com/2015/02/14/debugging-weird-focus-behavior-in-browser/
disabled rules:
  - yaml-title
---

# 2015-02-13 Debugging weird focus behavior in browser

Hi folks

Recently I was working with a task to fix a weird focus behavior. On a certain action, current input element was losing focus and some other input element gained the focus.

I spent a lot of time trying to understand why that happened. There are a lot of ways to set breakpoint to the focus/blur event but this would not help to understand WHY that happened at first place.

Finally, I've got an idea to set a breakpoint on myElement.focus() function

```js
window._focus = myElement.focus;
myElement.focus = function() {
    debugger;
    window._focus.apply(this, arguments);
}
```

In case if I need to debug focus for all elements I use

```js
window._focus = HTMLElement.prototype.focus;
HTMLElement.prototype.focus = function() {
  debugger;
  window._focus.apply(this, arguments);
}
```

This helped me to set a breakpoint and from the stack trace I could finally find the code which was calling the focus on that random element and I've managed to fix the issue.

I think such approach could be used to set a breakpoint to any native function.

Please stay tuned.
