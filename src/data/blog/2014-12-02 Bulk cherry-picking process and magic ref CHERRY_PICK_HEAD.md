---
description: Using the CHERRY_PICK_HEAD ref to inspect the commit being cherry-picked during conflict resolution.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[cherry-pick](<../Tags/cherry-pick.md>)"
  - "[version-control](<../Tags/version-control.md>)"
pubDatetime: 2014-12-02T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:04-06:00
title: "Bulk cherry-picking process and magic ref CHERRY_PICK_HEAD"
url:
  - https://mnaoumov.wordpress.com/2014/12/03/bulk-cherry-picking-process-and-magic-ref-cherry_pick_head/
disabled rules:
  - yaml-title
---

# 2014-12-02 Bulk cherry-picking process and magic ref CHERRY_PICK_HEAD

Hi folks

I'd like to share one cool thing I've discovered recently

I am doing a lot of cherry-picks these days. And often I want to cherry-pick a lot of commits at once, and I do something like

```powershell
git checkout prod
$commits = git log dev --grep \#12345 --reverse git cherry-pick -x $commits
```

Then if some merge conflicts occur

```
git mergetool
```

Then after conflict resolved

```powershell
git commit --no-edit; git cherry-pick --continue
```

But there are cases of complex conflict resolution, where I'd like to see what is the commit I am trying to cherry-pick exactly doing. And previously I just went back to my shell and looked for something like

```
error: could not apply 01e4c60... My cool commit message
```

Then I copied this 01e4c60 into clipboard, open GitExtensions, press Ctrl + Shift + G to navigate to commit and then finally I can see what this commit is about to continue my merge conflict resolution.

But recently I've found a cool alternative. Instead of looking for this 01e4c60 in the shell, I could just use an automatic ref CHERRY_PICK_HEAD, so this saves me a few moments.

Alternatively, you can view the commit in the console. You may need to open another console window because the current one is blocked with **git mergetool**

```
git log -1 CHERRY_PICK_HEAD -p
```

Stay tuned
