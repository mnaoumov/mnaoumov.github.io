---
description: Adding a $LastResult automatic variable to PowerShell by wrapping Out-Default to store the last pipeline output.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[scripting](<../Tags/scripting.md>)"
  - "[repl](<../Tags/repl.md>)"
pubDatetime: 2015-01-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "PowerShell auto variable $LastResult"
url:
  - https://mnaoumov.wordpress.com/2015/01/11/powershell-auto-variable-lastresult/
disabled rules:
  - yaml-title
---

# 2015-01-10 PowerShell auto variable $LastResult

Hi folks

If you work a lot with PowerShell you may have had the cases when you tried something and then you want to save it to the variable.

```powershell
> 2 + 2 # what if that is a long running script?
4
> # Oh, I forgot that I have to save it to the variable
> $myVariable = 2 + 2 # long running script again?!
```

Many REPLs has a concept of last result variable but not PowerShell, unfortunately.

Here are some resources that I've used

http://stackoverflow.com/questions/14351018/powershell-is-there-an-automatic-variable-for-the-last-execution-result

http://dmitrysotnikov.files.wordpress.com/2011/09/scripts-tec-2011-jeffrey-snover-proxy-functions.pdf

http://get-powershell.com/post/2008/06/25/Stuffing-the-output-of-the-last-command-into-an-automatic-variable.aspx

http://poshcode.org/803

But all these ideas had some shortcomings so I decided to implement a fully working version of it.

It bases on the idea that last step of the pipeline is cmdlet **Out-Default** so we'll modify it to store the result in our auto variable.

You can look through the history of commits to and tests I've written to see why my solution is more advanced than all others: https://github.com/mnaoumov/Add-GlobalResult

Here is the final code

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
    [switch] $Install
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

trap { throw $Error[0] }

if ($Install)
{
    if (-not (Test-Path $PROFILE))
    {
        New-Item -Path $PROFILE -ItemType File -Force | Out-Null
    }

    $profileDir = $PROFILE | Split-Path

    Copy-Item -Path "$(PSScriptRoot)\Add-GlobalLast.ps1" -Destination $profileDir -Force

    $installLine = ". `"$profileDir\Add-GlobalLast.ps1`""

    if (-not (Get-Content -Path $PROFILE | Where-Object -FilterScrip{ $_ -eq $installLine }))
    {
        Add-Content -Path $PROFILE -Value $installLine
    }

    . $PROFILE

    return
}

function Generate-CmdletWrapper
{
    param
    (
        [string] $CmdletName,
        [ScriptBlock] $Begin,
        [ScriptBlock] $Process,
        [ScriptBlock] $End
    )

    $command = Get-Command -Name $CmdletName -CommandType Cmdlet
    $metadata = New-Object -TypeName System.Management.Automation.CommandMetaData -ArgumentList @($command)

    $functionText = [System.Management.Automation.ProxyCommand]::Create($metadata)
    $functionText = $functionText -replace "begin\s*\{\s*try\s*\{", ("`$0`n" + ("$Begin" -replace '\$', '$$$$'))
    $functionText = $functionText -replace "process\s*\{\s*try\s*\{", ("`$0`n" + ("$Process" -replace '\$', '$$$$'))
    $functionText = $functionText -replace "end\s*\{\s*try\s*\{", ("`$0`n" + ("$End" -replace '\$', '$$$$'))

    Set-Item -Path "Function:Global:$CmdletName" -Value $functionText
}

Get-Command -Verb Format -Module Microsoft.PowerShell.Utility | `
    Select -ExpandProperty Name | `
    ForEach-Object -Process `
        {
            Generate-CmdletWrapper `
                -CmdletName $_ `
                -Begin `
                    {
                        $tempLast = @()
                    } `
                -Process `
                    {
                        $tempLast += @(, $_)
                    } `
                -End `
                    {
                        if ($tempLast.Length -eq 1)
                        {
                            $Global:LastResult = $tempLast[0]
                        }
                        else
                        {
                            $Global:LastResult = $tempLast
                        }

                        $Global:LastResultCmdletWasFormat = $true
                    }
        }

Generate-CmdletWrapper `
    -CmdletName Out-Default `
    -Begin `
        {
            $tempLast = @()
        } `
    -Process `
        {
            $tempLast += @(, $_)
        } `
    -End `
        {
            if ((Test-Path Variable:Global:LastResultCmdletWasFormat) -and ($Global:LastResultCmdletWasFormat))
            {
                $Global:LastResultCmdletWasFormat = $false
            }
            elseif ($tempLast.Length -eq 1)
            {
                $Global:LastResult = $tempLast[0]
            }
            else
            {
                $Global:LastResult = $tempLast
            }
        }
```

NOTE: One big issue I have which I could not solve. This solution does not work with external commands

```powershell
> cmd /c "echo hello"
hello
> $LastResult
> \#nothing returned
```

even with

```powershell
> cmd /c "echo hello" | Out-Default
hello
> $LastResult
> \#nothing returned
```

I don't have any ideas how to fix it and waiting for your ideas ;)

Stay tuned!
