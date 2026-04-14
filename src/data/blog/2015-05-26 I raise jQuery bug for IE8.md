---
description: Discovering that a jQuery behavior discrepancy in IE8 is actually an IE8 bug with named function expressions.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[jquery](<../Tags/jquery.md>)"
  - "[browser](<../Tags/browser.md>)"
  - "[ie8](<../Tags/ie8.md>)"
  - "[cross-browser](<../Tags/cross-browser.md>)"
pubDatetime: 2015-05-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "I raise jQuery bug for IE8"
url:
  - https://mnaoumov.wordpress.com/2015/05/27/i-raise-jquery-bug-for-ie8/
disabled rules:
  - yaml-title
---

# 2015-05-26 I raise jQuery bug for IE8

Hi folks

I found a bug in jQuery with IE8: https://github.com/jquery/jquery/issues/2350

Yes, I still have to support IE8 at work ;(

Stay tuned!

**UPD**: My "bug" was immediately closed since it is not a jQuery issue but IE8 issue with named function expressions. Later I found the exact explanation: http://kangax.github.io/nfe/#example_3_named_function_expression_creates_two_distinct_function_objects
