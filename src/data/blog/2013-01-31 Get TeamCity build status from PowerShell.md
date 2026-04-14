---
description: PowerShell function to query TeamCity REST API and detect broken builds, including currently running ones.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[teamcity](<../Tags/teamcity.md>)"
  - "[ci-cd](<../Tags/ci-cd.md>)"
  - "[rest-api](<../Tags/rest-api.md>)"
pubDatetime: 2013-01-31T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "Get TeamCity build status from PowerShell"
url:
  - https://mnaoumov.wordpress.com/2013/01/31/get-teamcity-build-status-from-powershell/
disabled rules:
  - yaml-title
---

# 2013-01-31 Get TeamCity build status from PowerShell

TeamCity has REST api, so it is pretty easy to get the build status from PowerShell.

The function implemented with earliest failure detection: build will be considered as broken if either it has been completed as broken or currently running is broken.

```powershell
function Test-TeamCityBuildStatus
{
    param
    (
        [string] $ServerUrl,
        [string] $UserName,
        [string] $Password,
        [string] $BuildTypeId
    )

    try
    {
        $client = New-Object System.Net.WebClient
        $client.Credentials = New-Object System.Net.NetworkCredential $UserName, $Password

        $url = "$ServerUrl/httpAuth/app/rest/buildTypes/id:$BuildTypeId/builds/canceled:false/status"

        $status = $client.DownloadString($url)

        if ($status -ne "SUCCESS")
        {
            return $false
        }
        else
        {
            $url = "$ServerUrl/httpAuth/app/rest/buildTypes/id:$buildTypeId/builds/canceled:false,running:any/status"
            $status = $client.DownloadString($url)
            $status -eq "SUCCESS"
        }
    }
    catch
    {
        return $null
    }
}
```
