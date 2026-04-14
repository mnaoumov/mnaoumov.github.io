---
description: Technique for transferring binary files to an RDP server with no drive sharing by encoding them as Base64 via the clipboard.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[rdp](<../Tags/rdp.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[base64](<../Tags/base64.md>)"
pubDatetime: 2013-06-19T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "How to reach unreachable or copy files to RDP"
url:
  - https://mnaoumov.wordpress.com/2013/06/20/how-to-reach-unreachable-or-copy-files-to-rdp/
disabled rules:
  - yaml-title
---

# 2013-06-19 How to reach unreachable or copy files to RDP

Consider that usecase: I need to send a dll file to production environment to patch some bugs

I have a RDP access to production environment. All good? No! I do have RDP access to that environment but drive sharing and Internet is disabled on it. How can I transfer files in this case?!

I came up with an interesting solution… Use clipboard. But how to transfer binary file via clipboard?! Convert it to Base64! Gotcha!

This idea works as a charm.

The following script we are using locally

```powershell
function ConvertTo-Base64Clipboard
{
    param
    (
        [string] $FilePath
    )

   [Convert]::ToBase64String((Get-Content -Path $FilePath -Encoding Byte)) | clip
}
```

This one - on production server

```powershell
function Get-Clipboard
{
    PowerShell -NoProfile -Sta -Command `
    {
        Add-Type -AssemblyName PresentationCore
        [Windows.Clipboard]::GetText()
    }
}

function ConvertFrom-Base64Clipboard
{
    param
    (
        [string] $FilePath
    )

   [Convert]::FromBase64String((Get-Clipboard)) | Out-File -FilePath $FilePath -Encoding Byte
}
```

Voila!

This idea is not new, I found similar [here](http://pholpar.wordpress.com/2011/09/20/how-to-copy-files-through-a-remote-desktop-connection-using-clipboard-and-powershell/) and [here](http://techmikael.blogspot.com.au/2010/02/i-want-to-copy-those-files-tale-on-how.html)

**UPD**: forgot to mention performance, conversion is taking time. So I reckon if you need to transfer multiple files, archive them into zip first and then transfer this archive file. Zip is natively supported by modern versions of Windows.

I am not sure about limitations of clipboard length. Some BCL API makes me think that it could be **int.MaxValue**. This gives us 2gb of base64, or 2gb \* 3/4 = 1.5gb of binary data. So that should be more than enough.

There is also a way to rewrite **Get-ClipboardText** which doesn't require running separate PowerShell process in STA mode

```powershell
function Get-ClipboardText
{
    Add-Type -AssemblyName System.Windows.Forms
    $tb = New-Object System.Windows.Forms.TextBox
    $tb.Multiline = $true
    $tb.MaxLength = [int]::MaxValue
    $tb.Paste()
    $tb.Text
}
```

This works a bit faster

**UPD2**: Those scripts were written from memory, and later on I found couple of mistakes.

So I will provide final correct versions of the scripts

```powershell
function ConvertTo-Base64Clipboard
{
    param
    (
        [string] $FilePath
    )

   [Convert]::ToBase64String((Get-Content -Path $FilePath -Encoding Byte)) | clip
}
```

and

```powershell
function Get-Clipboard
{
    Add-Type -AssemblyName System.Windows.Forms
    $tb = New-Object System.Windows.Forms.TextBox
    $tb.Multiline = $true
    $tb.MaxLength = [int]::MaxValue
    $tb.Paste()
    $tb.Text
}

function ConvertFrom-Base64Clipboard
{
    param
    (
        [string] $FilePath
    )

   [Convert]::FromBase64String((Get-Clipboard)) | Set-Content -Path $FilePath -Encoding Byte
}
```

[Part 2](<./2013-08-20 How to reach unreachable or copy files to RDP - Part 2.md>)
