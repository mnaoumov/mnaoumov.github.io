---
description: Introduction to a git hooks repository that prevents ugly pull-merge commits from cluttering git history.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
pubDatetime: 2012-10-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "Useful git hooks"
url:
  - https://mnaoumov.wordpress.com/2012/10/10/useful-git-hooks/
disabled rules:
  - yaml-title
---

# 2012-10-10 Useful git hooks

[Git hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) is a nice way to do extend git capabilities.

I decided to create some of them which helps in different day-to-day situations

I have a repository [http://bitbucket.org/mnaoumov/githooks/](http://bitbucket.org/mnaoumov/githooks/) where you can get all of them.

So far two hooks are implemented which handles the situation when you do pull from a repository having some local commits and this ends up with ugly merge commit such as

**Merge branch 'test_merge_pull' of ssh://bitbucket.org/mnaoumov/githooks into test_merge_pull**

These commits make git history non-linear and difficult to read.

My hooks handle this situation showing the dialog

![merge-commit-dialog1.png](<./!!files/2012-10-10 Useful git hooks/merge-commit-dialog1.png>)

Unfortunately git does not have **pre-merge** hooks and that is why I had to use **post-merge** and then rollback the changes. If merge had conflicts the only hook is applied is after you fix the conflicts and do commit. But in this case **post-merge** is not called and I have to use **post-commit** instead.

**TODO list for other Hooks**

- You can often have different releases branches such as **release.1.0**, **release.2.0** and **master** for a future release.

    When you make some change in **release.1.0** you should merge it with **release.2.0** and then **release.2.0** with **master**.

    My idea is to write a hook which will allow only such merges and block all others.

- Hook which allow rebase only local branches and block rebase of already published branches
- Hook which will block incorrect 'hard reset' pushes ([see](<./2012-09-20 Guide how to easy screw up your git repository.md>) for more details). Unfortunately git does not have no **pre-push** hooks which can be used on a client-side so we have to have a server-side hook.
- Hook that will check that all your commit messages prefixed with corresponding TFS work item ID

[Useful git hooks – Part 2](<./2012-10-11 Useful git hooks - Part 2.md>)
