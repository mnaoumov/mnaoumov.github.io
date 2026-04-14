---
description: Chunk-based Base64 file conversion in PowerShell that avoids loading the entire file into memory for large files.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[base64](<../Tags/base64.md>)"
  - "[file-io](<../Tags/file-io.md>)"
pubDatetime: 2013-08-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "Efficient Base64 conversion in PowerShell"
url:
  - https://mnaoumov.wordpress.com/2013/08/20/efficient-base64-conversion-in-powershell/
disabled rules:
  - yaml-title
---

# 2013-08-20 Efficient Base64 conversion in PowerShell

In one of my previous [blogpost](<./2013-06-19 How to reach unreachable or copy files to RDP.md>) I was converting binary files to/from base64

I used naive straightforward approach

```powershell
[Convert]::ToBase64String($bytes)
[Convert]::FromBase64String($base64String)
```

The problem with this approach is that if you need to convert big binary file, you have to read the whole file into memory. This consumes a lot of memory and a lot of time.

Better approach would be to read file with chunks and convert the chunks. Due to the base64 nature size of chunks should be multiplier of 3 when convert binary->base64 and a multiplier of 4 for reverse conversion

```powershell
function ConvertTo-Base64
{
    param
    (
        [string] $SourceFilePath,
        [string] $TargetFilePath
    )

    $SourceFilePath = Resolve-PathSafe $SourceFilePath
    $TargetFilePath = Resolve-PathSafe $TargetFilePath

    $bufferSize = 9000 # should be a multiplier of 3
    $buffer = New-Object byte[] $bufferSize

    $reader = [System.IO.File]::OpenRead($SourceFilePath)
    $writer = [System.IO.File]::CreateText($TargetFilePath)

    $bytesRead = 0
    do
    {
        $bytesRead = $reader.Read($buffer, 0, $bufferSize);
        $writer.Write([Convert]::ToBase64String($buffer, 0, $bytesRead));
    } while ($bytesRead -eq $bufferSize);

    $reader.Dispose()
    $writer.Dispose()
}

function ConvertFrom-Base64
{
    param
    (
        [string] $SourceFilePath,
        [string] $TargetFilePath
    )

    $SourceFilePath = Resolve-PathSafe $SourceFilePath
    $TargetFilePath = Resolve-PathSafe $TargetFilePath

    $bufferSize = 9000 # should be a multiplier of 4
    $buffer = New-Object char[] $bufferSize

    $reader = [System.IO.File]::OpenText($SourceFilePath)
    $writer = [System.IO.File]::OpenWrite($TargetFilePath)

    $bytesRead = 0
    do
    {
        $bytesRead = $reader.Read($buffer, 0, $bufferSize);
        $bytes = [Convert]::FromBase64CharArray($buffer, 0, $bytesRead);
        $writer.Write($bytes, 0, $bytes.Length);
    } while ($bytesRead -eq $bufferSize);

    $reader.Dispose()
    $writer.Dispose()
}

function Resolve-PathSafe
{
    param
    (
        [string] $Path
    )

    $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Path)
}
```

Note that we used **\[System.IO.Path\]::GetFullPath** instead of **Resolve-Path**, because **Resolve-Path** works with existing files only, and we need to deal with non-existent \$TargetFilePath files

With that approach, when I converted 10mb file it completed within a second, whereas for the naive approach it took hours

**UPD**: Later after the blogpost I realized that **\[System.IO.Path\]::GetFullPath** won't work properly and we need to use [Resolve-PathSafe](<./2013-08-20 PowerShell Resolve-Path Safe.md>) approach

Code above was updated to reflect that
