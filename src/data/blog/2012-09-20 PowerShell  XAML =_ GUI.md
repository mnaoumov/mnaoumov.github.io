---
description: "How to build a WPF GUI window in PowerShell using XAML, with a note on the STA threading requirement for PowerShell 2."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[wpf](<../Tags/wpf.md>)"
  - "[xaml](<../Tags/xaml.md>)"
  - "[gui](<../Tags/gui.md>)"
pubDatetime: 2012-09-20T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "PowerShell + XAML => GUI"
url:
  - https://mnaoumov.wordpress.com/2012/09/20/powershell-xaml-gui/
aliases:
  - 2012-09-20 PowerShell XAML =_ GUI
  - "PowerShell + XAML => GUI"
disabled rules:
  - yaml-title
linter-yaml-title-alias: 2012-09-20 PowerShell XAML =_ GUI
---

# 2012-09-20 PowerShell XAML =_ GUI

You can use WPF GUI from PowerShell using the following snippet

```powershell
Add-Type -AssemblyName PresentationFramework

$xaml = [xml] @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" Title="My window" Height="300" Width="300">
    <Grid>
        <Button x:Name="okButton" Content="OK" />
    </Grid>
</Window>
"@

$reader = New-Object System.Xml.XmlNodeReader $xaml
$form = [Windows.Markup.XamlReader]::Load($reader)

$okButton = $form.FindName("okButton")

$okButton.add_Click({
    $form.Close()
})

$form.WindowStartupLocation = "CenterScreen"
$form.ShowDialog();
```

UPDATE: I found that this will work out of the box only in PowerShell 3.

In previous versions of PowerShell it will fail on line \#13

The problem is with STA.

According to [this](http://technet.microsoft.com/en-us/library/hh847736.aspx)

> \-Sta Starts Windows PowerShell using a single-threaded apartment. In Windows PowerShell 3.0, single-threaded apartment (STA) is the default. In Windows PowerShell 2.0, multi-threaded apartment (MTA) is the default.

So if you want to use GUI from PowerShell 2 host you have to start it in STA mode

```powershell
PowerShell.exe -Sta
```

PowerShell ISE is in STA already.

[Here](http://depsharee.blogspot.com.au/2011/06/powershell-sta-and-mta.html) I've got an advice to write in your script something like

```powershell
if([System.Threading.Thread]::CurrentThread.ApartmentState -ne "STA") {               
    Write-Host -ForegroundColor Red "RUN PowerShell.exe with -Sta switch"
    Write-Host -ForegroundColor Red "Example:"             
    Write-Host -ForegroundColor Red "    PowerShell -noprofile -Sta C:\scripts\YourGUIUtility.ps1"               
}
```
