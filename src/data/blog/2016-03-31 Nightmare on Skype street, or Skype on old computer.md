---
description: Troubleshooting Skype on a 15-year-old Windows XP machine without SSE2 support, eventually resolved with a patched Skype 4.2 build.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[skype](<../Tags/skype.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[troubleshooting](<../Tags/troubleshooting.md>)"
  - "[legacy](<../Tags/legacy.md>)"
pubDatetime: 2016-03-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Nightmare on Skype street, or Skype on old computer"
url:
  - https://mnaoumov.wordpress.com/2016/04/01/nightmare-on-skype-street-or-skype-on-old-computer/
disabled rules:
  - yaml-title
---

# 2016-03-31 Nightmare on Skype street, or Skype on old computer

Hi folks

We often install Skype on our relatives' computers and educate them how to call us and respond to our calls.

One of my 80 years old relative had Skype configured and it suddenly stopped to work a while ago.

The PC is 15 years old and has Windows XP on it.

If only I had TeamViewer running there, I might look at the problem, but it is extremely difficult to explain someone 80 years old how to run TeamViewer by phone even if its shortcut is on the desktop already. I regret I didn't configure unattended mode in TeamViewer before…

Once I get someone to run TeamViewer for me, I started working on that issue.

1\. I installed latest version of Skype 7.22 but it fails on startup with Runtime error 216, which I could not fix. 2. Then I decided to install some older version and found Skype 6.11. Installed and ran successfully but could not login. After a while I found that Microsoft deprecated Skype versions below 6.14 3. Then I found another Skype version 6.21, and could login successfully. But I could not make video calls, Skype was saying that my CPU does not have SSE2 feature and they don't support video calls on such CPUs anymore. 4. The same issue with Skype 6.14 5. I found some link http://www.skype.com/go/getskype-sse, where some special version for SSE CPUs used to live. But the installer seemed to be the same as on step 1 6. Then I gave up and decided to install something else. I tried Jitsi but it fails on run. ooVoo and VSee fails on installer run with Runtime error 005.

Here I stuck. I couldn't find anything for a good Skype replacement. It appeared to be a pretty difficult task. A wasted a lot of time and didn't make any progress. Such a shame!

7\. Eventually I found a special hacked version of Skype 4.2 which works everywhere, http://rutracker.org/forum/viewtopic.php?t=4950556

This version worked including video calls!!! Hurrah!!

Finally! Microsoft, why did you do that to me?! Why are you dropping support for old versions?! Do you realize that many of us have old relatives that cannot just go and buy new computers whenever you decide to drop support for old computers? Why can't you check the requirements during installation? Why can't you keep some version which would work on old computers?

Jitsi, ooVoo, VSee guys, if you state that you support Windows XP, do you bother to ensure they really work?!

Damn!

Stay tuned
