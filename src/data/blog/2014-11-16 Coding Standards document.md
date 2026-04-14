---
description: A concise C# coding standards document with ReSharper configuration, covering access modifiers, var usage, and best practices.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[resharper](<../Tags/resharper.md>)"
  - "[code-style](<../Tags/code-style.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
pubDatetime: 2014-11-16T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Coding Standards document"
url:
  - https://mnaoumov.wordpress.com/2014/11/17/coding-standards-document/
disabled rules:
  - yaml-title
---

# 2014-11-16 Coding Standards document

Hi folks.

As a team lead I had to prepare a Coding Standards document.

I tried to find a template, but everything I found are very verbose and from my experience people rarely read such documents carefully.

So I've decided to build one from scratch. I wanted to provide examples of bad and good approaches whenever possible.

To keep the document short I've included my configuration file for ReSharper and did not include all zillions of the settings in the Coding Standards document, you can just import my settings and see them inside ReSharper settings window.

Here we are: https://github.com/mnaoumov/settings/blob/master/CodingStandards.md

I am willing to hear your opinion, especially if my "best practices" are not the best really. Or if you believe I am missing some important ones.

Alternatively you can make pull requests.

P.S. I used to have one "best practice" idea (inherited from Alexey Samokhin): omit **private** modifiers for class members and **internal** modifier for non-nested classes. The reason for that is that are modifiers by default anyway, why would we need to specify them… And I'd been using this idea for more than 2 years and had it in my ReSharper configuration. However, recently one of my colleagues (Sergey Hurko) convinced me that this idea actually makes code more difficult to read, because not all the developers know these default modifiers by heart.

The list http://stackoverflow.com/questions/2521459/what-are-the-default-access-modifiers-in-c looks really scaring.

I know all these rules by heart and they seem to be obvious for me but with the tears in my eyes I did agree that this "best practice" should not be imposed

**UPD**: Addressing **jonathanconway**'s comment… I did not specify anything about **var** rules in the document, because it is a part of the ReSharper Cleanup setting that I've created.

![resharper-var-setting.png](<./!!files/2014-11-16 Coding Standards document/resharper-var-setting.png>)

I tend to use **var** for non-trivial types, as I think it a little bit weird to write

```csharp
var i = 42;
var s = "abc";
```

I'd prefer

```csharp
int i = 42;
string s = "abc";
```

But again, that's just a matter of preference anyway :)
