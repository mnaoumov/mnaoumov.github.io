---
description: A PowerShell wrapper for sqlcmd that maps batch-relative error line numbers back to the real script line.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[sql-server](<../Tags/sql-server.md>)"
  - "[sqlcmd](<../Tags/sqlcmd.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[debugging](<../Tags/debugging.md>)"
pubDatetime: 2015-01-06T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "sqlcmd - Get real sql error line number"
url:
  - https://mnaoumov.wordpress.com/2015/01/06/sqlcmd-get-real-sql-error-line-number/
disabled rules:
  - yaml-title
---

# 2015-01-06 sqlcmd - Get real sql error line number

Hi folks

Consider the following sql script

```sql
:ON ERROR EXIT

PRINT 'Line 3'
GO

PRINT 'Line 6'
GO

SELECT * FROM NonExistingTable
GO

PRINT 'Line 12' GO
```

When you run with SQLCMD

```
> sqlcmd -i MyScript.sql
Line 3
Line 6
Msg 208, Level 16, State 1, Server MyServer, Line 2
Invalid object name 'NonExistingTable'.
```

When you run in SQL Server Management Studio with SQLCMD Mode enabled you get

```
Line 3
Line 6
Msg 208, Level 16, State 1, Server MyServer, Line 2
Invalid object name 'NonExistingTable'.

** An error was encountered during execution of batch. Exiting.
```

But when you double click on the error line the query editor will jump to the problematic line.

Reported **Line 2** means a line number relative to the batch. Batches are separated by GO statement. We want to get a real **Line 9** answer.

I've also tried PowerShell's **Invoke-Sqlcmd** but it is even worse, since it does not detect such errors at all (http://stackoverflow.com/questions/23471600/error-detection-from-powershell-invoke-sqlcmd-not-always-working).

I raised a question on stackoverflow: http://stackoverflow.com/questions/27785390/get-real-sql-error-line-number

I decided to implement the wrapper script myself. Here is my solution repo: https://github.com/mnaoumov/Invoke-SqlcmdEx

Initially I thought of using ADO.NET **SqlCommand** approach to run individual batches manually. But then I realized that **SqlCommand** does not support SQLCMD script features. I found a project https://github.com/rusanu/DbUtilSqlCmd which tries to run SQLCMD scripts with **SqlCommand** but I decided not to follow that way.

Then I thought of running sqlcmd for individual batches but it is not the right approach because different sqlcmd instances create different transactions so this approach would not work correctly with script with transactions like

```
BEGIN TRANSACTION
GO

DROP TABLE MyTable
GO

ROLLBACK TRANSACTION
GO
```

So the only way I found is to keep the script as one file and perform only one sqlcmd call. However I inserted helper PRINT messages to record the offset of the batch in the whole script file and then parsing the results

And now

```
> .\Invoke-SqlcmdEx.ps1 -InputFile .\MyScript.sql
Line 3
Line 6
Msg 208, Level 16, State 1, Server MyServer, Script .\MyScript.ps1, Line 9
Invalid object name 'NonExistingTable'.

sqlcmd failed for script .\MyScript.ps1 with exit code 1
At C:\Dev\Invoke-SqlcmdEx\Invoke-SqlcmdEx.ps1:77 char:18
+             throw <<<<  "sqlcmd failed for script $InputFile with exit code $LASTEXITCODE"
    + CategoryInfo          : OperationStopped: (sqlcmd failed f...ith exit code 1:String) [], RuntimeException
    + FullyQualifiedErrorId : sqlcmd failed for script .\MyScript.ps1 with exit code 1
```

And it has a proper **Line 9** output

Here is the solution:

**Invoke-SqlcmdEx.ps1**

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
    [string] $ServerInstance = ".",
    [string] $Database = "master",
    [string] $User,
    [string] $Password,

    [Parameter(Mandatory = $true)]
    [string] $InputFile
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

trap { throw $Error[0] }

function Main
{
    if (-not (Get-Command -Name sqlcmd.exe -ErrorAction SilentlyContinue))
    {
        throw "sqlcmd.exe not found"
    }

    $scriptLines = Get-Content -Path $InputFile
    $extendedLines = @()

    $offset = 0
    foreach ($line in $scriptLines)
    {
        $offset++
        if ($line -match "^\s*GO\s*$")
        {
            $extendedLines += `
                @(
                    "GO",
                    "PRINT '~~~ Invoke-SqlcmdEx Helper - Offset $offset'"
                )
        }

        $extendedLines += $line
    }

    $tempFile = [System.IO.Path]::GetTempFileName()

    try
    {
        $extendedLines > $tempFile

        $sqlCmdArguments = Get-SqlCmdArguments

        $ErrorActionPreference = "Continue"
        $result = sqlcmd.exe $sqlCmdArguments -i $tempFile 2>&1
        $ErrorActionPreference = "Stop"

        $offset = 0
        $result | ForEach-Object -Process `
            {
                $line = "$_"
                if ($line -match "~~~ Invoke-SqlcmdEx Helper - Offset (?<Offset>\d+)")
                {
                    $offset = [int] $Matches.Offset
                }
                elseif (($_ -is [System.Management.Automation.ErrorRecord]) -and ($line -match "Line (?<ErrorLine>\d+)$"))
                {
                    $errorLine = [int] $Matches.ErrorLine
                    $realErrorLine = $offset + $errorLine
                    $line -replace "Line \d+$", "Script $InputFile, Line $realErrorLine"
                }
                else
                {
                    $line
                }
            }

        if ($LASTEXITCODE -ne 0)
        {
            throw "sqlcmd failed for script $InputFile with exit code $LASTEXITCODE"
        }
    }
    finally
    {
        Remove-Item -Path $tempFile -ErrorAction SilentlyContinue
    }
}

function Get-SqlCmdArguments
{
    $sqlCmdArguments = `
        @(
            "-S",
            $ServerInstance,
            "-d",
            $Database,
            "-b",
            "-r",
            0
        )

    if ($User)
    {
        $sqlCmdArguments += `
            @(
                "-U",
                $User,
                "-P",
                $Password
            )
    }
    else
    {
        $sqlCmdArguments += "-E"
    }

    $sqlCmdArguments
}

Main
```

Please stay tuned.
