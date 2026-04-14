---
description: Using Object.defineProperty to intercept input value assignments and trigger a debugger breakpoint on DOM mutation.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[dom](<../Tags/dom.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2015-11-29T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "How to debug JavaScript to find code which modifies your DOM"
url:
  - https://mnaoumov.wordpress.com/2015/11/29/how-to-debug-javascript-to-find-code-which-modifies-your-dom/
disabled rules:
  - yaml-title
---

# 2015-11-29 How to debug JavaScript to find code which modifies your DOM

Hey folks

Sometimes, especially on legacy projects, it's too difficult to find what code modified your DOM control.

I had such situation recently. I spent almost 5 hours trying to find where some malformed value was coming from.

To simulate the problem, please follow https://output.jsbin.com/wufimi . It has an input and a button. Some bad value is being set to the input value when you take mouse out of the button.

Let's pretend that that code is not obvious and we have too many JavaScript code to look it through.

1\. Our first approach would be to search through JavaScript files to find word **bad**, but unfortunately it is slightly obfuscated, so we won't find anything.

2\. In modern browsers like Google Chrome you can set breakpoint when DOM element changes. See https://developer.chrome.com/devtools/docs/javascript-debugging#breakpoints-mutation-events . Unfortunately this won't help us because those events are not triggered when value **property** is changed. Those events would be triggered if value **attribute** is changed.

3\. We'll need to try some kind of property debugging. Chrome has some non-standard **Object.observe**. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe . Unfortunately this doesn't work either. Try it https://output.jsbin.com/cahodo/

4\. My next idea is to overwrite value property and set some breakpoint. And that worked. Try it https://output.jsbin.com/kojuvud/ Your F12 Developer Tools should be open.

For completeness I'll copy the debugging magic code here.

```js
var input = $("input")[0];
var defaultDescriptor = Object.getOwnPropertyDescriptor(input.constructor.prototype, "value");
Object.defineProperty(input, "value", {
    set: function set(newValue) {
        if (newValue.indexOf("bad") !== -1)
            debugger;
        defaultDescriptor.set.call(input, newValue);
    }
});
```

Here **input.constructor.prototype** could be replaced with **input.**proto****, or even **HTMLInput.prototype**. This doesn't really matter.

Such **if** statement is helpful when you are trying to debug changes that happen on focus/blur, as control looses focus when breakpoint hit and it may become extremely annoying.

The call for defaultDescriptor is needed because we want to modify actual value

I did not invent this technique, I found this first http://stackoverflow.com/questions/11618278/how-to-break-on-property-change-in-chrome but it says nothing about defaultDescriptor which is crucial.

I hope this may help you with difficult debugging one day.

Stay tuned
