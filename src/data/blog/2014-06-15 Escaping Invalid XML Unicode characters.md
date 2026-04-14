---
description: Step-by-step derivation of a C# regex to strip or escape characters invalid in XML, handling UTF-16 surrogate pairs correctly.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[xml](<../Tags/xml.md>)"
  - "[unicode](<../Tags/unicode.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[regex](<../Tags/regex.md>)"
  - "[encoding](<../Tags/encoding.md>)"
pubDatetime: 2014-06-15T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Escaping Invalid XML Unicode characters"
url:
  - https://mnaoumov.wordpress.com/2014/06/15/escaping-invalid-xml-unicode-characters/
disabled rules:
  - yaml-title
---

# 2014-06-15 Escaping Invalid XML Unicode characters

Hi folks

Recently I discovered a [bug](https://github.com/nunit/nunit-framework/issues/145) in NUnit

Basically the issue caused by the fact that NUnit may create a XmlDocument with Unicode characters that are not valid in XML.

To fix the issue we need to either strip those characters or maybe escape them

According to the [xml spec](http://www.w3.org/TR/xml/#charsets), the only valid XML characters:

```
#x9 | \#xA | \#xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
```

Let's construct a Regex to replace invalid xml characters

# First Naive Approach

```csharp
var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\U00010000-\U0010ffff]");
```

won't work because **\U00010000-\U0010ffff** represented as Unicode surrogate pairs and equivalent to **\ud800\udc00-\udbff\udff** and form an invalid Regex

All characters **\U00010000-\U0010ffff** ([Supplementary Planes](http://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B10000_to_U.2B10FFFF)) can be described as a Regex:

```csharp
var supplementaryPlanesRegex = new Regex("[\ud800-\udbff][\udc00-\udfff]");
```

According to the list of valid characters shown above, `[#xD800-#xDFFF]` are invalid XML characters. Taking into account Supplementary Planes, this means that we are interested in surrogate characters that don't form a valid surrogate pair.

In my previous [blogpost](<./2014-06-14 Stripping invalid characters from UTF-16 strings.md>) I described a Regex to match such characters.

```csharp
var invalidCharactersRegex = new Regex("([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
```

# Second Naive Approach

```csharp
var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd]|([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
```

This forms a valid Regex but this won't work correctly. It will match the string with valid Unicode code point **"\U00010000"** which is equivalnt to **"\ud800\udc00"** . The reason for that is the fact that these characters were matched by the first part of the Regex. We need to skip this by adding this range into Regex

# Third Approach

```csharp
var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ud7ff\ud800-\udfff\ue000-\ufffd]|([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
```

We can simplify it a bit by combining **\u0020-\ud7ff\ud800-\udfff\ue000-\ufffd**

# Final Approach

```csharp
var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ufffd]|([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
```

I checked and this Regex is really filtering only the characters from the spec.

And here is the final version of the desired methods

```csharp
public static string StripInvalidXmlCharacters(string str)
{
    var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ufffd]|([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
    return invalidXmlCharactersRegex.Replace(str, "");
}

public static string EscapeInvalidXmlCharacters(string str)
{
    var invalidXmlCharactersRegex = new Regex("[^\u0009\u000a\u000d\u0020-\ufffd]|([\ud800-\udbff](?![\udc00-\udfff]))|((?<![\ud800-\udbff])[\udc00-\udfff])");
    return invalidXmlCharactersRegex.Replace(str, match => CharToUnicodeSequence(match.Value[0]));
}

static string CharToUnicodeSequence(char symbol)
{
    return string.Format("\\u{0}", ((int) symbol).ToString("x4"));
}
```

**UPD:** As I was asked in a comment, I provide a positive regex for a valid xml characters

My first incorrect attempt was to simply negate the invalidXmlCharactersRegex by replacing negative group [^...] with positive group [...], and negative lookahead (?!...) with positive lookahed (?=...), and negative lookbehind (?<!...) with positive lookbehind (?<=...)

```csharp
var validXmlCharactersRegex = new Regex("[\u0009\u000a\u000d\u0020-\ufffd]|([\ud800-\udbff](?=[\udc00-\udfff]))|((?<=[\ud800-\udbff])[\udc00-\udfff])");
```

But this is wrong, because \u0020-\ufffd includes surrogate characters so it will false positively match the string

```csharp
string badString = "\ud800";
```

Here is the correct version of the regex

```csharp
var validXmlCharactersRegex = new Regex("[\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd]|([\ud800-\udbff](?=[\udc00-\udfff]))|((?<=[\ud800-\udbff])[\udc00-\udfff])");
```

**UPD2:** As I was asked in a comment, we can simplify the regex if we don't need to get individual codepoints.

```csharp
var validXmlCharactersRegex = new Regex("[\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd]|[\ud800-\udbff][\udc00-\udfff]");
```
