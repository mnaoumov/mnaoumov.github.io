---
description: Explores PowerShell name collisions between XML attributes and .NET properties, and how PSBase and PSObject.Members resolve them.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[xml](<../Tags/xml.md>)"
pubDatetime: 2013-07-23T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Name collisions, PSBase and other mad PowerShell internals"
url:
  - https://mnaoumov.wordpress.com/2013/07/23/name-collisions-psbase-and-other-mad-powershell-internals/
disabled rules:
  - yaml-title
---

# 2013-07-23 Name collisions, PSBase and other mad PowerShell internals

Sometimes, we can discover name collisions in PowerShell

Consider example

```powershell
$xml1 = [xml] "<tag />"
$xml2 = [xml] "<tag name='attributeValue' />"
```

When we call

```powershell
$xml1.tag.Name
```

we get **tag**

but when we call

```powershell
$xml2.tag.Name
```

we get **attributeValue**

That's happened because of the name collision **XmlNode.Name** property vs automatic NoteProperty **name** constructed from the attributes

So the question is how to get **tag** name from $xml2 as well. It took me about 15 minutes to find the answer when similar issue occurred in one of our deployment scripts.

I don't want to just show the answer, I want to discuss the way I discovered it. BTW, I could not find anything useful in Google or StackOverflow. You're more than welcome to point me if you can find anything else instead of this blogpost :)

So let's start from

```powershell
$xml2.tag | Get-Member -Force
```

It has many hidden members that's visible only because of the **\-Force** parameter

We can see that we have method called **get_Name**, and as we can easily guess, all the properties always come with **get_Property** and **set_Property** methods

So if we call

```powershell
$xml2.tag.get_Name()
```

we will get expected result **tag**

Besides that, when I was looking into output of **Get-Member -Force** I found some interesting properties like PSBase, according to [Get-Member documentation](http://technet.microsoft.com/en-us/library/hh849928.aspx):

> PSBase: The original properties of the .NET Framework object without extension or adaptation. These are the properties defined for the object class and listed in MSDN.

So alternative solution will be

```powershell
$xml2.tag.PSBase.Name
```

Let's consider more complex synthetic case

```powershell
$xml3 = [xml] "<tag psbase='attributeValue' />"
```

How can we retrieve value for **psbase** attribute?

Naive approach

```powershell
$xml3.tag.psbase
```

won't work, because of the another collision, PSBase is a special property.

Well, we can use attribute approach

For PowerShell 3 we can use

```powershell
$xml3.tag.Attributes["psbase"].Value
```

works as expected

But this won't work in PowerShell 2

```
[ : Unable to index into an object of type System.Xml.XmlAttributeCollection.
At line:1 char:22
+ $xml3.tag.Attributes[ <<<< "psbase"].Value
    + CategoryInfo          : InvalidOperation: (psbase:String) [], RuntimeException
    + FullyQualifiedErrorId : CannotIndex
```

and we will do this in more complex way

```powershell
($xml3.tag.Attributes | Where-Object { $_.Name -eq "psbase" }).Value
```

Or we can have some tricky code which doesn't require to know that we deal with XmlNode.

In order to test that I tried different approaches

I tried

```powershell
New-Object PSObject -Property @{ psbase = "abc" }
```

but this fails with

```
New-Object : The member name "psbase" is reserved.
At line:1 char:11
+ New-Object <<<<  PSObject -Property @{ psbase = "abc" }
    + CategoryInfo          : NotSpecified: (:) [New-Object], ExtendedTypeSystemException
    + FullyQualifiedErrorId : PSObjectMembersMembersAddReservedName,Microsoft.PowerShell.Commands.NewObjectCommand
```

Then I ended up with another synthetic example

```powershell
Add-Type -TypeDefinition "public class MyTest { public string psbase = `"abc`"; }"
$x = New-Object MyTest
```

**\$x.psbase** does not return what we want to get (**abc**)

Note, that I used public field instead of property. Otherwise we could use **get_psbase** approach

That's tricky one.

And the solution I found is

```powershell
($x.PSObject.Members | Where-Object { $_.Name -eq "psbase" }).Value
```

returns **abc** as expected

Similarly, for XmlNode this also works.

```powershell
($xml3.tag.PSObject.Members | Where-Object { $_.Name -eq "psbase" }).Value
```

Another approach for $x is to use reflection

```powershell
$x.GetType().GetField("psbase").GetValue($x)
```

We could use reflection because it is a fair property of the object.

I could not invent the example which would have only NoteProperty named **psbase**. For this case reflection won't work and only approach with PSObject.Members will work there.

I know this all is weird, but if you understand that, you will have better understanding of some PowerShell hidden traps.

Please send me more weird things if you know any…

Stay tuned
