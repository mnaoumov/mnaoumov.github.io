---
description: Working around SSMS truncation of nvarchar(max) strings during concatenation and result copying via FOR XML PATH.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[sql-server](<../Tags/sql-server.md>)"
  - "[ssms](<../Tags/ssms.md>)"
  - "[sql](<../Tags/sql.md>)"
pubDatetime: 2015-02-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "SQL Server Management Studio and very large strings"
url:
  - https://mnaoumov.wordpress.com/2015/02/18/sql-server-management-studio-and-very-large-strings/
disabled rules:
  - yaml-title
---

# 2015-02-18 SQL Server Management Studio and very large strings

Hi folks

When you want to work with very large strings within SQL Server Management Studio you may suddenly discover some inconvenient limitations.

They described in details: [http://stackoverflow.com/questions/4833549/nvarcharmax-still-being-truncated](http://stackoverflow.com/questions/4833549/nvarcharmax-still-being-truncated) and [http://stackoverflow.com/questions/12639948/sql-nvarchar-and-varchar-limits](http://stackoverflow.com/questions/12639948/sql-nvarchar-and-varchar-limits)

See the most important parts from these articles below.

Many of those limitations include length 4000 so we'll heavily use it in our examples Consider the following sql script

```sql
DECLARE @str nvarchar(max)
SET @str = REPLICATE('A', 4000) + REPLICATE('B', 4000) + REPLICATE('C', 4000)
PRINT LEN(@str)
```

You'd expect to get 12000 as a result, but the actual result is 8000 instead. The reason for that is in the limitations mentioned on the links above. Actually it has a simple workaround.

```sql
DECLARE @str nvarchar(max)
SET @str = ''
SET @str = @str + REPLICATE('A', 4000) + REPLICATE('B', 4000) + REPLICATE('C', 4000)
PRINT LEN(@str)
```

This returns 12000 as expected.

The secret here is to put nvarchar(max) as a first argument in concatenation.

Alternatively, we can use

```sql
DECLARE @str nvarchar(max)
SET @str = CONVERT(nvarchar(max), '') + REPLICATE('A', 4000) + REPLICATE('B', 4000) + REPLICATE('C', 4000)
PRINT LEN(@str)
```

This also gives 12000 characters

I would recommend to use this trick whenever you construct long strings in sql such as dynamic sql queries. I personally had some data truncated and that's how I discovered this issue.

Another problem is how to get a long string value from the database

Consider

```sql
DECLARE @str nvarchar(max)
SET @str = CONVERT(nvarchar(max), '') + REPLICATE('A', 4000) + REPLICATE('B', 4000) + REPLICATE('D', 4000) + REPLICATE('E', 4000) + REPLICATE('F', 4000) + REPLICATE('G', 4000) + REPLICATE('H', 4000) + REPLICATE('I', 4000) + REPLICATE('J', 4000) + REPLICATE('K', 4000) + REPLICATE('L', 4000) + REPLICATE('M', 4000)

PRINT LEN(@str)
SELECT @str
```

We can see that LEN returned 48000 as expected.

However, if we copy the value from the result table and insert it into any text editor, we'll get only 43679 characters ending with L so we've lost 4321 characters truncated including 321 L's and 4000 M's.

Now the question is how to get the whole string

And the answer is tricky

```sql
SELECT @str AS [processing-instruction(blah)] FOR XML PATH
```

This would convert your string to xml and when you click on it you can copy it fully.

This **processing-instruction** trick allows to get the string without any xml escaping such as &amp;, &lt;, &gt;, etc. Obviously **blah** part can be replaced with anything.

This solution would work in 99.9% of cases. The only problem if your string contains **?>** part, as this easily breaks the parser.

The easiest way to break it is

```sql
SELECT '?><' AS [processing-instruction(blah)] FOR XML PATH
```

Try it and see what happens ;)

So in case when your string contains **?>** you have to use escaped form

```sql
SELECT @str FOR XML PATH
```

and then unescape it manually after you copied the text.

Stay tuned
