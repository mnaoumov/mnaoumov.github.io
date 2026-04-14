---
description: Reference table of Windows Task Scheduler event log IDs and their corresponding task lifecycle categories.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[task-scheduler](<../Tags/task-scheduler.md>)"
  - "[event-log](<../Tags/event-log.md>)"
pubDatetime: 2014-05-15T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Task Scheduler Event IDs"
url:
  - https://mnaoumov.wordpress.com/2014/05/15/task-scheduler-event-ids/
disabled rules:
  - yaml-title
---

# 2014-05-15 Task Scheduler Event IDs

I discovered that some of my task scheduler tasks are failing on the server and wanted to configure email notifications if that happens

I found an [article](http://superuser.com/questions/249103/make-windows-task-scheduler-alert-me-on-fail) how to send task scheduler notifications

I wanted to configure a trigger for multiple Event IDs and found how to do this [here](http://www.experts-exchange.com/OS/Microsoft_Operating_Systems/Q_28352736.html)

The only question left if the list of Event IDs and I could not find a list of all possible values so I extracted them from EventLog myself and putting them here

| Event ID | Task Category |
| --- | --- |
| 100 | Task Started |
| 101 | Task Start Failed |
| 102 | Task completed |
| 103 | Action start failed |
| 106 | Task registered |
| 107 | Task triggered on scheduler |
| 108 | Task triggered on event |
| 110 | Task triggered by user |
| 111 | Task terminated |
| 118 | Task triggered by computer startup |
| 119 | Task triggered on logon |
| 129 | Created Task Process |
| 135 | Launch condition not met, machine not idle |
| 140 | Task registration updated |
| 141 | Task registration deleted |
| 142 | Task disabled |
| 200 | Action started |
| 201 | Action completed |
| 203 | Action failed to start |
| 301 | Task engine properly shut down |
| 310 | Task Engine started |
| 311 | Task Engine failed to start |
| 314 | Task Engine idle |
| 317 | Task Engine started |
| 318 | Task engine properly shut down |
| 319 | Task Engine received message to start task |
| 322 | Launch request ignored, instance already running |
| 329 | Task stopping due to timeout reached |
| 332 | Launch condition not met, user not logged-on |
| 400 | Service started |
| 411 | Service signaled time change |
| 700 | Compatibility module started |

Going to create an alert for ids 101,103,111,311,329
