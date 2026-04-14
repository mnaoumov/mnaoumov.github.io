---
description: ApexSQL Refactor is a highly configurable SQL formatter for SSMS, with a known bug that can incorrectly move SELECT statements inside IF blocks.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[sql](<../Tags/sql.md>)"
  - "[ssms](<../Tags/ssms.md>)"
  - "[tools](<../Tags/tools.md>)"
  - "[sql-server](<../Tags/sql-server.md>)"
pubDatetime: 2016-12-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "My new favorite SQL toy - ApexSQL Refactor"
url:
  - https://mnaoumov.wordpress.com/2016/12/20/my-new-favorite-sql-toy-apexsql-refactor/
disabled rules:
  - yaml-title
---

# 2016-12-20 My new favorite SQL toy - ApexSQL Refactor

Hi folks

A while ago I've had a [blogpost](<./2015-09-14 Perfectionist's hell or SQL formatting.md>) about how I suffer working with unformatted SQLs.

Sometimes ago I found the tool the suits me the most - [ApexSQL Refactor](http://www.apexsql.com/sql_tools_refactor.aspx) . It has a lot of settings, much more than all competitors I've tried before. I've managed to configure it to produce results that annoy me as little as possible. My settings can be [downloaded](https://raw.githubusercontent.com/mnaoumov/settings/master/ApexSQLRefactorFormattingSettings.xml) and imported. It still has some shortcomings and hopefully they will add more features in future versions.

There are a few gotchas here though. On my current project I have to use SQL Server 2008 R2 and I kept installing this exactly version just to ensure we're not using features from newer versions. Actually we are lucky, as before we had to support SQL Server 2005 which had even more limitations.

But recently ApexSQL Refactor dropped support for the SQL Server Management Studio older than 2012, and I was not able to download the latest version that still supports SSMS 2008. I've written to the tech support team and they were kind enough to send me the [link](http://apexsql.com/patches/new/ApexSQLRefactor2016030091.exe) for the version that works with SSMS 2008

Recently I've scripted and reformatted every single object from the database. Then we discovered some strange behavior in the system we are working on. After some investigation I found that actually the formatter caused it! Reformatter broke the logic.

So the problem is the following

Let's reformat the following [script](http://docs.imis.com/15.1/Schema/Programmability/Stored_Procedures/aspnet_PersonalizationPerUser_GetPageSettings.html)

If you do that you'll see that

```sql
IF (@@ROWCOUNT = 0) -- Username not found RETURN

SELECT p.PageSettings FROM dbo.aspnet_PersonalizationPerUser p WHERE p.PathId = @PathId AND p.UserId = @UserId
```

is formatted as

```sql
IF (@@ROWCOUNT = 0) -- Username not found BEGIN RETURN SELECT p.PageSettings FROM dbo.aspnet_PersonalizationPerUser p WHERE p.PathId = @PathId AND p.UserId = @UserId; END;
```

So SELECT moved from outside IF block inside it, which actually causes the problem.

But the code itself is very easy to fix, just move SELECTs out of IFs. It won't break it again on the next reformatting because of the BEGIN/END blocks.

I've already written an email tech support team and they said they will reply to me shortly.

But even with this bug, I am in love with the tool!

Stay tuned!
