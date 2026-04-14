---
description: C# regex approach to remove unpaired UTF-16 surrogate characters from strings to ensure valid Unicode output.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[unicode](<../Tags/unicode.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[encoding](<../Tags/encoding.md>)"
  - "[regex](<../Tags/regex.md>)"
pubDatetime: 2014-06-14T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Stripping invalid characters from UTF-16 strings"
url:
  - https://mnaoumov.wordpress.com/2014/06/14/stripping-invalid-characters-from-utf-16-strings/
disabled rules:
  - yaml-title
---

# 2014-06-14 Stripping invalid characters from UTF-16 strings

Hi folks

The more you work with Unicode the more discoveries you can make.

.NET System.Char represents a character as a UTF-16 code unit.

[UTF-16](http://en.wikipedia.org/wiki/UTF-16) has a concept of surrogates:

Characters from U+D800 to U+DBFF - lead surrogate aka first code unit aka high surrogate

Characters from U+DC00 to U+DFFF - tail surrogate aka second code unit aka low surrogate

To form a valid Unicode code point, lead surrogate should be always followed by tail surrogate.

Though, this rule is not enforced by .NET. You can create a string which is not valid from the UTF-16 point of view.

For example

```csharp
string s = "a\ud800b";
```

here **\ud800** is lead surrogate but it is followed by **b** letter which is not a low surrogate.

This string is not a valid Unicode string and this may cause some issues.

For example

```csharp
s.Normalize();
```

fails with

```
System.ArgumentException: Invalid Unicode code point found at index 2.
Parameter name: strInput
```

If we store such string into the file, some text editors can fail on the file open.

So I think if we got a string from an unreliable source we may want to strip the incorrect symbols.

[There](http://stackoverflow.com/questions/8767103/how-to-remove-invalid-code-points-from-a-string) are some approaches but I would like to suggest another one based on Regex.

We will use negative lookahead and lookbehinds: find lead surrogates that are not followed by tail surrogate and also find tail surrogate that are not led by lead surrogates

```csharp
public static string StripInvalidUnicodeCharacters(string str)
{
    var invalidCharactersRegex = new Regex("([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
    return invalidCharactersRegex.Replace(str, "");
}
```
