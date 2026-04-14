---
description: "How to suppress the posh-git ssh-agent warning by commenting out Start-SshAgent in the profile script."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[git](<../Tags/git.md>)"
  - "[posh-git](<../Tags/posh-git.md>)"
  - "[ssh](<../Tags/ssh.md>)"
pubDatetime: 2012-09-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "posh-git _ WARNING_ Could not find ssh-agent"
url:
  - https://mnaoumov.wordpress.com/2012/09/18/posh-git-warning-could-not-find-ssh-agent/
disabled rules:
  - yaml-title
---

# 2012-09-18 posh-git _ WARNING_ Could not find ssh-agent

It is annoying and I wanted to turn it off.

Edit **C:\Documents\WindowsPowerShell\Modules\posh-git\profile.example.ps1** And comment out the following line there

```powershell
Start-SshAgent -Quiet
```
