---
description: "Configuration for using Devart CodeCompare as the diff and merge tool for Git via .gitconfig entries."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[diff-tool](<../Tags/diff-tool.md>)"
  - "[merge-tool](<../Tags/merge-tool.md>)"
pubDatetime: 2012-09-13T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Git _ Devart CodeCompare integration"
url:
  - https://mnaoumov.wordpress.com/2012/09/13/git-devart-codecompare-integration/
disabled rules:
  - yaml-title
---

# 2012-09-13 Git _ Devart CodeCompare integration

Thanks to [@Daniel](https://twitter.com/DanPTurner)

I finally succeed integrating Git & my favorite comparison tool [Devart CodeCompare](http://www.devart.com/codecompare/)

To integrate add the following lines to the **c:\\Users\\\[User Name\]\\.gitconfig** file

```bash
[diff]
    tool = codecompare
    guitool = codecompare
[merge]
    tool = codecompare 
[mergetool]
    keepBackup = false
[difftool "codecompare"]
    cmd = 'C:/Program Files/Devart/Code Compare/CodeCompare.exe' \"$LOCAL\" \"$REMOTE\"
    renames = true
[mergetool "codecompare"]
    cmd = 'C:/Program Files/Devart/Code Compare/CodeMerge.exe' -MF=\"$LOCAL\" -TF=\"$REMOTE\" -BF=\"$BASE\" -RF=\"$MERGED\"
    trustExitCode = true
```

Now **git difftool** will work properly from both command line and Git Extensions.

P.S. I **strongly** recommend to disable Visual Studio integration with CodeCompare during installation. I think it is much better to use its stand-alone host because of the performance.

EDIT: I found that mergetool was not working. Updated it.
