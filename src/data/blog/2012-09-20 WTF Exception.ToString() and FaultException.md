---
description: "FaultException inner details are silently dropped by Exception.ToString(); an extension method restores the full fault message."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[wcf](<../Tags/wcf.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[exception-handling](<../Tags/exception-handling.md>)"
pubDatetime: 2012-09-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "WTF Exception.ToString() and FaultException"
url:
  - https://mnaoumov.wordpress.com/2012/09/21/wtf-exception-tostring-and-faultexception/
disabled rules:
  - yaml-title
---

# 2012-09-20 WTF Exception.ToString() and FaultException

Today I've got another WTF. I found that inner fault exception is not included into outerException.ToString()

```csharp
 try
{
    try
    {
        throw new Exception("Very important inner exception");
    }
    catch (Exception innerException)
    {
        var faultException = new FaultException<Exception>(innerException, new FaultReason("Some reason"));
        throw new Exception("Outer exception", faultException);
    }
}
catch (Exception outerException)
{
    Console.WriteLine(outerException.ToString());
}
```

And the output is

```
System.Exception: Outer exception ---> System.ServiceModel.FaultException`1[System.Exception]: Some reason
   --- End of inner exception stack trace ---
   at ConsoleApplication2.Program.Main(String[] args) in c:\Users\Michael\Documents\Visual Studio 2012\Projects\ConsoleApplication2\ConsoleApplication2\Program.cs:line 23
```

You can see that inner exception message was not passed to the output.

However if you call

```csharp
outerException.InnerException.ToString()
```

you will get fault details with inner exception

```
System.ServiceModel.FaultException`1[System.Exception]: Some reason (Fault Detail is equal to System.Exception: Very important inner exception
   at ConsoleApplication2.Program.Main(String[] args) in c:\Users\Michael\Documents\Visual Studio 2012\Projects\ConsoleApplication2\ConsoleApplication2\Program.cs:line 18).
```

This behavior is very bad. In our current project we have such situation all the time and our Error page is absolutely useless because this important InnerExceptions are being trimmed.

To fix the issue I had to create an extension method

```csharp
 public static string ToStringWithFaultDetails(this Exception exception)
{
    if (exception == null)
        return "";

    var sb = new StringBuilder();
    sb.AppendLine(exception.ToString());

    var innerException = exception.InnerException;

    while (innerException != null)
    {
        var faultException = innerException as FaultException;
        if (faultException != null)
        {
            sb.AppendLine(string.Format("{0}Inner Fault Exception: {0}{1}", System.Environment.NewLine, faultException.ToStringWithFaultDetails()));
            break;
        }

        innerException = innerException.InnerException;
    }

    return sb.ToString();
}
```

If we now modify first program and change line \#15

```csharp
 Console.WriteLine(outerException.ToStringWithFaultDetails());
```

We will not lose inner exception.

```
System.Exception: Outer exception ---> System.ServiceModel.FaultException`1[System.Exception]: Some reason
   --- End of inner exception stack trace ---
   at ConsoleApplication2.Program.Main(String[] args) in c:\Users\Michael\Documents\Visual Studio 2012\Projects\ConsoleApplication2\ConsoleApplication2\Program.cs:line 23

Inner Fault Exception: 
System.ServiceModel.FaultException`1[System.Exception]: Some reason (Fault Detail is equal to System.Exception: Very important inner exception
   at ConsoleApplication2.Program.Main(String[] args) in c:\Users\Michael\Documents\Visual Studio 2012\Projects\ConsoleApplication2\ConsoleApplication2\Program.cs:line 18).
```
