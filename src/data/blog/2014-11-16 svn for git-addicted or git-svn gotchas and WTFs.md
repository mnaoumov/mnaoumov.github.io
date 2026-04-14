---
description: Setting up git-svn with a non-standard Subversion repository layout, including branch and tag mappings.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[svn](<../Tags/svn.md>)"
  - "[git-svn](<../Tags/git-svn.md>)"
  - "[version-control](<../Tags/version-control.md>)"
pubDatetime: 2014-11-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "svn for git-addicted or git-svn gotchas and WTFs"
url:
  - https://mnaoumov.wordpress.com/2014/11/17/svn-for-git-addicted-or-git-svn-gotchas-and-wtfs/
disabled rules:
  - yaml-title
---

# 2014-11-16 svn for git-addicted or git-svn gotchas and WTFs

Hi folks

I'd like to talk about svn, git-svn, SubGit and SmartGit.

I joined a new company and they are using svn. It is a choice of client, so we cannot change it easily. I am a Tech Lead so I can force them to switch, but I don't really want to do this without a good support from my team at this stage. And my team has zero knowledge about git at so they not that fond about git as I am. I decided to work with some kind of git-svn bridge.

My friend @kapruscul advised me to suck it up and use whatever the other team members are using. So did I. I gave it a chance for a month. I tried to use svn. And I suffered. And I gave up.

I really like DVCS because of the atomic commits. A sort of [SRP](http://en.wikipedia.org/wiki/Single_responsibility_principle) for source controls systems: one commit for one micro-problem; another commit for refactoring; yet another commit for yet another micro-problem; then commit to normalize whitespaces etc.

I always have zillions of commits for every single task. Well, I know that's debatable if it is cool or not. Some people suggest to squash all commits when task completed. I don't like this and the compromise I can agree with is to create a feature branch for the task. It will have that zillions of commits. This branch then will be merged back to the main branch with --no-ff. So in the main branch we'll have only one merge commit but if need we go to the feature branch and see all that zillions of atomic commits.

I cannot imagine myself not using this approach in my programming life so I call myself **git-addicted**.

We have a svn repository with ~7000 commits and the oldest is ~5 years old. Initially I wanted to use some git-svn bidirectional bridge so don't deal with svn at all. And I found [SubGit](http://subgit.com/) but I did have some challenges to configure it because our svn repository does not have a canonical trunk/branches/tags structure and I was not able to configure it properly.

Then I decided to use vanilla git-svn approach and I found that it can be easily configured for any non-standard layouts.

That is how our svn repo layout looks like

```
repo-root
-branches
–branch1 (main development is being here, a sort of trunk)
–branch2
-tags
–versions (note extra level of nestedness)
—v1
—-v1.0
—-v1.1
—v2
--v2.0
--v2.1
-branch3 (note it is outside of the branches folder)
-branch4
-trunk (not really being in use for a while)
```

It took me some time to understand how to configure git-svn and get the repository fully

1\. Create a new folder for a future repository and get into it

2\. Initialize repository

```
git svn init https://my-svn-repo-url.com/
```

3\. Now we need to configure branches mappings. We could do that via manual editing **.git\config** file or using **git config** command. I will show both approaches

I edited **.git\config** file and modified **[svn-remote "svn"]** section

```
[svn-remote &quot;svn&quot;]
    url = https://my-svn-repo-url.com/
    fetch = trunk:refs/remotes/svn/trunk
    branches = branches/*:refs/remotes/svn/*
    branches = {branch3,branch4}:refs/remotes/svn/*
    tags = tags/versions/*/*:refs/remotes/svn/tags/*
```

To set this in code, we can use

```
git config svn-remote.svn.url https://my-svn-repo-url.com/
git config svn-remote.svn.fetch trunk:refs/remotes/svn/trunk
git config svn-remote.svn.branches branches/*:refs/remotes/svn/*
git config --add svn-remote.svn.branches "{branch3,branch4}:refs/remotes/svn/*"
git config svn-remote.svn.tags tags/versions/*/*:refs/remotes/svn/tags/*
```

Note **remotes/svn/** part. This part does not exist by default git-svn convention. But I think it is a good idea to keep those branches to look like svn is a separate remote. It has its own benefit that we'll see later

4\. We are ready to fetch

```
git svn fetch
```

For me it took around 20 hours to download the whole repo. It had ~7000 commits and resultant git repository folder with the full history was ~800 Mb.

That is the repository I can work on from now on. I still have a lot of gotchas to discuss but let's wait until my next blogpost...

Please, stay tuned.

[Part 2](<./2014-11-17 svn for git-addicted or git-svn gotchas and WTFs - Part 2.md>)
