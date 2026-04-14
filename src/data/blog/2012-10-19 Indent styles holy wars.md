---
description: Discussion of Allman vs K&R brace styles across C#, JavaScript, CSS, and PowerShell.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[code-style](<../Tags/code-style.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[css](<../Tags/css.md>)"
  - "[powershell](<../Tags/powershell.md>)"
pubDatetime: 2012-10-19T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Indent styles holy wars"
url:
  - https://mnaoumov.wordpress.com/2012/10/19/indent-styles-holy-wars/
disabled rules:
  - yaml-title
---

# 2012-10-19 Indent styles holy wars

It is a probably my [Baby duck syndrome](http://en.wikipedia.org/wiki/Baby_duck_syndrome) but I prefer to develop using indents in [Allman style](http://en.wikipedia.org/wiki/1_true_brace_style#Allman_style). It also sometime called as _BSD Style_. In ReSharper indent settings it called _BSD style_

```csharp
public static void Main()
{
    // Indent with four spaces
}
```

This style is a default recommended style for C# and that's why I am using it.

However in JavaScript default recommended style is [K&R 1TBS style](http://en.wikipedia.org/wiki/1_true_brace_style#Variant:_1TBS). In ReSharper indent settings it called _K&R style_

It also has funny name _Egyptian Brackets_ in a [Programming Jargon](http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html)

![image-2022-03-27-21-37-20.png](<./!!files/2012-10-19 Indent styles holy wars/image-2022-03-27-21-37-20.png>)

It seems that default style for css is K&R but I prefer Allman for it.

I could not find any guidelines about PowerShell. It seems that people are using K&R or mixed style.

For now I am using Allman style

```powershell
Test-Fixture "Test Fixture 1" `
    -TestFixtureSetUp `
    {
        "TestFixtureSetUp"
    } `
    -Tests `
    (
        Test "Test 1" `
        {
            "Test 1"
        }
    ),
    (
        Test "Test 2" `
        {
            "Test 2"
        }
    )
```

but as you see it heavily uses ` (backtick) symbol.

Don't know maybe it is ugly?

I am trying to decide maybe it is more natural to use K&R for PowerShell?

What's your preference?
