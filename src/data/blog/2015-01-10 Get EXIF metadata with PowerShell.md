---
description: Reading EXIF tags such as date-taken from images in PowerShell using System.Drawing.Image.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[exif](<../Tags/exif.md>)"
  - "[images](<../Tags/images.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2015-01-10T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Get EXIF metadata with PowerShell"
url:
  - https://mnaoumov.wordpress.com/2015/01/11/get-exif-metadata-with-powershell/
disabled rules:
  - yaml-title
---

# 2015-01-10 Get EXIF metadata with PowerShell

Hi folks

Sometimes we need to extract some exif data from images. We could do this with PowerShell.

Here is the most efficient way to do this

```powershell
function Get-ExifProperty
{
    param
    (
        [string] $ImagePath,
        [int] $ExifTagCode
    )

    $fullPath = (Resolve-Path $ImagePath).Path

    PSUsing ($fs = [System.IO.File]::OpenRead($fullPath)) `
    {
        PSUsing ($image = [System.Drawing.Image]::FromStream($fs, $false, $false)) `
        {
            if (-not $image.PropertyIdList.Contains($ExifTagCode))
            {
                return $null
            }

            $propertyItem = $image.GetPropertyItem($ExifTagCode)
            $valueBytes = $propertyItem.Value
            $value = [System.Text.Encoding]::ASCII.GetString($valueBytes) -replace "`0$"
            return $value
        }
    }
}
```

**PSUsing** was described in the previous [blogpost](<./2015-01-10 PowerShell and IDisposable.md>)

Here is the list of tags: http://www.digitalpreservation.gov/formats/content/tiff_tags.shtml

For example, date taken tag is http://www.awaresystems.be/imaging/tiff/tifftags/privateifd/exif/datetimeoriginal.html

Date in the following format: "yyyy:MM:dd HH:mm:ss"

```powershell
$ExifTagCode_DateTimeOriginal = 0x9003

function Get-DateTaken
{
    param
    (
        [string] $ImagePath
    )

    $str = Get-ExifProperty -ImagePath $ImagePath -ExifTagCode $ExifTagCode_DateTimeOriginal

    if ($str -eq $null)
    {
        return $null
    }

    $dateTime = [DateTime]::MinValue
    if ([DateTime]::TryParseExact($str, "yyyy:MM:dd HH:mm:ss", $null, [System.Globalization.DateTimeStyles]::None, [ref] $dateTime))
    {
        return $dateTime
    }

    return $null
}
```

Stay tuned
