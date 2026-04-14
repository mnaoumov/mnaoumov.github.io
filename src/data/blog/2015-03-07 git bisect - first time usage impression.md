---
description: First hands-on experience with git bisect to locate a regression in an ASP.NET WebForms GridView rendering bug.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[aspnet](<../Tags/aspnet.md>)"
pubDatetime: 2015-03-07T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "git bisect - first time usage impression"
url:
  - https://mnaoumov.wordpress.com/2015/03/07/git-bisect-first-time-usage-impression/
disabled rules:
  - yaml-title
---

# 2015-03-07 git bisect - first time usage impression

Hi folks

I am a big fan of git and of course I read a lot of [git bisect](http://git-scm.com/docs/git-bisect) but I have never used it before. I just simply did not need it. I could always find a bug using debugger, git blame, git log etc.

But recently I ended up with the situation which I would like to share with you.

I was working on a certain feature in a separate branch **myfeature** for quite a while. I am constantly merging **master** branch into **myfeature**.

Then I found a weird bug which I tried to debug but I could not find the root cause of it. It was failing straight after login inside .NET Framework internal code during rendering phase and did not have any user code in the call stack.

The exception was

```
The table must contain row sections in order of header, body, then footer.
```

I did not touch any table recently! What a heck?!

I had absolutely no idea what is the problem. When did it occur? And how could I continue working without noticing before?

I could not find anything relevant in my git log. So I had to use something else. And this time I tried **git bisect**.

I just said

```
git bisect start
git bisect bad myfeature
git bisect good master
```

Then it replied that there are 196 commits in difference and it would require ~8 steps to determine what is the problem.

And yes! It is true!

It checked out a middle commit and asked is it good or bad? I compiled the code, ran the website and was checking if the exception occurs or not.

And really after the 8th step we pointed to the single commit and git said that is the commit after which the issue occurred. And once I get this commit, I understood the problem immediately. The good thing that I am keeping atomic commits so that found commit had only one simple change with one simple purpose.

I've got a very positive experience with **git bisect**. I think it is an excellent tool to catch an unexplainable bugs.

Stay tuned!

P.S. In case if you are curious what was the problem exactly… I am working on one legacy ASP.NET WebForms project. And I've got a requirement to ensure that GridViews render thead, tbody and tfooter sections. Inspired by the following article http://stackoverflow.com/questions/309101/how-do-i-get-gridview-to-render-thead I've added the following code

```csharp
protected override void OnPreRender(EventArgs e)
{
    if (ShowHeader && Rows.Count > 0 || ShowHeaderWhenEmpty)
        HeaderRow.TableSection = TableRowSection.TableHeader;
    if (ShowFooter && Rows.Count > 0)
        FooterRow.TableSection = TableRowSection.TableFooter;
    base.OnPreRender(e);
}
```

And after I found this commit (thanks to bisect), I fixed it in the following way

```csharp
protected override void OnPreRender(EventArgs e)
{
    if (ShowHeader && Rows.Count > 0 || ShowHeaderWhenEmpty)
    {
        HeaderRow.TableSection = TableRowSection.TableHeader;
        if (TopPagerRow != null)
            TopPagerRow.TableSection = TableRowSection.TableHeader;
    }
    if (ShowFooter && Rows.Count > 0)
    {
        FooterRow.TableSection = TableRowSection.TableFooter;
        if (BottomPagerRow != null)
            BottomPagerRow.TableSection = TableRowSection.TableFooter;
    }
    base.OnPreRender(e);
}
```

When you know the answer you can ask your question much more accurately. But I could not know that the issue is somehow related to the pager. Especially if I never touched those pagers.

Later on I found an article http://stackoverflow.com/questions/19158514/gridview-adding-header-row-in-code-part-2 that might help me if I would find it before.

This reminds me a sci-fi story [Robert Sheckley - Ask A Foolish Question](http://www.readbookonline.net/readOnLine/63673/) :)

Stay tuned!
