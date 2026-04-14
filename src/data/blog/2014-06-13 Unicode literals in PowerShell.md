---
description: How to express Unicode character literals in PowerShell using char casts and ConvertFromUtf32, including surrogate pair handling.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[unicode](<../Tags/unicode.md>)"
  - "[encoding](<../Tags/encoding.md>)"
pubDatetime: 2014-06-13T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Unicode literals in PowerShell"
url:
  - https://mnaoumov.wordpress.com/2014/06/14/unicode-literals-in-powershell/
disabled rules:
  - yaml-title
---

# 2014-06-13 Unicode literals in PowerShell

Hi folks

C# has three ways to declare Unicode literals.

See [Character literals](http://msdn.microsoft.com/en-us/library/aa691087.aspx) and [Unicode character escape sequences](http://msdn.microsoft.com/en-us/library/aa664669.aspx)

```
\x   hex-digit   hex-digit-opt   hex-digit-opt   hex-digit-opt
\u   hex-digit   hex-digit   hex-digit   hex-digit
\U   hex-digit   hex-digit   hex-digit hex-digit   hex-digit   hex-digit   hex-digit   hex-digit
```

For example

```csharp
char x1Upper = '\xA';
char x2Lower = '\xab';
char x3Upper = '\xABC';
char x4Mixed = '\xaBcD';
char uUpper = '\uABCD';
char UMixed = '\U000abcD1';
```

But none of Unicode literals are available in PowerShell

\xnnnn and \unnnn literals can be expressed by a simple cast hex int to char.

```powershell
$x1Upper = [char] 0xA
$x2Lower = [char] 0xab
$x3Upper = [char] 0xABC
$x4Mixed = [char] 0xaBcD
$uUpper = [char] 0xABCD
```

\Unnnnnnnn literals require a bit more sophisticated approach

```powershell
$UMixed = [char]::ConvertFromUtf32(0x000abcD1)
```

The last approach is the most generic and works for all literals

When we need to declare a string with Unicode characters inside it requires more complex syntax

```powershell
$str = "xyz$([char] 0xA)klm$([char]::ConvertFromUtf32(0x000abcD1))"
```

If we need to deal with many Unicode strings we can declare a helper function

```powershell
function U
{
    param
    (
        [int] $Code
    )

    [char]::ConvertFromUtf32($Code)
}
```

And then we can use

```powershell
$str = "xyz$(U 0xA)klm$(U 0x000abcD1)"
```

**UPD**: Just found that my implementation has an issue with surrogate pairs

```powershell
U 0xd800
```

fails with

```
Exception calling "ConvertFromUtf32" with "1" argument(s): "A valid UTF32 value is between 0x000000 and 0x10ffff, inclusive, and should not include surrogate codepoint values (0x00d800 ~ 0x00dfff).
```

To fix this we need to extend the implementation

```powershell
function U
{
    param
    (
        [int] $Code
    )

    if ((0 -le $Code) -and ($Code -le 0xFFFF))
    {
        return [char] $Code
    }

    if ((0x10000 -le $Code) -and ($Code -le 0x10FFFF))
    {
        return [char]::ConvertFromUtf32($Code)
    }

    throw "Invalid character code $Code"
}
```
