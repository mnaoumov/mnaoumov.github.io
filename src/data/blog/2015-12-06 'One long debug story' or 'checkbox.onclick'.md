---
description: A multi-hour debugging session reveals why setting checkbox.checked inside an onclick handler requires setTimeout to work correctly.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[dom](<../Tags/dom.md>)"
pubDatetime: 2015-12-06T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "'One long debug story' or 'checkbox.onclick'"
url:
  - https://mnaoumov.wordpress.com/2015/12/06/one-long-debug-story-or-checkbox-onclick/
disabled rules:
  - yaml-title
---

# 2015-12-06 'One long debug story' or 'checkbox.onclick'

Hey folks

I spent another working day debugging something simple

I work on a legacy project which has many approaches that are discouraged nowadays.

The problem I tried to solve was around checkboxes. The very simplified version of the code looks like

```html
<input id="abc" type="checkbox" onclick="someWeirdLogic()">
```

```js
function someWeirdLogic() {
    var str = makeSynchronousAjaxPostback(); // don't ask me why it is synchronous... legacy...
    // and here str is
    // "document.getElementById('abc').checked = true";
    // or 
    // "document.getElementById('abc').checked = false";
    // depending on some server-side logic
    eval(str);
}
```

```csharp
public string WeirdResponse(bool currentAbcValue)
{
    bool newValue = !currentAbcValue;
    return string.Format("document.getElementBydId('abc').checked = {0}", newValue.ToString().ToLower());
}
```

I know it is weird... But previously it was working...

Now I had to implement a new requirement. Under some conditions you click on the checkbox it should not become ticked

So I implemented

```csharp
public string WeirdResponse(bool currentAbcValue)
{
    bool newValue = DoSomeAdditionalCheck(currentAbcValue);
    return string.Format("document.getElementBydId('abc').checked = {0}", newValue.ToString().ToLower());
}
```

But I found that my checkbox is being ticked on and off ignoring this logic.

Then I tried to modify the HTML to skip built-in checkbox click behavior

```html
<input id="abc" type="checkbox" onclick="someWeirdLogic(); return false;">
```

And now my checkbox is not being ticked at all also ignoring the server-side logic.

I thought maybe there are some other code where my checkbox checked state is being modified and I tried to use the approach I described in my recent [post](<./2015-11-29 How to debug JavaScript to find code which modifies your DOM.md>).

So I kinda set a breakpoint on checkbox checked property setter to see what code makes it unchecked.

But that setter was firing only once with **true** value and when I stopped on the breakpoint, the checkbox was ticked. But later on when I released the debugger, checkbox became unticked again. WTF?!

I did not know what's going on and tried many-many hours trying here and there. You can imagine that the real code was way more complicated so I spent some time debugging the server-side code first...

And after many hours I realized what's going on.

We can see this behavior in a much simpler form without going server-side and eval.

```html
<input id="abc" type="checkbox" onclick="document.getElementById('abc').checked = true; return false;">
```

You can try it http://output.jsbin.com/jidibotaku/

Actually your checkbox is not ticked even if onclick handler explicitly said to make it checked.

And the trick here is to use delayed execution.

```html
<input id="abc" type="checkbox" onclick="setTimeout(function() { document.getElementById('abc').checked = true; }, 0); return false;">
```

And this works! See it http://output.jsbin.com/sepodevino/1/

You can't untick the checkbox anymore, but that's what we explicitly set in onclick handler.

Damn! That was not easy to find at all.

Stay tuned
