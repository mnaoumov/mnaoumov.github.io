---
description: "Two reusable C# IDictionary extension methods: GetValueOrDefault and GetOrAddValue with a factory function."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[collections](<../Tags/collections.md>)"
pubDatetime: 2012-09-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "Useful Dictionary extensions I am always using"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/useful-dictionary-extensions-i-am-always-using/
disabled rules:
  - yaml-title
---

# 2012-09-27 Useful Dictionary extensions I am always using

There are some of methods I am always creating from scratch for all projects I am working on

```csharp
public static TValue GetValueOrDefault<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue = default(TValue))
{
    if (dictionary == null)
        throw new ArgumentNullException("dictionary");

    TValue value;
    return dictionary.TryGetValue(key, out value) ? value : defaultValue;
}
```

```csharp
public static TValue GetOrAddValue<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, Func<TValue> valueFactory)
{
    if (dictionary == null)
        throw new ArgumentNullException("dictionary");

    TValue value;
    if (!dictionary.TryGetValue(key, out value))
    {
        value = valueFactory();
        dictionary[key] = value;
    }

    return value;
}
```
