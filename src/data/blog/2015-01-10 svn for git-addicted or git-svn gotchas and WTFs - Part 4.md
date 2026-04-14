---
description: Comparing SubGit and SmartGit for git-svn bridging, and using git filter-branch to rewrite SVN author history.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[svn](<../Tags/svn.md>)"
  - "[git-svn](<../Tags/git-svn.md>)"
  - "[version-control](<../Tags/version-control.md>)"
  - "[powershell](<../Tags/powershell.md>)"
pubDatetime: 2015-01-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "svn for git-addicted or git-svn gotchas and WTFs - Part 4"
url:
  - https://mnaoumov.wordpress.com/2015/01/11/svn-for-git-addicted-or-git-svn-gotchas-and-wtfs-part-4/
disabled rules:
  - yaml-title
---

# 2015-01-10 svn for git-addicted or git-svn gotchas and WTFs - Part 4

[Part 3](<./2014-11-27 svn for git-addicted or git-svn gotchas and WTFs - Part 3.md>)

Hi folks

# SubGit

After the frustration with complicated cherry-picks I decided to try [SubGit](http://www.subgit.com/) again

This time I've managed to configure it.

Comparing to vanilla git-svn it cloned svn repo much faster.

However, I found that it does not populate **svn:mergeinfo** metadata on cherry-picks, so there is no point for me to use it.

# SmartGit

[SmartGit](http://www.syntevo.com/smartgit/) is a good choice. It was a bit challenging to configure it to a non-standard svn layout, but once I did it, it cloned also really quickly.

Moreover, it natively supported **svn:mergeinfo**... But still I decided not to use it. It is a GUI client, and I am not used to it. I am more [GitExtensions](https://code.google.com/p/gitextensions/) user and even more, I am using git from console mostly anyway.

So I haven't found an use of **SmartGit** as well

# Authors File

Ok, I am coming back to git-svn and handling svn:mergeinfo manually...

After I cloned a repo, I realized that I've forgotten to prepare a svn authors file which would map svn author commit info to user names and emails.

I did not want to reclone it again, another 20 hours - no!

So I decided to do this in a git-way.

Firstly I extracted a list of all authors and prepared it in a form git-svn requires

```
svn-user-name = User Name <User Email>
```

```powershell
git log --all --format="%an = %an <%ae>" | Sort-Object -Unique > authors.txt
```

Then I had some fun trying to understand why it did not work, and after a while I realized that it did not work well with Unicode file and I had so save it as ASCII

```powershell
git log --all --format="%an = %an <%ae>" | Sort-Object -Unique | Out-File -FilePath authors.txt -Encoding Ascii
```

It prepared a file like

```
bobama = bobama <bobama@some-guid>
vputin = vputin <vputin@some-other-guid>
...
```

So I had to put real names and email there, and I did that manually

```
bobama = Barak Obama <barak.obama@white-house.gov.us>
vputin = Vladimir Putin <vladimir.putin@kremlin.ru> ...
```

If we put this file under **.git\svn\authors.txt** and execute

```
git config svn.authorsfile .git/svn/authors.txt
```

next time we do

```
git fetch
```

it will map svn user names to real names and emails.

# Rewrite Existing Commits

That's cool, but what about our existing commits with incorrect names and emails?

We'll have to do a [filter-branch](http://git-scm.com/docs/git-filter-branch). We need only change author name and email, so it is the simplest **env-filter**

```
git filter-branch --env-filter="insert bash script here" "--" --all
```

This bash script should read environment variables that correspond to current commit author name and email and then modify them accordingly.

I don't know bash at all so initially I though of running PowerShell script that would do all the magic, use the **authors.txt** we prepared previously.

So I did

```
git filter-branch --env-filter="PowerShell.exe MyScript.ps1" "--" --all
```

And none of commits were changed. After a while I realized that when I modify environment variable in a child process (PowerShell) it is not being propagated to the parent process (bash). So unfortunately, I had to write a bash script. And I did not want to get deeper and parse authors.txt file on a fly to extract name and email. So I decided to generate a bash script first.

I used a version found here: http://stackoverflow.com/questions/392332/retroactively-correct-authors-with-git-svn

So here is my generator script

```powershell
@'
#!/bin/sh

n=$GIT_AUTHOR_NAME
m=$GIT_AUTHOR_EMAIL

case ${GIT_AUTHOR_NAME} in
'@ | Out-File -FilePath MyScript.sh -Encoding Ascii

Get-Content -Path ".git\svn\authors.txt" | `
    Select-String -Pattern "^(?<Alias>[\w._]+) = (?<Name>[\w _]+) \<(?<Email>.*)\>" | `
    ForEach-Object -Process { $_.Matches } | `
    ForEach-Object -Process `
        {
            New-Object -TypeName PSObject -Property `
                @{
                    Alias = $_.Groups["Alias"].Value;
                    Name = $_.Groups["Name"].Val ue;
                    Email = $_.Groups["Email"].Value;
                }
        } |
    ForEach-Object -Process `
        {
@"
        "$($_.Alias)") n="$($_.Name)" ; m="$($_.Email)" ;;
"@
        } | Add-Content -Path MyScript.sh -Encoding Ascii

@'
esac

export GIT_AUTHOR_NAME="$n"
export GIT_AUTHOR_EMAIL="$m"
export GIT_COMMITTER_NAME="$n"
export GIT_COMMITTER_EMAIL="$m"

'@ | Add-Content -Path MyScript.sh -Encoding Ascii
```

Then we run

```
git filter-branch --env-filter="MyScript.sh" "--" --all
```

And funny, it wouldn't change any commits either for the same reason. Bash is a child process, git is a parent process.

To fix that we'll need to use a dot-sourcing.

```
git filter-branch --env-filter=". MyScript.sh" "--" --all
```

This finally works!

Stay tuned
