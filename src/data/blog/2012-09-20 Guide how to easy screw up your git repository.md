---
description: "A real incident where a wrong-branch git reset --hard corrupted a release branch, with recovery steps for the team."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2012-09-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Guide how to easy screw up your git repository"
url:
  - https://mnaoumov.wordpress.com/2012/09/20/guide-how-to-easy-screw-up-your-git-repository/
disabled rules:
  - yaml-title
---

# 2012-09-20 Guide how to easy screw up your git repository

Yesterday I screwed up our git and we spent more than 2 hours to clean the mess, investigate how this happened and how to help other developers to fix that.

**_Background_** We have git with **master** and **release** branches.

We have a **RULE**: never ever merge **release** with **master**. Only backward **master** with **release**.

When we merge **master** with **release** a merge commit with message _Merge branch 'release' is created_

**_Issue_** We found that **origin/release** branch looks like it is merged with **master** But weird thing that HEAD commit of **origin/release** had message _Merge branch 'release'_ rather than _Merge branch 'master'_ which I would expect here

**_Actions took_** We could not afford having that _merge_ commit in a history so we had to rewrite history

```bash
git checkout release
git reset --hard HEAD^2
git push origin release --force
```

So that we fixed issue in the repository.

Then we had to inform other developers if they pulled during the time that **bad** commit was in a repository that they have to apply fix locally.

- git fetch
- git checkout release
- Extra steps if you have un-pushed changes in release
    - git checkout –b release-backup
    - git checkout release
- git reset --hard origin/release
- Extra steps if you have un-pushed changes in release
    - Cherry pick your un-pushed commits from release-backup
    - git branch –D release-backup

**_Investigation_** Obviously we needed to find out how that happened? How could I push such changes? Why they were not rejected during push?

We found out what happened.

So initially I finished work in **release** branch, merged it into **master** and pushed.

But what is next?

I was making some changes and then I wanted to undo them.

So I typed

```bash
git reset --hard origin/master
```

Then I pushed...

The problem was that when I executed that reset I was not in **master** but in **release** branch.

So I actually reset into **origin/master** which has exactly that merge commit.

Then when I pushed difference between **origin/release** and **release** was considered as fast-forward so that is why repository haven't rejected it.

So as we can see this mistake is very easy to do and very difficult to prevent. We are currently thinking about some hooks to prevent this situation.

_Be careful..._

UPDATE: **More details - more interesting...**

I am even using [**posh-git**](<./2012-09-16 PowerShell _ Git = posh-git.md>) which shows what my current branch is. But the problem was in the fact that I had the following look in console

```bash
C:\Work\Code [master]>
```

Then I went to Git Extensions and checked out **release** branch

But when I went to console it still showed me that I am on **master** If I would press Enter it would show me in a next prompt that I am on **release**

But I did not press Enter so my prompt looked like ```bash

C:\Work\Code [master]> git reset --hard origin/master

```

Although I was on **release**

So...

Be careful... Don't trust your tools... Don't trust yourself... Press Enter... :)
