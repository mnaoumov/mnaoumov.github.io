---
description: How to install and configure the Source Code Pro TTF font for consistent rendering across Visual Studio, Sublime Text, and ConEmu.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[fonts](<../Tags/fonts.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[sublime-text](<../Tags/sublime-text.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[chocolatey](<../Tags/chocolatey.md>)"
pubDatetime: 2015-12-23T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Best programming font - Source Code Pro"
url:
  - https://mnaoumov.wordpress.com/2015/12/23/best-programming-font-source-code-pro/
disabled rules:
  - yaml-title
---

# 2015-12-23 Best programming font - Source Code Pro

Hi folks

Recently, I reinstalled my Windows and started to reconfigure my environment to use font I am using for last 5 years - **Consolas**

I decided to search what is the most popular font nowadays and found http://www.slant.co/topics/67/~programming-fonts where [Consolas](http://www.slant.co/topics/67/viewpoints/11/~programming-fonts~consolas) is quite popular - 249 upvotes. But I found another winner [Source Code Pro](http://www.slant.co/topics/67/viewpoints/5/~programming-fonts~source-code-pro) with 362 upvotes.

So I decided to give it a chance.

I installed it via Chocolatey - https://chocolatey.org/packages/SourceCodePro

And started using it. And initially I did not like it - https://twitter.com/mnaoumov/status/673887576097468416?lang=en

Then I used to it in Visual Studio but I still looked ugly in Sublime Text and ConEmu

Then I found how to configure it to look nice in Sublime Text - https://github.com/Maximus5/ConEmu/issues/74#issuecomment-166576653

But it depends on DirectWrite support which many apps don't have.

I raised an issue for the font itself - https://github.com/adobe-fonts/source-code-pro/issues/116 and they advised to use TTF font instead of OTF.

I checked and found that Chocolatey installed only OTF version. So I removed it and installed TTF manually from https://github.com/adobe-fonts/source-code-pro/releases/latest

And now it is nice and charming everywhere

Stay tuned
