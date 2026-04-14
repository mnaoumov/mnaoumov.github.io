---
description: Explains how PowerShell handles the cd.. command via a built-in function rather than special-casing the syntax.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[command-line](<../Tags/command-line.md>)"
pubDatetime: 2013-07-23T01:00:00-06:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "PowerShell and cd.."
url:
  - https://mnaoumov.wordpress.com/2013/07/24/powershell-and-cd/
disabled rules:
  - yaml-title
---

# 2013-07-23 PowerShell and cd

When I just started to learn PowerShell, my first book was [Learn Windows PowerShell in a Month of Lunches](http://www.amazon.com/Learn-Windows-PowerShell-Month-Lunches/dp/1617290211)

I remember one very interesting quote from it

> Technically, Cd.. is incorrect because it doesn’t include a space, and Cd .. is correct. In reality, PowerShell v2 catches the Cd.. error and will do the right thing (move up one level in the directory hierarchy) because that’s such a commonly typed command, but that’s the only exception that PowerShell will catch that way for you. It won’t catch something like Dir.. so it pays to be careful with those spaces.

According to this quote I thought that PowerShell interpreter has hard-coded special cases to interpret **cd..** command. And I was always wondering how exactly that's happening. Correct me if I'm wrong, but there are no articles in Internet except this one that explains how it works...

Recently I suddenly discovered how this works... Actually my understanding (and probably author's) is not right. There is no catch for the error. It is just simple

Let's execute the following command

```powershell
(Get-Command cd..).Definition
```

And the result is

```powershell
Set-Location ..
```

You see? That's simple. PowerShell just has a separate function to handle this case

If we type

```powershell
Get-Command -CommandType Function
```

we will find many other helper functions, e.g. command **C:** just equivalent for **Set-Location C:**

So there are no magic there.

If we want to have **dir..** command working as well, we can just write

```powershell
function dir.. { dir .. }
```

That's it. Now **dir..** works as well.
