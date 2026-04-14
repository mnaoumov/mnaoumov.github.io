---
description: "Guide to turning a Windows laptop into a Wi-Fi hotspot using netsh hosted network commands, with a Windows 8 driver fix."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[networking](<../Tags/networking.md>)"
  - "[wifi](<../Tags/wifi.md>)"
pubDatetime: 2012-09-15T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Use laptop as a Wi-Fi router"
url:
  - https://mnaoumov.wordpress.com/2012/09/15/use-laptop-as-a-wi-fi-router/
disabled rules:
  - yaml-title
---

# 2012-09-15 Use laptop as a Wi-Fi router

Almost all modern laptops (if they have 'Windows 7 compatible' label) can be used as a Wi-Fi router So you can use Internet on all your devices such as phones, tablets etc as soon as you get Internet on your laptop.

[Here](http://blog.astrill.com/index.php/2011/01/14/share-astrill-vpn-with-all-your-wireless-devices/) is a nice article how to do this.

Useful commands (should be run as administrator)

**Create-WiFi.cmd** ```bash

netsh wlan set hostednetwork mode=allow ssid=MyConnectionName key=MyPassword

```

**Start-WiFi.cmd** ```bash
netsh wlan start hostednetwork
```

I had the following issue with Windows 8.

> The hosted network couldn't be started. The group or resource is not in the correct state to perform the requested operation.

When I installed [Connectify](http://www.connectify.me/) tool it installed a driver which resolves the issue. I could then uninstall the tool.
