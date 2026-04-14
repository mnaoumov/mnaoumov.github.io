---
description: A require.js plugin that loads dependencies from the top-level window so BlockUI works across iframe popups.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[jquery](<../Tags/jquery.md>)"
  - "[requirejs](<../Tags/requirejs.md>)"
  - "[iframe](<../Tags/iframe.md>)"
  - "[amd](<../Tags/amd.md>)"
pubDatetime: 2015-08-06T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "jQuery BlockUI and iframe vs require.js"
url:
  - https://mnaoumov.wordpress.com/2015/08/07/jquery-blockui-and-iframe-vs-require-js/
disabled rules:
  - yaml-title
---

# 2015-08-06 jQuery BlockUI and iframe vs require.js

Hi folks

We are using [jQuery BlockUI](http://malsup.com/jquery/block/) plugin to indicate long-running operations.

**progress-indicator.js**

```js
(function script() {
    "use strict";

    define(["jquery", "jquery.blockUI"], function module($) {
        function showProgressIndicator() {
            $.blockUI();
        }

        return {
            showProgressIndicator: showProgressIndicator
        };
    });
})();
```

Also we show popups using iframes.

When we execute long-running operation from popup, BlockUI blocks only popup iframe and that doesn't look great especially for small popups.

So we want to block the whole page, and to do that we just have to call BlockUI in the global window context.

```js
window.top.$.blockUI()
```

However, require.js complicates things. If we replace **$** with **window.top.$**, it defeats the whole purpose of the require.js modular approach.

We want to load jquery and jquery.blockUI dependencies from top level window, but there is no a way to achieve this with vanilla require.js so I decided to write a simple plugin.

**top.js**

```js
(function script() {
    "use strict";

    define([], function module() {
        return {
            load: function load(name, parentRequire, onload, config) {
                window.top.require([name], onload);
            }
        };
    });
})();
```

then we call this **top** plugin

**progress-indicator.js**

```js
(function script() {
    "use strict";

    define(["top!jquery", "top!jquery.blockUI"], function module($) {
        function showProgressIndicator() {
            $.blockUI();
        }

        return {
            showProgressIndicator: showProgressIndicator
        };
    });
})();
```

Such an elegant solution, isn't it?

Stay tuned
