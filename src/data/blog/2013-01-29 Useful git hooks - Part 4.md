---
description: Summary of an expanded git hooks suite enforcing branch merge order, rebase safety, TeamCity build status, and push timing rules.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[git-hooks](<../Tags/git-hooks.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[teamcity](<../Tags/teamcity.md>)"
  - "[ci-cd](<../Tags/ci-cd.md>)"
pubDatetime: 2013-01-29T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Useful git hooks - Part 4"
url:
  - https://mnaoumov.wordpress.com/2013/01/29/useful-git-hooks-part-4/
disabled rules:
  - yaml-title
---

# 2013-01-29 Useful git hooks - Part 4

Continuing [Useful git hooks - Part 3](<./2012-10-31 Useful git hooks - Part 3.md>)

Lots of git hooks were written since my last blogpost.

I really want to sum up what was done so far.

All the hooks are available on [BitBucket](https://bitbucket.org/mnaoumov/githooks) and [GitHub](https://github.com/mnaoumov/githooks) repos

We have simple branching model: **master** represents future releases, at some point we are creating a separate release branch and then only adding bug fixes for those branches. At the moment we have 4 release branches (including **master**) and not being careful developers can mess up the repo.

That was the original idea to build some safety net to help developers to enforce the best practices.

The very first hook was written by my tech lead, is to ensure that people prefix their commit messages with corresponding TFS WorkItem ID. Yeah, this is the only thing which I liked in TFS source control system and miss in git - easy link changesets with tasks.

Later on we made that hook more interactive, added WPF for GUI dialog, and console interaction for console prompts.

Then we decided to implement hooks to enforce all the git rules and best practices that we have

- Prevent pull merges, as they unnecessary complicate the git history. However, rebase is considered to be more complex process than merge, so we don't enforce this rule too strictly. We don't reject such commits via server-side hooks
- Allow only certain merge directions, such as release1 -> release2 -> release3 -> master. All other no-ff merges are rejected in both client-side and server-side hooks.
- Don't allow to rebase branch if it will touch merge commits. Otherwise these merges will be flattened out. [See http://stackoverflow.com/questions/2590260/when-will-git-pull-rebase-get-me-in-to-trouble](http://stackoverflow.com/questions/2590260/when-will-git-pull-rebase-get-me-in-to-trouble)
- Don't allow to push into a branch if corresponding TeamCity build is broken. Allow only commits intended to fix the build, prefixed with BUILDFIX
- Don't allow to push into a branch if it has unmerged made more than 24h ago. Initially we wanted to enforce immediate merges, however it introduced a problem, when people were not able to push during whole working day, and the merge could not be made because of the broken builds (see previous rule). So we decided to make it less restrictive and give some timeframe for merge to be made. Initially we added 24h counted from **Author date** of the commit, however it did not help at all, people pushed their old commits and immediately back to the previous problem. Finally we implemented 24h counting from the actual push date.

Implementation of all these hooks heavily improved my git knowledge and I solved a lot of interesting problems.

I will create a separate blogpost describing the most interesting findings.

For now, I abandoned all the hooks tests because it became too complex to write them, I have to review the whole approach and make hooks more tests-friendly. Ideally they should be unit testable.
