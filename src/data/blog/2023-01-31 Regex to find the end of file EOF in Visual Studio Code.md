---
description: The regex $(?!\n) matches the true end of file in Visual Studio Code's multiline search mode, enabling EOF-only bulk replacements.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[vscode](<../Tags/vscode.md>)"
  - "[regex](<../Tags/regex.md>)"
  - "[tools](<../Tags/tools.md>)"
pubDatetime: 2023-01-31T01:09:30-06:00
title: "Regex to find the end of file (EOF) in Visual Studio Code"
created: 2023-01-31T01:09:30-06:00
updated: 2026-04-10T18:33:44-06:00
disabled rules:
  - yaml-title
url:
  - https://mnaoumov.wordpress.com/2023/01/31/regex-to-find-the-end-of-file-eof-in-visual-studio-code/
---

# 2023-01-31 Regex to find the end of file EOF in Visual Studio Code

Hi folks.

To do bulk text replacement, I usually use Visual Studio Code. I needed to replace some text only if it is at the end of the file (EOF). But simple regex `$` would not work, because it finds end of each line. It seems that in VSCode they use multiline regex. And I didn’t find how to switch those regex settings.

So I came up with more difficult regex for that purpose

`$(?!.|\n)`

It means **the end of line which is not followed by any character or newline**, so the only end of file (EOF) will be found.

Stay tuned!

**UPD**: Actually, the simpler regex is enough `$(?!\n)`
