---
description: "C# CLR limitation prevents generic types from deriving from Attribute, causing a CS0698 compile error."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[attributes](<../Tags/attributes.md>)"
pubDatetime: 2012-09-24T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "WTF Generic attributes in C_"
url:
  - https://mnaoumov.wordpress.com/2012/09/24/wtf-generic-attributes-in-c/
disabled rules:
  - yaml-title
---

# 2012-09-24 WTF Generic attributes in C_

I have got another WTF just now.

I wrote a nice base class

```csharp
 public abstract class ExceptionFilterBase<TException> : FilterAttribute, IExceptionFilter where TException : Exception { ... }
```

And when I tried to compile it I have got compilation error

> CS0698: A generic type cannot derive from 'FilterAttribute' because it is an attribute class

What?! Why?! What's wrong with it?

Later I [found](http://social.msdn.microsoft.com/forums/en-US/csharplanguage/thread/67fd5daf-5542-463d-9c47-2240b941399c/) that it is some CLR limitation.

Very annoying :(

[Another annoyances](http://lostechies.com/jimmybogard/2008/12/12/more-c-attribute-annoyances/)
