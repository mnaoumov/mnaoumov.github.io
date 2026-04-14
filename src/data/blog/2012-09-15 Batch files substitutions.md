---
description: "Reference for batch file FOR variable substitution modifiers like %~f, %~d, %~p to extract path components."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[batch-files](<../Tags/batch-files.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[command-line](<../Tags/command-line.md>)"
pubDatetime: 2012-09-15T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Batch files substitutions"
url:
  - https://mnaoumov.wordpress.com/2012/09/15/batch-files-substitutions/
disabled rules:
  - yaml-title
---

# 2012-09-15 Batch files substitutions

Took [here](http://stackoverflow.com/questions/5034076/what-does-dp0-mean-and-how-does-it-work)

Calling

```
for /?
```

in the command-line gives help about this syntax.

> In addition, substitution of FOR variable references has been enhanced. You can now use the following optional syntax:
>
> ```
> %~I         - expands %I removing any surrounding quotes (")
> %~fI        - expands %I to a fully qualified path name
> %~dI        - expands %I to a drive letter only
> %~pI        - expands %I to a path only
> %~nI        - expands %I to a file name only
> %~xI        - expands %I to a file extension only
> %~sI        - expanded path contains short names only
> %~aI        - expands %I to file attributes of file
> %~tI        - expands %I to date/time of file
> %~zI        - expands %I to size of file
> %~$PATH:I   - searches the directories listed in the PATH
>                environment variable and expands %I to the
>                fully qualified name of the first one found.
>                If the environment variable name is not
>                defined or the file is not found by the
>                search, then this modifier expands to the
>                empty string
> ```
>
> The modifiers can be combined to get compound results:
>
> ```
> %~dpI       - expands %I to a drive letter and path only
> %~nxI       - expands %I to a file name and extension only
> %~fsI       - expands %I to a full path name with short names only
> %~dp$PATH:I - searches the directories listed in the PATH
>                environment variable for %I and expands to the
>                drive letter and path of the first one found.
> %~ftzaI     - expands %I to a DIR like output line
> ```
>
> In the above examples %I and PATH can be replaced by other valid values. The %~ syntax is terminated by a valid FOR variable name. Picking upper case variable names like %I makes it more readable and avoids confusion with the modifiers, which are not case sensitive.

There are different letters you can use like `f` for "full path name", `d` for drive letter, `p` for path, and they can be combined. `%~` is the beginning for each of those sequences and a number `I` denotes it works on the parameter `%I` (where `%0` is the complete name of the batch file, just like you assumed).
