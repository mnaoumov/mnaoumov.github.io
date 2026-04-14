---
description: Managing atomic commits and branch merging workflows when using git-svn to push changes back to Subversion.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[svn](<../Tags/svn.md>)"
  - "[git-svn](<../Tags/git-svn.md>)"
  - "[version-control](<../Tags/version-control.md>)"
pubDatetime: 2014-11-17T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "svn for git-addicted or git-svn gotchas and WTFs - Part 2"
url:
  - https://mnaoumov.wordpress.com/2014/11/18/svn-for-git-addicted-or-git-svn-gotchas-and-wtfs-part-2/
disabled rules:
  - yaml-title
---

# 2014-11-17 svn for git-addicted or git-svn gotchas and WTFs - Part 2

[Part 1](<./2014-11-16 svn for git-addicted or git-svn gotchas and WTFs.md>)

Hi folks.

Let's continue our git-svn adventures. In the previous blogpost we've managed to fetch the whole svn repo. Let's discuss some pitfalls.

# Local Branches

```
git checkout svn/branch1 -b branch1
```

this will create a local branch and keeps track of svn version of it.

Main commands to keep yourself updated

```
git svn fetch # analogue for git fetch
git svn rebase # analogue for git pull --rebae git
svn dcommit # analogue for git push
```

# Svn Tags

For whatever reasons git-svn gets svn tags not as git tags, but as git branches. I found a lot of articles where they explain how to convert those branches into a vanilla git tags. But from my understanding this makes sense only for one-time-import scenario where you just want to convert your svn repo into git so you won't keep svn repo anymore. It is not my case so I decided to keep svn "tags" as they are: **refs/remotes/svn/tags/v1/v1.0**

# Atomic Commits

The first thing I did after I got my git repo, I took a task and solved it using zillions of micro-commits as I used to. The task took me around 40 commits. And then I wanted to "push" it to the svn repository. 'push' in git terms = 'dcommit' in git-svn terms.

```
git svn rebase
git svn dcommit
```

And guess what? Every single commit was pushing for ~50 seconds. So in total to push all 40 commits it took me ~33 minutes. That's just unacceptable! I was very frustrated. The whole point of the idea had been compromised.

I decided to change the plan and push only one commit per task. So I still develop with zillions of commits and push them into a parallel git repo, but then I squash those commits and dcommit them into svn repo.

I tried a few approaches.

```
git checkout -b issue-12345 # make zillion commits
git checkout branch1
git svn rebase
git merge issue-12345 --squash
git commit gis svn dcommit
```

This creates one commit for the new feature. I didn't like the default message produced. It, for example, listed the merged commits in a reverse order. I've manually edited it to something like

```
#12345 New Feature

- Commit 1 Message
- Commit 1 Message
...
- Commit zillion Message
```

I found this idea is not charming very soon. I have to keep **issue-12345** forever if I want to see its commits in a more granular level. Moreover, there is no an obvious relation between squashed merge commit and the original branch.

So then I've come to another approach which I like more now. Moreover it looks like I am going to change my habits and use this approach not only for git-svn repos but with a vanilla git repos as well.

The idea is very simple actually. Same as before but keep plain merge without **\--squash**

```
git checkout -b issue-12345
# make zillion commits

git checkout branch1
git svn rebase
git merge issue-12345 --no-ff -m "#12345 Some bug fix description" 
git svn dcommit
```

So this creates a commit which looks good from a svn point of view but has a full history in your git.

You don't even need to keep **issue-12345** branch anymore

```
git branch -D issue-12345
```

because you can always get a list of these merged commits via

```
git log myhash^1..myhash^2 # here myhash is a hash for the created merge commit
```

To be continued…

[Part 3](<./2014-11-27 svn for git-addicted or git-svn gotchas and WTFs - Part 3.md>)
