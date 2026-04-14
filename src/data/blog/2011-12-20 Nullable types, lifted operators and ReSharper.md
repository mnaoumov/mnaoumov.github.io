---
description: "Explains C# lifted operators with nullable types and a ReSharper false-positive bug when assigning nullable int to a class with implicit operator."
tagLinks:
  - "[migrated-from-blogger](<../Tags/migrated-from-blogger.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[resharper](<../Tags/resharper.md>)"
  - "[nullable-types](<../Tags/nullable-types.md>)"
pubDatetime: 2011-12-20T13:35:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:52-06:00
title: "Nullable types, lifted operators and ReSharper"
url:
  - https://mnaoumov.blogspot.com/2011/12/nullable-types-lifted-operators-and.html
disabled rules:
  - yaml-title
---

# 2011-12-20 Nullable types, lifted operators and ReSharper

Recently I investigated why ReSharper marks some pieces of my project code as invalid however compiler does not throw any errors.  

Finally I narrowed down the problem.  

```csharp
class Program  
{  
    static void Main(string\[\] args)  
    {  
       int? i = 10;  

       A a = i;  
    }  

    class A  
    {  
      A(int i)  
      {  
        Value = i;  
      }  

      public int Value { get; private set; }  

      public static implicit operator A(int i)  
      {  
        return new A(i);  
      }  
    }  
}  
```  

ReSharper highlights an error on line 7. However as you can imagine on a runtime corresponding implicit operator is called.  

I investigated this behaviour and found that actually it is according to the C# spec  

> Nullable conversions and lifted conversions permit predefined and user-defin ed conversions that operate on non-nullable value types also to be used with nullable forms of those types. Likewise, lifted operators permit predefined and user-defined operators that work for non-nullable value types also to work for nullable forms of those types.  
> For every predefined conversion from a non-nullable value type S to a non-nullable value type T , a predefined nullable conversion automatically exists from S? to T?. This nullable conversion is a null propagating form of the underlying conversion: It converts a null source value directly to a null target value, but otherwise performs the underlying non-nullable co nversion. Nullable conversions are furthermore provided from S to T? and from S? to T , the latter as an explicit conversion that throws an exception if the source value is null.  

So finally I know that it is a ReSharper bug and I will report it on their bug-tracker system.  

Potentially it is a good question for juniors on interviews :)  

UPD: Raised bug on ReSharper bug tracker  

[http://youtrack.jetbrains.net/issue/RSRP-287221?projectKey=RSRP&query=lifted](http://youtrack.jetbrains.net/issue/RSRP-287221?projectKey=RSRP&query=lifted)
