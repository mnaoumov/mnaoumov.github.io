---
description: Diagnoses why a Task Scheduler task silently fails when run without a logged-on user due to unavailable mapped network drives.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[task-scheduler](<../Tags/task-scheduler.md>)"
  - "[networking](<../Tags/networking.md>)"
  - "[registry](<../Tags/registry.md>)"
pubDatetime: 2014-06-05T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Windows Task Scheduler silently fails"
url:
  - https://mnaoumov.wordpress.com/2014/06/05/windows-task-scheduler-silently-fails/
disabled rules:
  - yaml-title
---

# 2014-06-05 Windows Task Scheduler silently fails

Hi folks

Today I've discovered an issue which I would like to share.

We had a Task Scheduler task which runs cmd, and that cmd runs robocopy to backup some files to the network drive.

I've been asked to investigate why it is not working and not showing any errors.

According to the TaskScheduler event log: task completes within with event type 201

```
Task Scheduler successfully completed task "\Mytask" , instance "{b35cde71-a3d3-46fc-9ee7-be66e54a5636}" , action "C:\Windows\SYSTEM32\cmd.exe" with return code 0.
```

After some head scratches I found the root cause

Firstly, it started to work when I enabled **Run only when user is logged on**

![run-only-when-user-is-logged-on.jpg](<./!!files/2014-06-05 Windows Task Scheduler silently fails/run-only-when-user-is-logged-on.jpg>)

Previously it was **Run whether user is logged on or not**

The drawback of the second mode is that the running process windows are hidden so we cannot see what is going on.

And after some googling I found that in this mode none of mapped drives will work

http://www.networksteve.com/forum/topic.php/Running_Scheduled_Task_using_%22Run_whether_user_is_logged_on_or_n/?TopicId=10304&Posts=0

And here is the solution for that

http://modmaven.wordpress.com/2009/05/27/how-to-make-windows-7-map-your-network-drives-properly/

```powershell
Set-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -Name EnableLinkedConnection -Value 1 -Type DWord
```
