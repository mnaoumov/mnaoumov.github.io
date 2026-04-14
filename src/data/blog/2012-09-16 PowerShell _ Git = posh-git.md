---
description: "Installing and configuring posh-git for PowerShell tab completion with Git, including a fix for slow prompt performance."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[git](<../Tags/git.md>)"
  - "[posh-git](<../Tags/posh-git.md>)"
pubDatetime: 2012-09-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell _ Git = posh-git"
url:
  - https://mnaoumov.wordpress.com/2012/09/16/powershell-git-posh-git/
disabled rules:
  - yaml-title
---

# 2012-09-16 PowerShell _ Git = posh-git

We want to have better command completion with Git from console. We are lucky because of the [posh-git](https://github.com/dahlbyk/posh-git)

Now we can type **git co** - press _Tab_ and get completion to **git commit** or even more interesting **git checkout** - _Tab_ - can switch between available

Installation is very simple especially with [PsGet](<./2012-09-16 PsGet - NuGet for PowerShell.md>)

```powershell
Install-Module posh-git
```

That's it! :)

There is a known bug [very slow prompt return](https://github.com/dahlbyk/posh-git/issues/21) where you can have significant delay between commands. It is caused by git status updates on every command prompt.

I would recommend to turn the status off Just add the following line into your PowerShell profile

```powershell
$GitPromptSettings.EnableFileStatus = $false
```

There are several [pull requests](https://github.com/dahlbyk/posh-git/pulls) to the posh-git repository that supposed to help with the issue but they are still open. Maybe I will try them by myself later.

EDIT: I tried several two pull requests that had to fix the issue with long prompt return for large projects. [This one](https://github.com/dahlbyk/posh-git/pull/52) did not work for me at all. I have just lost status string completely.

But [this one](https://github.com/dahlbyk/posh-git/pull/51) worked fine so I could enable status back. Command prompt still hangs but now only if repository was changed which is acceptable.

To prepare working version

```bash
git clone git://github.com/dahlbyk/posh-git.git cd posh-git git remote add robertream git://github.com/robertream/posh-git.git git fetch robertream git merge robertream/master # you will get a merge conflict git mergetool # resolve conflicts git commit
```

Then you can copy content of the **posh-git** folder into **c:\Documents\WindowsPowerShell\Modules\posh-git**

And the last step… Modify your PowerShell profile script and add

```powershell
Start-GitPrompt
```

This will turn the feature on.

Also remove the following line you added it before

```powershell
$GitPromptSettings.EnableFileStatus = $false
```
