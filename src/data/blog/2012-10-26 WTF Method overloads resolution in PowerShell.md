---
description: PowerShell resolves .NET method overloads differently from C#, causing unexpected method calls with bool arguments.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[bug](<../Tags/bug.md>)"
  - "[overload-resolution](<../Tags/overload-resolution.md>)"
pubDatetime: 2012-10-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:02-06:00
title: "WTF Method overloads resolution in PowerShell"
url:
  - https://mnaoumov.wordpress.com/2012/10/26/wtf-method-overloads-resolution-in-powershell/
disabled rules:
  - yaml-title
---

# 2012-10-26 WTF Method overloads resolution in PowerShell

I have got another WTF!

It seems that PowerShell method overload resolution system is not consistent with C#

Let's compare

C#

```csharp
class Program
{
    static void Main(string[] args)
    {
        MyClass.MyMethod(false, DateTime.Now);
    }
}

public static class MyClass
{
    public static void MyMethod(object obj, DateTime dateTime)
    {
        Console.WriteLine("MyClass.MyMethod(object obj, DateTime dateTime)");
    }

    public static void MyMethod(bool b, string str)
    {
        Console.WriteLine("MyClass.MyMethod(bool b, string str)");
    }
}
```

vs

PowerShell

```powershell
Add-Type `
@"
    using System;

    public static class MyClass
    {
        public static void MyMethod(object obj, DateTime dateTime)
        {
            Console.WriteLine("MyClass.MyMethod(object obj, DateTime dateTime)");
        }

        public static void MyMethod(bool b, string str)
        {
            Console.WriteLine("MyClass.MyMethod(bool b, string str)");
        }
    }
"@

[MyClass]::MyMethod($false, [DateTime]::Now)
```

C# will return

```bash
MyClass.MyMethod(object obj, DateTime dateTime)
```

How we expected

But PowerShell will return

```bash
MyClass.MyMethod(bool b, string str)
```

If we want to have the correct method called we have to be more explicit about overload we want to call

```powershell
[MyClass]::MyMethod([object] $false, [DateTime]::Now)
```

I found this issue very annoying

I had the following NUnit-like test in [PoshUnit](<./2012-10-18 PoshUnit.md>) which uses real NUnit behind the scenes

```powershell
$Assert::That($false, $Is::False)
```

And this test failed!!!

The reason is absolutely the same

**Assert.That** has a lot of overloads. With my code I expected

```csharp
 public static void That(object actual, IResolveConstraint expression)
```

but actually the following one was called

```csharp
 public static void That(bool condition, string message)
```

It is extremely annoying.

I think it is a bug in PowerShell, not a feature

UPD:

The code above was tested in PowerShell 3

In PowerShell 2 the situation is even worse. I could not find a way to call a proper overload

Even this one does not work

```bash
[MyClass]::MyMethod([object] $false, [DateTime] ([DateTime]::Now))
```

UPD:

Raised a question [http://stackoverflow.com/questions/13084176/powershell-method-overload-resolution-bug](http://stackoverflow.com/questions/13084176/powershell-method-overload-resolution-bug)

UPD: Raised bug for Microsoft [https://connect.microsoft.com/PowerShell/feedback/details/768901/powershell-method-overload-resolution](https://connect.microsoft.com/PowerShell/feedback/details/768901/powershell-method-overload-resolution)
