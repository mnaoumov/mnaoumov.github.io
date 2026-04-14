---
description: A reusable JavaScript helper that wraps DOM element properties with CustomEvent-based propertyChanging, propertyChanged, and propertyGetting events.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[dom](<../Tags/dom.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[browser](<../Tags/browser.md>)"
pubDatetime: 2016-02-13T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "JavaScript propertyChanging, propertyChanged, propertyGetting events"
url:
  - https://mnaoumov.wordpress.com/2016/02/14/javascript-propertychanging-propertychanged-propertygetting-events/
disabled rules:
  - yaml-title
---

# 2016-02-13 JavaScript propertyChanging, propertyChanged, propertyGetting events

Hi folks

A while ago I [described](<./2015-11-29 How to debug JavaScript to find code which modifies your DOM.md>) how to debug native DOM element changes.

I needed to use it more often and that became too annoying to write all that boilerplate code over and over.

I decided to implement an event-driven helper. For setter I create propertyChanging, propertyChanged and propertyGetting events. You can just subscribe to an appropriate one and put any conditional logic in the event handler. This should be much neater than the previous approach.

This helper must work in all modern browsers and IE9+

```js
function injectPropertyEvents(element, propertyName) {
    if (!(propertyName in element))
        throw new Error("Element does not have property " + propertyName);

    var propertyHolder = element;
    var descriptor;
    while (propertyHolder !== null) {
        descriptor = Object.getOwnPropertyDescriptor(propertyHolder, propertyName);
        if (descriptor)
            break;
        propertyHolder = Object.getPrototypeOf(propertyHolder);
    }

    if (!descriptor)
        throw new Error("Could not find property descriptor " + propertyName);

    if (propertyHolder.propertyEventsInjected)
        return;

    function raiseEvent(element, eventName, eventDetails) {
        var event;
        var bubbles = true;
        var cancelable = false;
        try {
            event = new CustomEvent(eventName, {
                bubbles: bubbles,
                cancelable: cancelable,
                detail: eventDetails
            });
        } catch (e) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, bubbles, cancelable, eventDetails);
        }
        element.dispatchEvent(event);
    }

    Object.defineProperty(propertyHolder, propertyName, {
        configurable: true,
        get: function get() {
            var eventDetails = {
                value: descriptor.get.call(this)
            }
            raiseEvent(this, propertyName + "Getting", eventDetails);
            return eventDetails.value;
        },
        set: function set(value) {
            var eventDetails = {
                oldValue: descriptor.get.call(this),
                newValue: value
            };
            raiseEvent(this, propertyName + "Changing", eventDetails);
            descriptor.set.call(this, eventDetails.newValue);
            raiseEvent(this, propertyName + "Changed", eventDetails);
        }
    });

    propertyHolder.propertyEventsInjected = true;
}
```

Besides being able to set breakpoints, this approach allows you many nice tricks. You can, for example, override the **newValue** event argument within **propertyChanging** event

```js
document.getElementById("myTextBox").addEventListener("valueChanging", function valueChangingHandler(e) {
    if (e.detail.newValue === "something bad")
        e.detail.newValue = "making it better";
});
```

You can play with the examples in https://jsfiddle.net/mnaoumov/69ejdj1p/1/

Stay tuned

**UPD**: With slight modifications and polyfills, added support for IE8: http://output.jsbin.com/gesajo/3/

**UPD2**: I modified **bubbles** to **true** as I found it much more useful to real usage purposes, especially for writing an event handler for elements that not exist yet.

```js
$(document).on("valueChanged", "input", function valueChangedHandler(e) {
    var newValue = e.originalEvent.detail.newValue;
    // ...
});
```
