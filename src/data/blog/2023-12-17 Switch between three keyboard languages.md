---
description: An AutoHotkey v2 script that maps Left Control, Right Control, and Right Alt to instantly switch between English, Russian, and Ukrainian keyboard layouts.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[autohotkey](<../Tags/autohotkey.md>)"
  - "[windows](<../Tags/windows.md>)"
  - "[keyboard](<../Tags/keyboard.md>)"
  - "[productivity](<../Tags/productivity.md>)"
pubDatetime: 2023-12-17T00:16:59-06:00
title: "Switch between three keyboard languages"
created: 2023-12-17T00:16:59-06:00
updated: 2026-04-13T13:06:59-06:00
url:
  - https://mnaoumov.wordpress.com/2023/12/17/switch-between-three-keyboard-languages/
disabled rules:
  - yaml-title
---

# 2023-12-17 Switch between three keyboard languages

Hi folks.

On the regular basis I use three keyboards: English, Russian and Ukrainian. I need them quite often and I need a quick way to switch between them. Default `Alt + Shift` and `Win + Space` are not good enough. Cyclical changes don't work well sometimes and I have to click more and look in the notification error for the language label.

There are many tools for switching languages such as [Punto Switcher](https://yandex.ru/soft/punto/win/) but all that I tried work fine with two languages and don't suggest anything nice for three language users. There are some advices how to use three languages but I didn't find them practical.

My need is to be able to quickly switch to the desired language regardless of the current language selected.

I came up with the following idea:

- `Left Control` to switch to English language
- `Right Control` to switch to Russian language
- `Right Alt` to switch to Ukrainian language

But also I need to keep the default behavior of those buttons and the shortcuts using those keys.

I would like to share the solution I came up with:

I built a script for [AutoHotkey](https://www.autohotkey.com/)

```
#Requires AutoHotKey v2.0
#SingleInstance Force
#Warn All, MsgBox
#UseHook

; Based on https://www.autohotkey.com/boards/viewtopic.php?f=6&t=18519

setDefaultKeyboard(localeId) {
    ; https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfoa
    static SPI_SETDEFAULTINPUTLANG := 0x005A

    ; https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfoa
    static SPIF_SENDWININICHANGE := 2

    ; https://learn.microsoft.com/en-us/windows/win32/winmsg/wm-inputlangchangerequest
    static WM_INPUTLANGCHANGEREQUEST := 0x0050

    ; https://learn.microsoft.com/en-us/windows/win32/winmsg/wm-inputlangchange
    static WM_INPUTLANGCHANGE := 0x0051

    ; https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-loadkeyboardlayouta
    static KLF_ACTIVATE := 0x00000001

    ; https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-loadkeyboardlayouta
    pwszKLID := Format("{:08x}", localeId)
    Flags := KLF_ACTIVATE
    keyboardLayout := DllCall("LoadKeyboardLayout", "Str", pwszKLID, "Int", Flags)

    ; https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfoa
    uiAction := SPI_SETDEFAULTINPUTLANG
    uiParam := 0
    pvParam := keyboardLayout
    fWinIni := SPIF_SENDWININICHANGE
    DllCall("SystemParametersInfo", "UInt", uiAction, "UInt", uiParam, "UPtr", pvParam, "UInt", fWinIni)

    windowIds := WinGetList()

    for windowId in windowIds {
        try {
            PostMessage(WM_INPUTLANGCHANGEREQUEST, 0, keyboardLayout, , "ahk_id" . windowId)
            PostMessage(WM_INPUTLANGCHANGE, 0, keyboardLayout, , "ahk_id" . windowId)
        } catch {
            ; Skip access denied windows
        }
    }
}

; https://stackoverflow.com/questions/14701095/how-to-get-keyboard-layout-name-from-a-keyboard-layout-identifier
; https://learn.microsoft.com/en-us/globalization/windows-keyboard-layouts

localeId_English_USA := 0x0409
localeId_Russian_Russia := 0x0419
localeId_Ukrainian_Ehnanced := 0x20422

~LControl: {
    global isAltGr := false
    Sleep 100
    if (isAltGr) {
        return
    }

    SetDefaultKeyboard(localeId_English_USA)
}

~RControl: SetDefaultKeyboard(localeId_Russian_Russia)

~RAlt: SetDefaultKeyboard(localeId_Ukrainian_Ehnanced)

~LControl & RAlt: {
    global isAltGr := true
    SetDefaultKeyboard(localeId_Ukrainian_Ehnanced)
}
```

Gotchas here:

1. I've added links to every WinAPI function and constant for better maintainability. Surprisingly most of WinAPI examples I see on the Internet are written very poorly.
2. Tilde prefix `~` (https://www.autohotkey.com/docs/v2/Hotkeys.htm)
    > When the hotkey fires, its key's native function will not be blocked (hidden from the system).
3. Physical `Right Alt` button in some keyboard layouts (in my case, both Russian and Ukrainian) act as `AltGr`, which is an equivalent of `LControl & RAlt`. Therefore it requires special check to distinguish `LControl & RAlt` (as a physical button of `Right Alt`) from fair `Left Control`. As I figured out, it triggers `LControl` handler first and then `LControl & RAlt`, that's why I had to add a global variable `isAltGr` and a small delay to handle this difference.

Stay tuned!

**UPD**: After some time, I found the selected shortcuts not so pleasant to use, then I realized, there is a key that I used only a few time in my life: `Caps Lock`, so I decided to utilize it. Now `Caps Lock + 1` – English, `Caps Lock + 2` – Russian, `Caps Lock + 3` – Ukrainian. It’s a bit unusual to have `Caps Lock` as a modifier, so it took my muscle memory a bit of time to kick in, but now I am happily using it.

The changes in the script I put before

```
CapsLock & 1:: SetDefaultKeyboard(localeId_English_USA)
CapsLock & 2:: SetDefaultKeyboard(localeId_Russian_Russia)
CapsLock & 3:: SetDefaultKeyboard(localeId_Ukrainian_Ehnanced)
```
