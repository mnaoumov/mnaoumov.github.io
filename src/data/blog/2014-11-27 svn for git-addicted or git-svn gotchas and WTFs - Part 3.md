---
description: Handling svn:mergeinfo during cherry-picks with git-svn, and updating mergeinfo metadata manually.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[svn](<../Tags/svn.md>)"
  - "[git-svn](<../Tags/git-svn.md>)"
  - "[cherry-pick](<../Tags/cherry-pick.md>)"
  - "[version-control](<../Tags/version-control.md>)"
pubDatetime: 2014-11-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "svn for git-addicted or git-svn gotchas and WTFs - Part 3"
url:
  - https://mnaoumov.wordpress.com/2014/11/28/svn-for-git-addicted-or-git-svn-gotchas-and-wtfs-part-3/
disabled rules:
  - yaml-title
---

# 2014-11-27 svn for git-addicted or git-svn gotchas and WTFs - Part 3

[Part 2](<./2014-11-17 svn for git-addicted or git-svn gotchas and WTFs - Part 2.md>)

Hi folks

# Cherry-picks

One of the first things I needed to do with my repository is to do cherry-picks from dev into prod branch.

Let's say we want to cherry-pick commit with revision r1234 from dev branch

In svn you just do

```
svn merge -c 1234 ^/branches/dev
```

And besides the cherry-pick itself, it will also update metadata, namely **svn:mergeinfo** property. And you will try to cherry-pick the same commit again, it will be a no-op.

Let's say r1234 corresponds to the commit abcdef

If we do

```
git cherry-pick -x abcdef git svn dcommit
```

svn:mergeinfo is not updated. Note that I even added **\-x** which adds (cherry-picked from ...) into a commit message.

So git-svn does not handle these cherry-picks automatically.

The solution that I found is to use **\--mergeinfo** parameter

```
git cherry-pick -x abcdef
git svn dcommit --mergeinfo="/branches/dev:1234"
```

But the next gotcha will occur when you perform the next cherry-pick

Let's say you want to cherry-pick another commit r5678 with commit hash defabc

If you just do

```
git cherry-pick -x defabc
git svn dcommit --mergeinfo="/branches/dev:5678"
```

The result will be wrong, because result value of the svn:mergeinfo will be "/branches/dev:5678" instead of "/branches/dev:1234,5678"

So this means that every time we do a cherry-pick we have to manually append new commits to the mergeinfo

```
git cherry-pick -x defabc
git svn dcommit --mergeinfo="/branches/dev:1234,5678"
```

It's a bit inconvenient. I did not find an easy way to script it.

So every time you are going to dcommit cherry-picks you'll have to extract existing svn:mergeinfo values

```
svn propget svn:mergeinfo https://my-svn-repo-url.com/branches/prod
```

In case if you cherry-picked from different branches, the command above will return several lines

```
/branches/dev:1234,5678 /branches/some-other-branch:2345,6789
```

and then you have to join these lines with a space and insert a cherry-picked revision

```
git svn dcommit --mergeinfo="/branches/dev:1234,5678,9012 /branches/some-other-branch:2345,6789"
```

This inconvenience with cherry-picks and git-svn annoyed me very much so I decided to try other techniques such as SubGit and SmartGit. Let's talk about them next time...

Please stay tuned

[Part 4](<./2015-01-10 svn for git-addicted or git-svn gotchas and WTFs - Part 4.md>)
