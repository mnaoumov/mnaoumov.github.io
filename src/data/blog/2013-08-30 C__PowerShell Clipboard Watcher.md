---
description: Implements a clipboard change watcher in PowerShell using inline C# with P/Invoke and WinForms WM_CLIPBOARDUPDATE.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[clipboard](<../Tags/clipboard.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[winforms](<../Tags/winforms.md>)"
pubDatetime: 2013-08-30T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:54-06:00
title: "C__PowerShell Clipboard Watcher"
url:
  - https://mnaoumov.wordpress.com/2013/08/31/cpowershell-clipboard-watcher/
disabled rules:
  - yaml-title
---

# 2013-08-30 C__PowerShell Clipboard Watcher

Recently I [needed](<./2013-08-20 How to reach unreachable or copy files to RDP - Part 2.md>) to implement a clipboard watcher for PowerShell.

This was actually not a simple thing. The only way to implement it as I [found](http://jlorek.wordpress.com/2012/07/26/observe-your-clipboard-like-a-boss/) is to use P/Invoke + WinForms, which is very annoying.

So firstly I implemented it in C#

1\. Create a STA Thread (Single Thread Apartment) 2. In this thread create a WinForms Form. 3. Then using [AddClipboardFormatListener](http://msdn.microsoft.com/en-us/library/windows/desktop/ms649033.aspx) Win32 function register that form as a listener for the clipboard changes 4. then override [WndProc](http://msdn.microsoft.com/en-us/library/system.windows.forms.control.wndproc.aspx) method for the form and handle [WM_CLIPBOARDUPDATE](http://msdn.microsoft.com/en-us/library/windows/desktop/ms649021.aspx) message

This is just a plan, full implementation you can find in my [repo](https://github.com/mnaoumov/ClipboardWatcher)

After we get working C# implementation we can move it to PowerShell

```powershell
#requires -version 2.0

[CmdletBinding()]
param
(
)

$script:ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }
Trap { throw $_ }

function Register-ClipboardWatcher
{
    if (-not (Test-Path Variable:Global:ClipboardWatcher))
    {
        Register-ClipboardWatcherType
        $Global:ClipboardWatcher = New-Object ClipboardWatcher

        Register-EngineEvent -SourceIdentifier PowerShell.Exiting -SupportEvent -Action `
        {
            Unregister-ClipboardWatcher
        }
    }

    return $Global:ClipboardWatcher
}

function Unregister-ClipboardWatcher
{
    if (Test-Path Variable:Global:ClipboardWatcher)
    {
        $Global:ClipboardWatcher.Dispose();
        Remove-Variable ClipboardWatcher -Scope Global
        Unregister-Event -SourceIdentifier ClipboardWatcher
    }
}

function Register-ClipboardWatcherType
{
    Add-Type -ReferencedAssemblies System.Windows.Forms, System.Drawing -Language CSharpVersion3 -TypeDefinition `
@"
using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

public class ClipboardWatcher : IDisposable
{
    readonly Thread _formThread;
    bool _disposed;

    public ClipboardWatcher()
    {
        _formThread = new Thread(() => { new ClipboardWatcherForm(this); })
                      {
                          IsBackground = true
                      };

        _formThread.SetApartmentState(ApartmentState.STA);
        _formThread.Start();
    }

    public void Dispose()
    {
        if (_disposed)
            return;
        Disposed();
        if (_formThread != null && _formThread.IsAlive)
            _formThread.Abort();
        _disposed = true;
        GC.SuppressFinalize(this);
    }

    ~ClipboardWatcher()
    {
        Dispose();
    }

    public event Action<string> ClipboardTextChanged = delegate { };
    public event Action Disposed = delegate { };

    public void OnClipboardTextChanged(string text)
    {
        ClipboardTextChanged(text);
    }
}

public class ClipboardWatcherForm : Form
{
    public ClipboardWatcherForm(ClipboardWatcher clipboardWatcher)
    {
        HideForm();
        RegisterWin32();
        ClipboardTextChanged += clipboardWatcher.OnClipboardTextChanged;
        clipboardWatcher.Disposed += () => InvokeIfRequired(Dispose);
        Disposed += (sender, args) => UnregisterWin32();
        Application.Run(this);
    }

    void InvokeIfRequired(Action action)
    {
        if (InvokeRequired)
            Invoke(action);
        else
            action();
    }

    public event Action<string> ClipboardTextChanged = delegate { };

    void HideForm()
    {
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        Load += (sender, args) => { Size = new Size(0, 0); };
    }

    void RegisterWin32()
    {
        User32.AddClipboardFormatListener(Handle);
    }

    void UnregisterWin32()
    {
        if (IsHandleCreated)
            User32.RemoveClipboardFormatListener(Handle);
    }

    protected override void WndProc(ref Message m)
    {
        switch ((WM) m.Msg)
        {
            case WM.WM_CLIPBOARDUPDATE:
                ClipboardChanged();
                break;

            default:
                base.WndProc(ref m);
                break;
        }
    }

    void ClipboardChanged()
    {
        if (Clipboard.ContainsText())
            ClipboardTextChanged(Clipboard.GetText());
    }
}

public enum WM
{
    WM_CLIPBOARDUPDATE = 0x031D
}

public class User32
{
    const string User32Dll = "User32.dll";

    [DllImport(User32Dll, CharSet = CharSet.Auto)]
    public static extern bool AddClipboardFormatListener(IntPtr hWndObserver);

    [DllImport(User32Dll, CharSet = CharSet.Auto)]
    public static extern bool RemoveClipboardFormatListener(IntPtr hWndObserver);
}
"@

}

function Register-ClipboardTextChangedEvent
{
    param
    (
        [ScriptBlock] $Action
    )

    $watcher = Register-ClipboardWatcher
    Register-ObjectEvent $watcher -EventName ClipboardTextChanged -Action $Action -SourceIdentifier ClipboardWatcher
}

Register-ClipboardTextChangedEvent -Action `
    {
        param
        (
            [string] $text
        )

        Write-Host "Text arrived @ clipboard: $text"
    }
```

Last call just shows how to use our **Register-ClipboardTextChangedEvent** function All unmanaged resources are cleaned automatically

This is pretty nice

UPD: I forgot to mention some details… The implementation above works only in Windows Vista+ If we need to support Windows XP, we'll use [SetClipboardViewer](http://msdn.microsoft.com/en-us/library/windows/desktop/ms649052.aspx) Win32 function which is less robust.

UPD2: Just updated the code, as I found that event subscribers should be unsubscribed if we unregister watcher. Also I found something which I did not know before. When we subscribe to an event on PowerShell, it registers a New-Job, so the script is executed in the separate runspace, so it does not have access to your script's variables and functions unless you declared them with **Global:** identifier
