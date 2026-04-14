---
description: A detailed comparison of note-taking systems over many years, explaining why Obsidian with Syncthing and a curated plugin list became the final choice.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[obsidian](<../Tags/obsidian.md>)"
  - "[note-taking](<../Tags/note-taking.md>)"
  - "[productivity](<../Tags/productivity.md>)"
  - "[android](<../Tags/android.md>)"
  - "[syncthing](<../Tags/syncthing.md>)"
pubDatetime: 2022-05-08T00:00:00Z
number headings: auto, first-level 1, max 6, contents ^toc, _.1.1.
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:58-06:00
title: "Perfect Notes or My Journey to Obsidian"
disabled rules:
  - yaml-title
url:
  - https://mnaoumov.wordpress.com/2022/05/08/perfect-notes-or-my-journey-to-obsidian/
  - https://www.facebook.com/mnaoumov/posts/5655420564487443
  - https://www.linkedin.com/posts/mnaoumov_perfect-notes-or-my-journey-toobsidian-activity-6929290914783793152-1T4n
  - https://twitter.com/mnaoumov/status/1523525220413284357
  - https://zttl.space/t/idealnye-zametki-ili-moj-put-k-obsidianu-perfect-notes-or-my-journey-to-obsidian/669
  - https://www.exler.ru/blog/pogovorim-o-servisakh-khraneniya-zametok.htm#zpbl
---

# 2022-05-08 Perfect Notes or My Journey to Obsidian

**UPD**. I made some corrections in [8.4.7. PROBLEM Android: Package Names](<#8.4.7. PROBLEM Android: Package Names>)

# 1. Before We Start

**I was hesitant to make any posts in my blog while there is war in my motherland Ukraine which is being invaded by Russia. Any programming post doesn't really make sense while innocent Ukrainian people are dying because of the imperial ambitions of some Russian politicians. I still decided to post my shallow blogpost because I want to move on mentally. It doesn't mean I forgot or that don't care about the disaster in my homeland. I hope the justice wins and my country will be safe again as soon as possible.**

**Glory to Ukraine!**

This blogpost appeared to be very long (over 12k words and over 82k characters). So to simplify reading, I added a table of content.

1. [Before We Start](<#1. Before We Start>)
2. [TL;DR](<#2. TL;DR>)
3. [Intro](<#3. Intro>)
4. [Terms](<#4. Terms>)
5. [Desired Features](<#5. Desired Features>)
6. [NTS I Tried](<#6. NTS I Tried>)
7. [Obsidian Philosophy](<#7. Obsidian Philosophy>)
8. [Detailed Obsidian Feature Review](<#8. Detailed Obsidian Feature Review>)
9. [My way to organize notes](<#9. My way to organize notes>)
10. [List of Obsidian Plugins I Use](<#10. List of Obsidian Plugins I Use>)
11. [How to migrate to Obsidian from other NTS](<#11. How to migrate to Obsidian from other NTS>)
12. [Wrapping up](<#12. Wrapping up>)

# 2. TL;DR

If you don't want to read my self-therapy stories here is just the collection of useful links I recommend for perfect note-taking.

- [Obsidian for Windows](https://obsidian.md/)
- [Obsidian for Android](https://play.google.com/store/apps/details?id=md.obsidian)
- [Android: Instructions how to prevent Obsidian from closing](https://dontkillmyapp.com/)
- [App Cloner](https://appcloner.app/)
- [Syncthing](https://syncthing.net/)
- [Syncthing-Fork](https://f-droid.org/en/packages/com.github.catfriend1.syncthingandroid/)
- [Sharedr](https://play.google.com/store/apps/details?id=com.rejh.sharedr)
- [git-annex](https://git-annex.branchable.com/)
- [AutoHotkey](https://www.autohotkey.com/)
- [Electron Window Tweaker](https://github.com/mgmeyers/obsidian-electron-window-tweaker)
- [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en&gl=US)
- [Create Obsidian Note Inbox](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+Obsidian+Note+Inbox)
- [Create Obsidian Note Inbox From Panel](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+Obsidian+Note+Inbox+From+Panel)
- [Create My Apps Panel](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+My+Apps+Panel)
- [Create My Apps Panel On Boot](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Profile%3ACreate+My+Apps+Panel+On+Boot)

## 2.1. Plugins

- [Advanced Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri)
- [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian)
- [AidenLx's Folder Note](https://github.com/aidenlx/alx-folder-note)
- [AidenLx's Folder Note - folderv Component](https://github.com/aidenlx/alx-folder-note-folderv)
- [Better CodeBlock](https://github.com/stargrey/obsidian-better-codeblock)
- [Collapse All](https://github.com/OfficerHalf/obsidian-collapse-all)
- [Consistent attachments and links](https://github.com/dy-sh/obsidian-consistent-attachments-and-links)
- [Copy Image and URL in Preview](https://github.com/NomarCub/obsidian-copy-url-in-preview)
- [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)
- [Customizable Sidebar](https://github.com/phibr0/obsidian-customizable-sidebar)
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Electron Window Tweaker](https://github.com/mgmeyers/obsidian-electron-window-tweaker)
- [Excel to Markdown Table](https://github.com/ganesshkumar/obsidian-excel-to-markdown-table)
- [File Cleaner](https://github.com/Johnson0907/obsidian-file-cleaner)
- [Filename Heading Sync](https://github.com/dvcrn/obsidian-filename-heading-sync)
- [Find unlinked files](https://github.com/Vinzent03/find-unlinked-files)
- [Folder Note Core](https://github.com/aidenlx/folder-note-core)
- [Go to Line](https://github.com/phibr0/obsidian-go-to-line)
- [Hot Reload](https://github.com/pjeby/hot-reload)
- [Indentation Lines](https://github.com/Arch-Storm/obsidian-indent-lines)
- [Linter](https://github.com/platers/obsidian-linter)
- [Local images](https://github.com/aleksey-rezvov/obsidian-local-images)
- [Markdown Table Editor](https://github.com/ganesshkumar/obsidian-table-editor)
- [Number Headings](https://github.com/onlyafly/number-headings-obsidian)
- [Obsidian Git](https://github.com/denolehov/obsidian-git)
- [Obsidian Link Converter](https://github.com/ozntel/obsidian-link-converter)
- [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat)
- [Quick Explorer](https://github.com/pjeby/quick-explorer)
- [Recent Files](https://github.com/tgrosinger/recent-files-obsidian)
- [Shortcuts extender](https://github.com/ryjjin/Obsidian-shortcuts-extender)
- [Tag Wrangler](https://github.com/pjeby/tag-wrangler)
- [Templater](https://github.com/SilentVoid13/Templater)

## 2.2. Migration

- [YANOM - Yet Another Note-O-Matic](https://github.com/kevindurston21/YANOM-Note-O-Matic)
- [Convert Evernote .enex notebooks to Markdown](https://github.com/dmuth/evernote-to-obsidian)
- [YARLE - Yet Another Rope Ladder from Evernote](https://github.com/akosbalasko/yarle)

# 3. Intro

Hi folks.

For many years I was trying to find an app that satisfies all my daily notetaking needs. Surprisingly this goal is way more difficult to achieve than you might expect.

At the end I found a tool, which is not perfect, in my opinion, but with some additional configuration effort, I made it as close to ideal as I could.

Do not hesitate to comment and criticize my ideas if they are not reasonable, suggest better solutions for the problems I discuss and suggest more ideas.

# 4. Terms

- Note-taking software (**NTS**).
- [Personal Knowledge Base](https://en.wikipedia.org/wiki/Personal_knowledge_base) (**PKB**).

# 5. Desired Features

Over years I came up with the list of requirements I find crucial for NTS.

I am using Windows desktop and Android phone, so I will be talking mostly about those Windows and Android. I won't discuss MacOS, iOS and Linux just because I don't use them very often so I don't need NTS there.

## 5.1. Windows: Native App

I use desktop with Windows as my primary OS, and here will be 99% of my time using NTS.

Some NTS don't have native app and work as web application. And in my experience it is horribly inefficient.

For example, [Google Keep](<#6.3. [Google Keep](https://keep.google.com/)>) doesn't have a desktop app and overall the experience using it from the computer is unsatisfactory.

## 5.2. Android: Native App

My primary mobile phone is on Android. I need to be able to access my notes created on desktop and create new ones from the phone. I need to be able to write text notes quickly and attach any files if needed.

Web applications are extremely inefficient on mobiles even more than on Desktop.

## 5.3. Notes Available Offline without Internet Connection

Many NTS store data in the cloud which makes the NTS unusable if you have no internet at all or internet connection is not stable. Some of the NTS has a feature to selectively make notes available offline. I just mark all notes to be available offline.

## 5.4. Fast Performance

I use NTS as my knowledge database and second brain. I need it to start and run as quickly as possible.

## 5.5. Fast Synchronization Between Devices

Most of the edits is happening on my desktop. On mobile it is normally just quick notes that go to Inbox and then being carefully processed from the desktop.

## 5.6. Fast Search

As I consider PKB as my second brain, it should be able to find things I put there with the speed close to the one my brain works, otherwise it makes not much sense to rely on it.

## 5.7. Unlimited Folder Hierarchy

I want to use folders to organize my notes and not to be limited.

For example, [Evernote](<#6.2. 2014-2021 [Evernote](https://evernote.com/)>) has only two levels of folders hierarchy: notebook and notebook stack. Notebook stack cannot be even considered to be a fully-functional folder, because you can put only notebooks there and can't put other notes there.

If I have the following note path `Projects/Project1/Releases/Release2/Features/Feature3/MeetingNote`, yes, it could be somehow simulated with tags but I find NTS without folder system very lame.

However when I am talking about **unlimited** I am being a dreamer, because Windows paths are limited with [**260**](https://docs.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation) characters. This limit could be disabled in Windows 10 but many apps become crazy with such files. So overall I try to avoid such limits for better portability. But it requires some manual diligence.

Also on Android file name length can't exceed [**255**](https://stackoverflow.com/questions/13204807/max-file-name-length-in-android) bytes. And if you are using only English letters and punctuation symbols for your files, you can stick to file names up **255** characters. I am heavily using Russian and Ukrainian letters in my notes names. As Cyrillic letters occupy 2 bytes, for me safe limit is 255/2 = **127** characters. But that's not the safest limit for everyone. Zoomers nowadays heavily use emoticons like 😊. This single character uses 4 bytes, so if you have note with name consists of emoticons (or other Unicode characters that are encoded with 4 bytes in UTF-8) your safe limit is 255/4 = **63** characters.

Of course, those two limitations I mentioned above take place only for the NTS that use filesystem for the note structure storage.

For example, [Evernote](<#6.2. 2014-2021 [Evernote](https://evernote.com/)>) doesn't use filesystem for the note storage but it still has some [limits](https://dev.evernote.com/doc/reference/Limits.html): EDAM_NOTE_TITLE_LEN_MAX = 255, EDAM_NOTEBOOK_NAME_LEN_MAX = 100

## 5.8. Unlimited Tags Hierarchy

[Google Keep](<#6.3. [Google Keep](https://keep.google.com/)>) allows only flat structure of tags.

[Evernote](<#6.2. 2014-2021 [Evernote](https://evernote.com/)>) has hierarchical tags. They have some [limits](https://dev.evernote.com/doc/reference/Limits.html) (EDAM_TAG_NAME_LEN_MAX = 100), but what was also surprising to me is the harsh requirement about leaf tag names uniqueness, so you can't have both of such tags `parent1/child1`, `parent2/child1`. Evernote won't let you create both, you will need to come up with some workarounds like `parent2/child1_wtf_evernote_why_do_you_force_me_to_do_that`

## 5.9. Ability to Attach Any File

I need to be able to easily attach any file to any note, no matter how big it is, or its datatype.

[Simple Note](<#6.5. [Simple Note](https://simplenote.com/)>), [Standard Notes](<#6.6. [Standard Notes](https://standardnotes.com/)>) work with plain text only, not attachments allowed, even images.

[Google Keep](<#6.3. [Google Keep](https://keep.google.com/)>) allows you to attach only images.

## 5.10. Ability to Backup

We should be able to to keep our knowledge database and restore from it if needed. We should be able to download it and keep it ourselves as it is our PKB. We should not rely too much on the external services that can go down or out of business.

## 5.11. Portability

We should avoid having any vendor lock-in. We should be able to migrate our PKB to any tool that suits our needs better.

This is a harsh requirement. It is difficult to meet. There are multiple tools to migrate from popular NTS but I didn't see any which is flawless.

## 5.12. Ability to Generate Notes Programmatically

Sometimes we get information from external resources and we want to put them into our PKB. I would like to be able to add many notes to PKB programmatically.

This requirement makes sense only for people that actually skilled to generate notes programmatically.

## 5.13. Note Edit History

I would like to see what did I change and when, and revert to previous version if needed. If I changed multiple notes in a batch, I would like to be able to revert the entire batch if needed.

## 5.14. Windows: Global Hotkey

I would like to be able to create a note at any time regardless if my NTS open or active.

## 5.15. Windows: Small Transparent Window on Top of Other Windows

It is useful if you a looking/reading something and want to record some thought without distractions.

## 5.16. Android: Widget or Icon to Create Note Quickly

Similarly, I need a quick way to record my thoughts when I am with my phone.

## 5.17. Android: Create Note Quickly From Notification Panel

Notification panel is always visible, unless you are in full-screen mode apps, usually games or book readers. But anyway, notification panel is easily accessible, so adding notes from notification panel makes note-taking even more efficient.

## 5.18. Collaborative Note Edits

Shopping list shared with your family members.

## 5.19. Share Note Externally

Sometimes we need to publish our notes in the Internet making them available to use for people that don't use our NTS.

## 5.20. Ability to Extend Functionality with Plugins

If our NTS doesn't have certain feature that we need, it would be great if NTS has API to add missing functionality. Also it would be great to have big community to have variety of plugins and seek for help if needed.

## 5.21. Windows: Web Clipper

It's needed to be able to save content of the visited pages into notes including all necessary attachments such as pictures.

I don't ask for mobile web clippers as I don't find them handy.

## 5.22. Android: Quick Save Selected Text

The ability to quickly select text and save it to the notes provides much better experience than manually copying text, opening NTS, creating note, pasting text

# 6. NTS I Tried

When you are trying to Google what is the best NTS on the market, you get tons of articles and then you try them one by one and get disappointed quickly.

Some of such lists

- [What is the best cross-platform note-taking app?](https://www.slant.co/topics/697/~best-cross-platform-note-taking-app)
- [What are the best offline note-taking apps for Windows?](https://www.slant.co/topics/4437/~offline-note-taking-apps-for-windows)
- [What are the best Evernote alternatives?](https://www.slant.co/topics/2463/~best-evernote-alternatives)
- [The 6 best note-taking apps of 2022](https://zapier.com/blog/best-note-taking-apps/)

I didn't try all the apps from all those lists. When I try some of them I soon feel like

![image-2022-04-30-21-41-56.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-04-30-21-41-56.png>)

## 6.1. 2000-2014 No Dedicated Tool

That was a complete mess. I still have some notes and files from that times but that's just because I was very diligent. But overall experience is very poor and tedious.

## 6.2. 2014-2021 [Evernote](https://evernote.com/)

In 2014 I purchased Evernote Premium however I didn't need most of the premium features.

In October 2020 they did a horrible thing. Evernote team released a rewritten version \#10 which was a complete disaster: raw, slow and very limited functionality. Many people rolled back to the latest adequate [version 6.25.3.9348 for Windows](https://help.evernote.com/hc/en-us/articles/360052560314-Install-an-older-version-of-Evernote)

It was also possible to manually sideload [Android version 8.13.3](https://www.apkmirror.com/apk/evernote-corporation/evernote/evernote-8-13-3-release/)

I don't know easy way to downgrade on iOS. However, I was told that iPhone version always had poor performance so old versions were also unusable.

In 2021 the Evernote team made impossible to login to the app using old Android versions so they were forcing me to update.

That was a last drop. I started proactively looking for alternatives, exported all my notes, cancelled my Premium subscription and left Evernote.

The biggest annoyance for me was the lack of the [Unlimited Folder Hierarchy](<#5.7. Unlimited Folder Hierarchy>).

I was constantly looking for alternative NTS but could never find anything as usable as Evernote and was always coming back as unfaithful husband to his old grumpy wife.

## 6.3. [Google Keep](https://keep.google.com/)

In 2018 for a short period of time I was trying Google Keep while it had even less features than Evernote. I didn't last long because I was super annoyed by the lack of the [Ability to Attach Any File](<#5.9. Ability to Attach Any File>). Inability to attach even pdfs made me run away from Google Keep.

Although, I still use it, because of the [Collaborative Note Edits](<#5.18. Collaborative Note Edits>). I use it for shopping lists shared with my family members.

Also I use it for very long-term reminders, in few years, that Google Calendar doesn't support that long requirements, for instance for passport expiration dates.

I would prefer to have all my notes in one app so I am waiting when [Collaborative Note Edits](<#5.18. Collaborative Note Edits>) will be available in my app of choice, which I will describe at the end of this section.

![image-2022-04-30-19-50-04.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-04-30-19-50-04.png>)

## 6.4. 2018, 2020-2021 [Nimbus Notes](https://nimbusweb.me/)

I have a very toxic relationship with this tool. It has only one feature that I like: [Unlimited Folder Hierarchy](<#5.7. Unlimited Folder Hierarchy>). Everything else is so horrible.

I tried it in 2018 first while I still was with **Evernote** but it was buggy and unstable so I decided to come back later.

In 2020 I needed to have an app to share notes with my wife. She is an iPhone user. She showed that on her iPhone **Evernote** is horribly unusable, so I needed to have a tool for both of us. So I gave another chance to **Nimbus Notes**.

I even tried to migrate my notes from **Evernote** to **Nimbus Notes**. That experience was horrible and unreasonably slow. I created several bugs in their bug tracker but it didn't help much.

I quickly came back using **Evernote** for personal use and kept **Nimbus Notes** only to share notes and shopping lists with my wife.

But even shopping lists are horrible in this app. Shopping lists are lists with checkboxes. And if you are not begin super accurate and didn't tap inside the checkbox, this *brilliant* app thinks that you all over sudden decided to edit the caption. It is so annoying. I recorded a short video showing this scenario.

https://www.youtube.com/watch?v=cJln4B8IJjg

![video\_2022-04-30\_19-57-42.mp4.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-04-30_19-57-42.mp4.gif>)

![video\_2022-04-30\_19-57-42.mp4](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-04-30_19-57-42.mp4>)

## 6.5. [Simple Note](https://simplenote.com/)

[Ability to Attach Any File](<#5.9. Ability to Attach Any File>). This app doesn't even allow me to attach image to the note. That's an immediate NO from me.

## 6.6. [Standard Notes](https://standardnotes.com/)

[Ability to Attach Any File](<#5.9. Ability to Attach Any File>). This app doesn't even allow me to attach image to the note. That's an immediate NO from me.

## 6.7. [Notion](https://www.notion.so/)

I liked a lot the [idea](https://www.notion.so/help/create-a-database) about databases. I think it is fantastic.

But lack of [Fast Performance](<#5.4. Fast Performance>). Notion is horribly horribly slow. That's an immediate NO from me.

## 6.8. [Joplin](https://joplinapp.org/)

It looked promising for me. I even migrated all my **Evernote** notes into Joplin and used it a for a few days but first I was hit by the lack of [Fast Synchronization Between Devices](<#5.5. Fast Synchronization Between Devices>). The synchronization was so slow...

Then after some days of use, I got fed up with UI slowness overall. And I quit again.

## 6.9. Never! [OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app)

I would like to mention OneNote, which I could not use longer than one nanosecond every time I am trying to give it a chance.

It was release in 2003 and every few years I am trying to be brave and use it and I hate-hate-hate it.

This feature is **freeform canvas**. You can click at any spot on the page and type text, insert images there. While the ability to arrange content on the page looks interesting in rare scenarios, I would like to be able to do that only when I deliberately decided so.

https://www.youtube.com/watch?v=5aA3gy_8xaU

![2022-04-30\_22-20-09.mp4.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/2022-04-30_22-20-09.mp4.gif>)

![2022-04-30\_22-20-09.mp4](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/2022-04-30_22-20-09.mp4>)

## 6.10. 2021-2022 [Obsidian](https://obsidian.md/)

I am currently using this tool for over 5 months. It is not perfect, but I could overcome most of my disappointments so I would like to share my experience.

# 7. Obsidian Philosophy

Obsidian is a NTS based on [Markdown](https://www.Markdownguide.org/basic-syntax/) files stored in your filesystem.

Markdown is a plain-text markup language meant to be easily readable and writeable. [HTML](https://en.wikipedia.org/wiki/HTML) is also a markup language but it is pretty verbose and for quick noting is not suitable.

Having your notes in your filesystem and being responsible for backing it up and syncing between devices might sound like a step back to the old ages, but it just requires a bit of shifting your mindset.

Having plain texts in your filesystem turned out to be a cool thing. You are not limited by any tools. You can use any text editors of your choice to edit your notes, you can bulk search and replace in your notes without any limitations.

**Vault** is a certain folder that contains notes. Obsidian can switch between multiple vaults. So you don't have to keep all eggs in one basket. I personally prefer to use single vault but maybe at some stage I will decide to separate my home notes from my job notes.

# 8. Detailed Obsidian Feature Review

Let's go one by one of all my requirements and I explain how did I configure Obsidian to meet them

## 8.1. [Windows Native App](<#5.1. Windows: Native App>)

**Availability**: Full

https://obsidian.md/

It is an [Electron](https://www.electronjs.org/) app, which means basically it is running on top of Chrome. This means that if you are have front-end programming skills, you can debug Obsidian on the fly, including core functionality and third-party plugins. Just press `Ctrl + Shift + I` and debug it as you are doing as a front-end developer.

Obsidian is also available for macOS and Linux, but I never tried it there.

## 8.2. [Android Native App](<#5.2. Android: Native App>)

**Availability**: Full

https://play.google.com/store/apps/details?id=md.obsidian

It is based on [Capacitor](https://capacitorjs.com/) and it is pretty easy to debug it from your computer.

I won't get deeper into details, but [here](https://developer.chrome.com/docs/devtools/remote-debugging/) is the very simple guide how to debug your apps on your Android from your desktop.

Obsidian is also available of iOS, but I never tried it there.

## 8.3. [Notes Available Offline without Internet Connection](<#5.3. Notes Available Offline without Internet Connection>)

**Availability**: Full

It's a core feature of Obsidian. As notes are kept in your filesystem, so you don't depend on Internet connection at all.

## 8.4. [Fast Performance](<#5.4. Fast Performance>)

**Availability**: Windows: Full. Android: Requires Tweaks

On my experience, Windows app works super fast, even with tons of third-party plugins installed.

Android app works fine for relatively small vaults. But my vault is a bit bigger, so on Android it takes a few seconds to open and I explained before, having delays when you take notes is unacceptable.

99% of the usage of Obsidian from the phone is to take quick notes. Put some quick reminders. Share some pictures. Add them to the Inbox and then process them later from my Windows desktop. Other 1% of the usage is to actually search for the notes.

So I had to slightly give up on this requirement and rephrase it to

### 8.4.1. Adding New Notes Should Be Instant

It's the must to be able to write notes and being distracted as minimum as possible

### 8.4.2. Searching for Existing Notes Could Be with Insignificant Delay

As searching happens much more rarely, we can afford some delays if they are reasonable enough.

### 8.4.3. HINT Android: Split Vaults

I decided to have two separate vaults

`MyBigVault`

`MyBigVault\!Inbox\MobileVault`

As performance on Windows is fine, so we don't need to open `MobileVault` on Windows separately. We just work with `MyBigVault` all the time. As `MobileVault` sits inside `MyBigVault` so it looks just like usual subfolder.

On Android for [Adding New Notes Should Be Instant](<#8.4.1. Adding New Notes Should Be Instant>) we just open `MobileVault`. It is almost always empty, so it opens as fast as possible.

For [Searching for Existing Notes Could Be with Insignificant Delay](<#8.4.2. Searching for Existing Notes Could Be with Insignificant Delay>), we open `MyBigVault`. It might have slight delay but we already agreed that for this not too often scenario it is fine.

### 8.4.4. HINT Android: Prevent Obsidian From Closing

Startup delay of Obsidian on Android could be a few seconds and we want to avoid having it repeated. But Android has a feature of closing apps that we are not using too often. If you don't like their heuristics, it is better to switch it off. Different phone brands and Android versions might have slightly different UI for this setting

[Here](https://dontkillmyapp.com/) you can find instructions how to do this for your device model.

On my phone [OnePlus 7T Pro](https://dontkillmyapp.com/oneplus) I had to configure it in two places

![image-2022-05-01-08-02-35.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-08-02-35.png>)

and

![image-2022-05-01-08-17-46.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-08-17-46.png>)

Unfortunately this is not 100% bullet-proof and sometimes Android decides to do cleanup regardless of my settings but this happens not too often so it doesn't annoy me that much.

### 8.4.5. HINT Android: Custom Configuration Folder

Talking about `MyBigVault`, many of the plugins I use, needed only on Windows. Even if they work on mobile, I would like to deliberately decide if I want to use them on my phone or not. I want to be able to switch it on and off without affecting the vault on Windows.

To configure that, Obsidian allows to change the configuration folder, which is by default `.obsidian` and for phone I change it to `.obsidian_mobile`

`Options > About > Override config folder`

![image-2022-05-01-12-57-52.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-12-57-52.png>)

### 8.4.6. HINT Android: Clone Obsidian App

Having multiple vaults becomes a problem because Obsidian on Android works with one vault at a time. So if you need to work with multiple vaults, you will have to switch between them constantly and this takes time and annoying overall.

I came up with the idea of cloning Obsidian app, so I keep one copy of the app dedicated to `MobileVault` and another copy of the app dedicated to `MyBigVault`.

For cloning I use [App Cloner](https://appcloner.app/)

![image-2022-05-01-12-31-56.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-12-31-56.png>)

![image-2022-05-01-12-32-32.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-12-32-32.png>)

I made a clone `Obsidian2` with slightly different icon so I don't confuse them.

![image-2022-05-01-12-40-42.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-12-40-42.png>)

### 8.4.7. PROBLEM Android: Package Names

**UPD**. It turned out to be a bug in **App Cloner**. I identified it and contacted the **App Cloner** developer. The next version will contain the [setting](https://twitter.com/AppCloner/status/1525784274825265152) to overcome this misbehavior.

--

This cloning works some fundamental issue. You cannot have two different apps with the same package name. **App Cloner** creates a new package name for the cloned app. So original app has package name `md.obsidian` and cloned app has package name `md.obsidia==o==` (last letter changed). So functionality that depends on the package name stops working.

So far I found that searching for Community plugins stopped working.

![image-2022-05-01-09-31-05.jpeg](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-09-31-05.jpeg>)

When I debugged why is that happening I found that it fetches the following url, which clearly doesn't exist

[https://raw.githubusercontent.com/obsidianmd/obsidia==o==-releases/HEAD/community-plugin-deprecation.json](https://raw.githubusercontent.com/obsidianmd/obsidiao-releases/HEAD/community-plugin-deprecation.json)

At this stage I don't know how to make this fixed, so currently I can't install community plugins directly from my phone and I have copy them manually. It is annoying but I can't do better.

In the meanwhile I [reported](https://forum.obsidian.md/t/feature-use-hard-coded-string-md-obsidian-instead-of-android-package-name/36798) a feature request on the Obsidian forum to get it fixed.

### 8.4.8. HINT Android: `.nomedia`

If your vault has many images, your phone galleries app can get crazy trying to load and cache them and performance suffers badly.

So just create empty file `.nomedia` in your vault root. This will instruct Android Galleries not to look for images in that folder.

## 8.5. [Fast Synchronization Between Devices](<#5.5. Fast Synchronization Between Devices>)

**Availability**: Manual

Out of the box we have no synchronization at all. Obsidian team provided an [**Obsidian Sync**](https://obsidian.md/sync) service. I find its price unreasonably high ($10 per month).

I tried it but I found I don't like it that much because of its [limitations](https://help.obsidian.md/Obsidian+Sync/Limitations) . My vault is bigger than their limit `10 GB`. I have some files bigger than their limit `100 MB`.

**Obsidian Sync** keeps history, but there is no easy way to revert many notes to previous state in bulk. So I need to have more advanced history features.

So using **Obsidian Sync** doesn't really make much sense to me. I need a complete custom solution.

### 8.5.1. HINT Syncthing and Syncthing-Fork

From all the synchronization services I tried, I like the most [Syncthing](https://syncthing.net/).

However, I don't like regular Android Syncthing version. It doesn't go well with my vault which has many small files. Sometimes synchronization hangs or takes unreasonably long time.

I found [Syncthing-Fork](https://f-droid.org/en/packages/com.github.catfriend1.syncthingandroid/) that behaves much better with my vault.

### 8.5.2. HINT One-way Sync

In [HINT Android: Split Vaults](<#8.4.3. HINT Android: Split Vaults>) I described my separation of vaults. And it turned out that for my huge PKB `MyBigVault`, I don't actually need to edit it from my phone. Most of the time I just need to search there. Editing from mobile is tedious. So we can simplify our sync, by setting Windows configuration to be `Send Only` and Android configuration to be `Receive Only`. So Syncthing doesn't need to to worry about conflict resolution and will sync even faster.

#### 8.5.2.1. Windows: Configuration for `MyBigVault`

![image-2022-05-01-13-27-35.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-13-27-35.png>)

#### 8.5.2.2. Android: Configuration for `MyBigVault`

![image-2022-05-01-13-31-51.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-13-31-51.png>)

#### 8.5.2.3. Configuration for `MobileVault`

`MobileVault` has regular two-way sync configuration. I add notes only from mobile but process and remove them mostly from the desktop, so I need this deletion to be propagated.

#### 8.5.2.4. Configuration for `.obsidian_mobile`

Because of the [PROBLEM Android Package Names](<#8.4.7. PROBLEM Android: Package Names>), I can't install plugins in my I have to sync `.obsidian_mobile` two ways, so I can easily send some plugins from Windows to Android. Once [PROBLEM Android Package Names](<#8.4.7. PROBLEM Android: Package Names>) is solved, I might switch this folder to one-way sync, on mobile `Send Only`, on Desktop `Receive Only`.

### 8.5.3. HINT `.stignore-shared`

As `MobileVault` is a subfolder of `MyBigVault` (namely, `MyBigVault\!Inbox\MobileVault`) to make synchronization correct, we need to exclude it from Syncthing synchronization settings.

It can be done via UI

#### 8.5.3.1. Windows: Configuration

![image-2022-05-01-14-14-48.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-14-14-48.png>)

#### 8.5.3.2. Android: Configuration

![image-2022-05-01-14-15-58.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-14-15-58.png>)

Essentially UI just writes to the file `.stignore`. The format of the file is described in the [specification](https://docs.syncthing.net/users/ignoring.html).

But `.stignore` is not synced between devices, so you can choose what to ignore on each device. But I want this configuration to be synced, so I use the following idea

1. Manually create empty `.stignore-shared` file on each device
2. Manually configure `.stignore` file on each device to be like that

> [!note] .stignore
>
> ```
> #include .stignore-shared
> ```
>

There is a gotcha If `.stignore-shared` file doesn't exist and you try to include it in step 2, the synchronization won't even start. That's why step 1 was essential.

Now you can modify `.stignore-shared` and it will be synced across devices.

For me it looks like

> [!note] .stignore-shared
>
> ```
> .git
> .obsidian
> .obsidian_mobile
> /!Inbox/MobileVault

We will talk about `.git` later in section [8.13. Note Edit History](<#8.13. Note Edit History>)

`.obsidian` is excluded because as we discussed in [HINT Android Custom Configuration Folder](<#8.4.5. HINT Android: Custom Configuration Folder>) Android is configured to have its own set of settings.

`.obsidian_mobile` is excluded because as we discussed in [HINT One-way Sync](<#8.5.2. HINT One-way Sync>), it has its own Syncthing synchronization profile.

`/!Inbox/MobileVault` is excluded for the same reason described in [HINT One-way Sync](<#8.5.2. HINT One-way Sync>). However notice leading slash `/`. It is important because without it, exclamation mark `!` has a different [meaning](https://docs.syncthing.net/users/ignoring.html) and won't work as expected.

### 8.5.4. HINT `.keep`

Syncthing uses folder `.stfolder` as as marker of the folders it synchronizes. This folder is empty and sometimes for unknown reason it is being removed and then Syncthing stops syncing and complains until the folder is recreated. To prevent this from happening, there is a workaround. Put any file in this folder. While technically it could be any file, there is a [common practice](https://stackoverflow.com/questions/7229885/what-are-the-differences-between-gitignore-and-gitkeep) to call this file `.keep` or `.gitkeep` .

I created `.stfolder\.keep` file and this issue never occurs to me anymore

## 8.6. [Fast Search](<#5.6. Fast Search>)

**Availability**: Full

Search in Obsidian is fast on Windows, and relatively fast on Android. However I found that actually I look for content not so often. I rely mostly on my note names. And searching by note names is even faster.

### 8.6.1. HINT Quick Switcher

For instant search by note name Obsidian has core plugin [Quick Switcher](https://help.obsidian.md/Plugins/Quick+switcher).

Shortcut for this feature is `Ctrl + O`.

Another useful feature of **Quick Switcher** is that if you type the path that doesn't exist and hit `Enter`, it will create you a note with that path.

### 8.6.2. HINT Android: Quick Action

On Android we have a feature pull-down Quick Action, by default it calls **Command switcher** but I changed it to **Quick Switcher** as I use it way more often.

To change it go to `Options > Mobile > Configure` and select `Quick Switcher: Open Quick Switcher`.

![image-2022-05-01-19-17-49.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-19-17-49.png>)

### 8.6.3. HINT Folder Notes

Quick switcher has some flaw: you can't navigate with it to folders. To overcome this I use community plugin [AidenLx's Folder Note](https://github.com/aidenlx/alx-folder-note) . This plugin allows creating **Folder Notes**. I add folder notes for all my folders. The easiest way to do that is to `Ctrl + Click` on the folder in Explorer pane. Now I can use **Quick Switcher** to navigate to the folder. Default naming is a bit weird `Path/to/Folder/folder.md` but still I find it useful for navigating via **Quick Switcher**.

![image-2022-05-07-18-45-55.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-07-18-45-55.png>)

![image-2022-05-07-18-45-10.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-07-18-45-10.png>)

### 8.6.4. HINT Hotkeys

Ok, now we can navigate to the folder using **Quick Switcher** but the main purpose of doing it is to quickly look through the notes in this folder. For that we need to use the following command `File explorer: Reveal active file in navigation`. To run commands we can use [Command Palette](https://help.obsidian.md/Plugins/Command+palette) or just press `Ctrl + P`. However, if you use certain command very often, calling it from the **Command Palette** is too annoying. Luckily, Obsidian allows to assign hotkeys for any commands.

![image-2022-05-01-22-27-31.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-22-27-31.png>)

### 8.6.5. HINT Android: Mobile Toolbar

We can't use hotkeys on Android so there I add the desired function to the mobile toolbar.

We go to `Options > Mobile > Add global command` and add `File explorer: Reveal active file in navigation`

![image-2022-05-01-22-38-24.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-22-38-24.png>)

![image-2022-05-01-22-42-34.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-22-42-34.png>)

And it adds the button that we can use it now

![image-2022-05-01-22-48-03.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-22-48-03.png>)

### 8.6.6. HINT Tag Pane

For navigation I use core plugin [Tag pane](https://help.obsidian.md/Plugins/Tag+pane). I can quickly look around my tags and find corresponding notes.

### 8.6.7. HINT Recent Files

I use community plugin [Recent Files](https://github.com/tgrosinger/recent-files-obsidian). This plugin keeps track of the notes I was opening lately and allows me to quickly switch to them.

## 8.7. [Unlimited Folder Hierarchy](<#5.7. Unlimited Folder Hierarchy>)

**Availability**: Full

Just works with some OS length limitations that I described [before](<#5.7. Unlimited Folder Hierarchy>).

## 8.8. [Unlimited Tags Hierarchy](<#5.8. Unlimited Tags Hierarchy>)

**Availability**: Full

No limitations. Tags could be added in two different forms: inline and YAML frontmatter. More details in the [spec](https://help.obsidian.md/How+to/Working+with+tags#Add+tags).

## 8.9. [Ability to Attach Any File](<#5.9. Ability to Attach Any File>)

**Availability**: Full

### 8.9.1. HINT Embedding Attachments

The [most common formats](https://help.obsidian.md/Advanced+topics/Accepted+file+formats) of pdfs, images, audio and video could be even [embedded](https://help.obsidian.md/How+to/Embed+files#Embed+attachments) into your notes.

### 8.9.2. HINT PDF Link to Page

You can also have a link to open pdf file on a certain page `[](../../../Tasks/The%20Real%20Numbers%20_%20Real%20Analysis/!!files/_common/book.pdf#page=42)`

### 8.9.3. HINT Windows: Drap & Drop

Files can be attached to notes by simple drag & drop to Obsidian note editor pane.

### 8.9.4. HINT Windows: Paste Image from Clipboard

Images can be pasted to notes from Clipboard.

### 8.9.5. HINT Android: Add Attachments by Sharing

It is great that you can send files to your vault just by using Android **Share** functionality

https://www.youtube.com/watch?v=LjjxZ5ltUVk

![video\_2022-05-05\_11-47-29.mp4.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-05_11-47-29.mp4.gif>)

![video\_2022-05-05\_11-47-29.mp4](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-05_11-47-29.mp4>)

There are some apps that don't allow you share things easily. And to deal with them I have an app [Sharedr](https://play.google.com/store/apps/details?id=com.rejh.sharedr) that improves sharing dialogs. The author [states](https://sharedr.rejh.nl/) his app won't work on Android 12+. I am on Android 12, and while the custom **Sharedr** UI doesn't work but it can be invoke from native Android Share dialog, it adds just one extra tap, but I still find it useful.

### 8.9.6. HINT dotfiles

Sometimes, especially after using [HINT Android Add Attachments by Sharing](<#8.9.5. HINT Android: Add Attachments by Sharing>), it may seem in your vault that the attachment is missing.

And I found that sometimes it is because the attachment name is a **dotfile**, i.e. starting with the dot `.` Some my files like `.facebook123.jpg` are not visible in the Obsidian app. But it is by design. There is a [feature request](https://forum.obsidian.md/t/enable-use-of-hidden-files-dotfiles-within-obsidian/26908) about those dotfiles. But in the meanwhile, you can just manually go to your vault folder and rename your **dotfile** attachments.

## 8.10. [Ability to Backup](<#5.10. Ability to Backup>)

**Availability**: Full

As your notes live in your filesystem, you have a full control over it and use any file-based backup system that you like.

## 8.11. [Portability](<#5.11. Portability>)

**Availability**: Almost Full

Your notes are in Markdown format, which is a well-known open file format. There are tons of tools that can read and write it. There are tons of converts to and from Markdown. So you can leave Obsidian at any time, take your vault, open any other text editor and you are free to go.

### 8.11.1. HINT Disable Wikilinks

When I said about feature availability I said **Almost**. That's because, unfortunately, Markdown has some design flaws and missing functionality. And in order to cover those flaws, people created many so-called Markdown flavors. Obsidian [uses](https://help.obsidian.md/How+to/Format+your+notes#Developer+notes) some combination of different flavors. Some of your notes might not work fully in other Markdown editors if you are using uncommon Markdown flavor feature.

I don't worry much about this level of portability. There is only one feature that I prefer not using, because I think it heavily affects portability. Obsidian team calls this feature [Internal link](https://help.obsidian.md/How+to/Internal+link) , but community more often calls them `Wikilinks`. The most likely those links will still work in other PKM software, but they will unlikely work in just Markdown editors.

**Wikilink syntax**

```markdown
[Other note](Other%20note)
```

**Corresponding Markdown link syntax**

```markdown
[Other note](../../Very%20long%20path/Nested%20folder/Other%20note.md)
```

Yes, I agree that Markdown link syntax is much heavier, verbose and hard to read. This url escaping with `%20` is really annoying. But, having relative path links make those link work in any Markdown editor.

I configured Obsidian to not use Wikilinks

![image-2022-05-01-20-29-23.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-01-20-29-23.png>)

I still take advantage of autocomplete that comes with this feature. I type `[[Other note`, autocomplete popup appears, I choose the desired note and Obsidian inserts Markdown link for me.

### 8.11.2. HINT Wikilink <-> Markdown Link Converter

There is community plugin [Obsidian Link Converter](https://github.com/ozntel/obsidian-link-converter) which can convert Wikilinks to Markdown links and vice versa.

## 8.12. [Ability to Generate Notes Programmatically](<#5.12. Ability to Generate Notes Programmatically>)

**Availability**: Full

Notes are in plain text files, so as soon as you can generate such files, you can achieve anything.

### 8.12.1. Use LF Line Endings

The only gotcha to know is that Obsidian notes have LF line endings. It has to be taken into account when you parse or generate notes. By default on Windows we have CR+LF line endings, so it requires a little extra effort to ensure we save notes with LF line endings.

## 8.13. Note Edit History

**Availability**: Windows: Basic, with additional effort - Advanced. Android: Basic.

Obsidian has core plugin [File recovery](https://help.obsidian.md/Plugins/File+recovery) which covers basic needs. You can see history of the specific note and revert to the previous state if needed.

### 8.13.1. HINT Version Control System for Obsidian

[File recovery](https://help.obsidian.md/Plugins/File+recovery) is not enough for me. I often do some experiments with my vault. I do massive note refactoring, text replacement. I need to be able to able to review history not file by file, but from the snapshot point of view.

As I do most of the notes editing from my Desktop, I really need my extended history features from Windows only. From Android I just add quick notes to Inbox, so I never need any local history. If I ever need to look at vault history from my phone, I can just open my private GitHub vault repository in browser and browse my **git** history from there.

As I am a programmer, for me it is natural to use Version control system (VCS). My favorite one is **git**.

Luckily there is a community plugin [Obsidian Git](https://github.com/denolehov/obsidian-git) that just automatically commits and pushes your notes regularly. This also covers basic scenarios.

### 8.13.2. HINT Managing Binary Attachments

Notes themself are plain text files so they are handled by **git** perfectly. But if you are heavily adding attachments to your notes, and especially if those attachments are big files, default **git** configuration won't be happy. Git is not really good for handling big binary files.

Usually people just exclude big files from their **git** repositories and keep history only for the text files. I don't want it that way. I keep important documents in my vaults. I would like to be able to track when did they change and why.

I used to keep my documents in Google Drive. And, yes, it also has some versioning which rescued me a few times. But this has to be done file by file, one by one. In case if you need to revert multiple files, this task becomes very tedious and annoying.

So I made my setup more complex but to cover this scenario as well. We need to install tool [git-annex](https://git-annex.branchable.com/) that helps to manage big binary files.

I have a bit more sophisticated setup which I am going to describe

```bash
cd F:\MyBigVault
git init
git annex init --version=10
git checkout master
git annex config --set annex.dotfiles true
git config core.longpaths true
git config core.safecrlf false
'' > .git/info/attributes
'* annex.largefiles=largerthan=0 filter=annex' >> .gitattributes
'*.md text eol=lf annex.largefiles=nothing !filter' >> .gitattributes
'**/.obsidian*/** text=auto eol=lf annex.largefiles=nothing !filter' >> .gitattributes
'.git* annex.largefiles=nothing !filter' >> .gitattributes
'.stignore text eol=lf annex.largefiles=nothing !filter' >> .gitattributes
git add .gitattributes
git commit -m 'Init git-annex'
```

Lines 1-2 - Initialize new git repo inside our vault.

Line 3 initializes **git-annex** for the repository. By default it is created with version 8 which has poorer performance. So we initialize it with the latest version (10).

Line 4 just comes back from the state **git-annex** went in, because it doesn't like Windows filesystems much.

Line 5 tells **git-annex** that we want it to track with it also **dotfiles**, i.e. files started with dot `.` This is important because Obsidian uses such folder **.trash** and Syncthing uses folder **.stversions** that can contain heavy binary files as well.

Line 6 makes git work fine with files in the vault that have path longer than 260 characters. We already [discussed](<#5.7. Unlimited Folder Hierarchy>) that limitation.

Line 7 disables annoying warning about text file line ending.

Line 8 disables built-in **git-annex** filter to allow more accurate configuration. That's because `.git/info/attributes` has higher [precedence](https://git-scm.com/docs/gitattributes) than `.gitattributes`.

Line 9 enables **git-annex** filter and marks every non-empty file to go through it. But for some files we will change this configuration below for performance improvements

Line 10 marks all Markdown files as text files with LF line ending, as it is the way Obsidian saves them. Also it completely disables **git-annex** for those files to improve performance and to enable proper file history.

Line 11 also marks all Obsidian configuration files to use LF line ending, as it is the way Obsidian saves them, but `text=auto` is added because potentially there are some binary files from some plugins. Also it completely disables **git-annex** for those files to improve performance and to enable proper file history.

Line 12 completely disables git configuration files from **git-annex** to improve performance and to enable proper file history.

Lines 14-15 save all the configuration we prepared.

This annex configuration looks unnecessary difficult. I initially thought of having much simpler configuration

```bash
git annex config --set annex.largefiles 'mimeencoding=binary and largerthan=0'
```

So I wanted to use **git-annex** for every binary file. `largerthan=0` required, because zero-sized files also considered as binary. And we may have empty Markdown files that we don't want to be considered as binary.

But this approach turned out to be not working. First, to determine if file is binary or not, it requires to read from file, and if you have many files, it will slow down the performance. And also I found a [bug](https://git-annex.branchable.com/bugs/mimeencoding_detection_is_not_working/) with this configuration when you have non-English file names.

### 8.13.3. HINT Backup Binary Attachments

You might also want to configure a remote repository to push your notes. I use for that private GitHub repository but it's really up to you.

Note, that your attachments are not pushed to GitHub, there are some **sort of symbolic links** pushed instead.

So don't get confused, your attachments are not backed up together with your notes to GitHub and for safety purposes you have to take care to backup your vaults regularly.

It's off-topic of this blogpost, so I won't get deeper into details, but if you are interested, you can use **git-annex** to do additional backup. [Here](https://git-annex.branchable.com/special_remotes/) you can connect your favorite backup methods. For instance, I chose [Backblaze B2](https://git-annex.branchable.com/tips/using_Backblaze_B2/).

Once I configured all the backup repositories, I wrote a script that automates this process.

### 8.13.4. HINT Proper Command for Syncing

There was some gotcha with **git-annex** remote syncing for me

```bash
git annex sync --content
```

Use `--content` flag. Without it **git-annex** just syncs metadata. It took me some time to figure it out.

Now I just put this sync script in the task scheduler and it syncs my attachments regularly, so I have multiple levels of backups now.

## 8.14. [5.14. Windows: Global Hotkey](<#5.14. Windows: Global Hotkey>)

**Availability**: Manual

Out of the box, Obsidian doesn't address this feature at all. There is a community plugin [Global Hotkeys](https://github.com/mjessome/obsidian-global-hotkeys) but it doesn't work the way I need, so I have to build a completely custom solution.

### 8.14.1. HINT Advanced Obsidian URI

Obsidian has core plugin [Obsidian URI](https://help.obsidian.md/Advanced+topics/Using+obsidian+URI) but I don't use it because it has one serious flaw for me. When you have open url from this plugin, you have your note title highlighted and you have to manually move to the note body.

That's why I use community plugin [Advanced Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri) . When you open its urls, it goes straight to the note body, which is essential for quick note creation.

### 8.14.2. HINT Templater

Obsidian has a core plugin [Templates](https://help.obsidian.md/Plugins/Templates) but I don't use it because it doesn't have some important functionality. Namely, I could not find a way to have focus on the note body instead of note tile.

So I use community plugin [Templater](https://github.com/SilentVoid13/Templater)

Let's configure **Templater** to create Inbox notes

![image-2022-05-02-00-53-09.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-00-53-09.png>)

![image-2022-05-02-00-54-15.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-00-54-15.png>)

> [!note] Templates/Inbox.md
>
> ```markdown
> ---
> created: <% tp.date.now('YYYY-MM-DD-HH-mm-ssZ') %>
> updated: 2022-04-29T15:02:19-06:00
> title: <% tp.date.now('YYYY-MM-DD-HH-mm-ss') %>
> > > ---
>
> # <% tp.date.now('YYYY-MM-DD-HH-mm-ss') %>
>
> **<% tp.file.cursor() %>**
> ```
>

The only essential for this section part is the last line, it moves cursor to the place where you can start typing

### 8.14.3. HINT Windows: AutoHotkey

[AutoHotkey](https://www.autohotkey.com/) allows you to create global hotkeys

> [!note] ObsidianGlobalHotkey.ahk
>
> ```
> #!n:
> FormatTime, formattedTime,, "yyyy-MM-dd-HH-mm-ss"
> Run obsidian://advanced-uri?vault=MyBigVault&filepath=!Inbox`%2FLaptop`%2F%formattedTime%.md&mode=new

This script creates a global hotkey `Win + Alt + N` which creates an Inbox note named with current timestamp and opens Obsidian on it.

As described in [HINT Advanced Obsidian URI](<#8.14.1. HINT Advanced Obsidian URI>), note body will be highlighted.

As described in [HINT Templater](<#8.14.2. HINT Templater>), cursor will jump straight to the point where you should type.

### 8.14.4. HINT Windows: Startup

Press `Win + R` and type `shell:startup`. It opens startup folder. You can add there `ObsidianGlobalHotkey.ahk` from [HINT Windows AutoHotkey](<#8.14.3. HINT Windows: AutoHotkey>) so it will run every time Windows starts up.

## 8.15. [5.15. Windows: Small Transparent Window on Top of Other Windows](<#5.15. Windows: Small Transparent Window on Top of Other Windows>)

**Availability**: Community Plugin

### 8.15.1. HINT Windows: Electron Window Tweaker

Community plugin [Electron Window Tweaker](https://github.com/mgmeyers/obsidian-electron-window-tweaker) allows you to set hotkeys to make Obsidian window on top of other windows and change it's transparency

![image-2022-05-02-02-03-07.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-02-03-07.png>)

## 8.16. [5.16. Android: Widget or Icon to Create Note Quickly](<#5.16. Android: Widget or Icon to Create Note Quickly>)

**Availability**: Manual

### 8.16.1. HINT Android: Tasker Obsidian Url

[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en&gl=US) is automation app for Android

I prepared a simple task that uses [HINT Advanced Obsidian URI](<#8.14.1. HINT Advanced Obsidian URI>) to create a note in `MobileVault`

You can just import the task [Create Obsidian Note Inbox](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+Obsidian+Note+Inbox)

### 8.16.2. HINT Android: Add Icon to Android Home Screen for Tasker Task

Then using [instruction](https://tasker.joaoapps.com/userguide/en/app_widgets.html) you can add an icon to the imported task to your Android home screen.

![image-2022-05-02-02-24-11.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-02-24-11.png>)

## 8.17. [Android: Create Note Quickly From Notification Panel](<#5.17. Android: Create Note Quickly From Notification Panel>)

**Availability**: Manual

### 8.17.1. HINT Android: Tasker + Notification Panel

We will need the task we imported in [HINT Android Tasker Obsidian Url](<#8.16.1. HINT Android: Tasker Obsidian Url>)

We also need to import three more tasks

- [Create Obsidian Note Inbox From Panel](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+Obsidian+Note+Inbox+From+Panel)
- [Create My Apps Panel](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Task%3ACreate+My+Apps+Panel)
- [Create My Apps Panel On Boot](https://taskernet.com/shares/?user=AS35m8nZ9sD1%2FxIVjX6K6DgLPOUXtRbEHJE54ht5LneI%2BOJROosFUUqvURHRkMYKzKcW&id=Profile%3ACreate+My+Apps+Panel+On+Boot)

![image-2022-05-02-02-51-16.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-02-51-16.png>)

I configured Tasker to show an icon near `Obsidian` but for some reason it is not shown. I created a bug for that https://www.reddit.com/r/tasker/comments/ub672b/notification_panel_icons_are_not_showing/?utm_medium=android_app&utm_source=share

## 8.18. [Collaborative Note Edits](<#5.18. Collaborative Note Edits>)

**Availability**: Windows: Community Plugin. Android: None

### 8.18.1. HINT Obsidian Social (Sekund)

I found a plugin [Obsidian Social (Sekund)](https://github.com/Sekund/sekund-plugin-react) that adds Collaboration. Unfortunately it works only on Desktop now.

I haven't tested it yet. Not so excited without mobile support. Waiting for the [mobile support](https://github.com/Sekund/sekund-plugin-react/issues/22) to be added.

## 8.19. [Share Note Externally](<#5.19. Share Note Externally>)

**Availability**: Windows: Full. Android: Horrible

On Windows, Individual notes can be exported as PDFs and then shared.

On Android, there is no way to do this from the Obsidian app directly. But if you install [Markor](https://play.google.com/store/apps/details?id=net.gsantner.markor) app, and manually find and open your Markdown file in your filesystem, you have an option to save it as pdf to the filesystem and only then share it. This is a lengthy horrible process.

For exporting entire vault there is paid service [Obsidian Publish](https://obsidian.md/publish) from Obsidian team. I think it's quite costy ($20 per month per site), but when I tried it, it worked fine for me. I just don't need this functionality for this money.

I tried some free alternatives, and none of them worked as good as **Obsidian Publish**.

## 8.20. [Ability to Extend Functionality with Plugins](<#5.20. Ability to Extend Functionality with Plugins>)

**Availability**: Full

Tons of [plugins](https://obsidian.md/plugins), big [community](https://obsidian.md/community).

## 8.21. [Windows Web Clipper](<#5.21. Windows: Web Clipper>)

**Availability**: Custom Plugin + Tweak

I need a tool that downloads webpage with attachments and supports main markup tags, such as tables.

### 8.21.1. HINT Windows: Chrome - MarkDownload

Chrome extension [MarkDownload](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi?hl=en-GB) seems to be the most feature-rich from all the Obsidian clippers I tried . It doesn't integrate with Obsidian directly so I have to tweak it a bit

Here is my exported configuration which you can import from extension options

```json
{
  "backmatter": "",
  "bulletListMarker": "-",
  "codeBlockStyle": "fenced",
  "contextMenus": true,
  "disallowedChars": "[]#^`",
  "downloadImages": true,
  "downloadMode": "downloadsApi",
  "emDelimiter": "*",
  "fence": "```",
  "frontmatter": "---\ncreated: {date:YYYY-MM-DD-HH-mm-ssZ}\nupdated: {date:YYYY-MM-DD-HH-mm-ssZ}

title: {date:YYYY-MM-DD-HH-mm-ss} {pageTitle}\naliases: \ntags: [{keywords}]\nsource: {baseURI}\nauthor: {byline}\n---\n\n# {date:YYYY-MM-DD-HH-mm-ss} {pageTitle}\n\n", "headingStyle": "atx", "hr": "---",
  "imagePrefix": "!!files/{date:YYYY-MM-DD-HH-mm-ss} {pageTitle}/",
  "imageStyle": "markdown",
  "includeTemplate": true,
  "linkReferenceStyle": "full",
  "linkStyle": "inlined",
  "mdClipsFolder": "MarkDownload",
  "saveAs": false,
  "strongDelimiter": "**",
  "title": "{date:YYYY-MM-DD-HH-mm-ss} {pageTitle}",
  "turndownEscape": true
}
```

![image-2022-05-02-03-37-46.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-02-03-37-46.png>)

### 8.21.2. HINT Windows: Symbolic Link

With my settings, **MarkDownload** downloads pages with attachments into folder `F:\Downloads\MarkDownload`

I want it to appear in my Obsidian instantly, so I created a symbolic link

```cmd
mklink /d /j F:\Downloads\MarkDownload\ F:\MyBigVault\!Inbox\Laptop\MarkDownload
```

So now **MarkDownlod** downloads everything directly in my vault where I process them with my usual workflow.

## 8.22. [Android: Quick Save Selected Text](<#5.22. Android: Quick Save Selected Text>)

### 8.22.1. HINT Android: Share Selected Text to Obsidian

You can share your text from almost any app where text is selectable with just Share dialog. I use it mostly to share urls from the browser address bar.

https://www.youtube.com/watch?v=G99gTnZSd7E

![video\_2022-05-05\_11-49-27.mp4.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-05_11-49-27.mp4.gif>)

![video\_2022-05-05\_11-49-27.mp4](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-05_11-49-27.mp4>)

### 8.22.2. HINT Android: Include Time to Daily Notes Naming

As I want the shared text to have the current timestamp. And you are not provided with many options when you are choosing where to add the shared content.

Luckily they added ability to add it to daily notes, which we are going to slightly abuse.

![image-2022-05-05-13-33-26.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-05-13-33-26.png>)

Why "**abuse**"? Because, I don't like losing the precise time part, so I configure **daily** notes to contain time as well, which ruins the literal meaning of word **daily**.

![image-2022-05-05-13-51-09.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-05-13-51-09.png>)

### 8.22.3. PROBLEM Templater is not triggered

As described in [HINT Templater](<#8.14.2. HINT Templater>), I configured **Templater** to add important for me metadata to every new note. But when you share note like in [HINT Android Share Selected Text to Obsidian](<#8.22.1. HINT Android: Share Selected Text to Obsidian>), **Templater** is not being triggered. So corresponding metadata is not filled. I could not find a way to workaround this.

Reported it as a comment to the [bug](https://github.com/SilentVoid13/Templater/issues/556).

# 9. My way to organize notes

I described my way of making Obsidian to meet my requirements. Now I would like to share some practices I came up with.

## 9.1. Prefix with exclamation mark `!`

If you start your files or folders with exclamation mark `!` they will appear on top with alphabetical sorting

## 9.2. Attachments folder

I keep attachments in the folder `{note folder}/!!files/{note name}/` so my note assets sit close to the note itself but not mixed up with actual folders.

This custom attachments path are not supported by Obsidian. So I use two community plugins

### 9.2.1. [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)

This plugin allows to set attachment folder the way I wanted `./!!files/${filename}/`.

![image-2022-05-06-00-32-59.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-06-00-32-59.png>)

However this plugin has some issues that I fixed a month ago, but the plugin author still didn't merge them in.

I had to create my own temporary [fork](https://github.com/mnaoumov/obsidian-custom-attachment-location/releases/tag/0.0.8-unofficial), that includes my fixes, until it's merged into the main plugin.

You can install my fork manually downloading `main.js` from the link above or using [BRAT](<#10.27. [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat)>).

This plugin has one minor issue. Due to the way it works, it modifies one setting in `.obsidian/app.json` all the time and if you don't exclude it from the source control tracking, it will appear all the time in the changes history.

### 9.2.2. [Consistent attachments and links](https://github.com/dy-sh/obsidian-consistent-attachments-and-links)

This plugin allows to move all attachments into corresponding folders according to the configuration.

I was inspired by [Custom Attachment Location](<#9.2.1. [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)>) and implemented the same functionality in this plugin as well. I also fixed some minor issues and author merged them all. But he didn't build a new release with them yet.

That's why I had to create my own temporary [fork](https://github.com/mnaoumov/obsidian-consistent-attachments-and-links/releases/tag/1.0.8-unofficial).

You can install my fork manually downloading `main.js` from the link above or using [BRAT](<#10.27. [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat)>).

## 9.3. Take notes of any content you created

As I became disappointed with searching capabilities in modern social media platforms. It is very difficult to find content I created before. I started to save every valuable piece of content I created and use my vault as the primary storage place for my content.

Now I can easily find important posts I made in Facebook, Instagram etc. Bugs I raised in GitHub or questions raised on StackOverflow.

# 10. List of Obsidian Plugins I Use

## 10.1. [Advanced Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri)

Allows you to control many different features in Obsidian just by opening some URIs. Because they are just text and don't require any mouse clicks or keyboard inputs, they are perfect to automate your Obsidian workflow.

Described [above](<#8.14.1. HINT Advanced Obsidian URI>).

![image-2022-05-08-15-20-25.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-20-25.png>)

## 10.2. [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian)

Add improved navigation, formatting, and manipulation to markdown tables in Obsidian.

![basic-functionality.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/basic-functionality.gif>)

![image-2022-05-08-15-21-03.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-21-03.png>)

## 10.3. [AidenLx's Folder Note](https://github.com/aidenlx/alx-folder-note)

Add description, summary and more info to folders with folder notes.

Described [above](<#8.6.3. HINT Folder Notes>).

Requires [Folder Note Core](<#10.17. [Folder Note Core](https://github.com/aidenlx/folder-note-core)>).

## 10.4. [AidenLx's Folder Note - folderv Component](https://github.com/aidenlx/alx-folder-note-folderv)

Allows creating [folder overviews](https://github.com/aidenlx/alx-folder-note/wiki/folder-overview).

Requires [AidenLx's Folder Note](<#10.3. [AidenLx's Folder Note](https://github.com/aidenlx/alx-folder-note)>)

![image-2022-05-07-18-30-43.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-07-18-30-43.png>)

## 10.5. [Better CodeBlock](https://github.com/stargrey/obsidian-better-codeblock)

Enhancer the markdown code block in preview mode. Add title, line number to code blocks, you can click on the title to collapse or expand the block.

![image-2022-05-07-18-56-48.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-07-18-56-48.png>)

There is a [bug](https://github.com/stargrey/obsidian-better-codeblock/issues/1). The title capabilities breaks syntax highlighting in the latest versions of Obsidian.

The workaround is to use [Callouts](https://help.obsidian.md/How+to/Use+callouts) recently added to Obsidian.

```
> [!note] my-file.js
> ```js
> console.log("hello, world");
> console.log("bye, world");
> ```
```

![image-2022-05-07-18-59-41.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-07-18-59-41.png>)

## 10.6. [Collapse All](https://github.com/OfficerHalf/obsidian-collapse-all)

When your Obsidian file explorer is overloaded with open folders, close them all with a single click or command. Or, if you want to explore your folder tree, expand all folders.

![image-2022-05-08-15-19-37.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-19-37.png>)

## 10.7. [Consistent attachments and links](https://github.com/dy-sh/obsidian-consistent-attachments-and-links)

The plugin for [Obsidian](https://obsidian.md/) allows you to reorganize your vault to make it more consistent. Next, the plugin will automatically maintain the consistency of your library.

Described [above](<#9.2.2. [Consistent attachments and links](https://github.com/dy-sh/obsidian-consistent-attachments-and-links)>).

![image-2022-05-08-15-23-54.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-23-54.png>)

## 10.8. [Copy Image and URL in Preview](https://github.com/NomarCub/obsidian-copy-url-in-preview)

This plugin creates a Copy Image and Copy URL context menu in preview mode.

![image-2022-05-08-15-25-30.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-25-30.png>)

![image-2022-05-08-15-26-42.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-15-26-42.png>)

Android: Allows to share images via long tap.

https://www.youtube.com/watch?v=CCFBgKcHMRg

![video\_2022-05-08\_15-34-54.mp4.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-08_15-34-54.mp4.gif>)

![video\_2022-05-08\_15-34-54.mp4](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/video_2022-05-08_15-34-54.mp4>)

## 10.9. [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)

Customize attachment location with variables($filename, $data, etc) like typora.

Described [above](<#9.2.1. [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)>). Also moves attachments to corresponding folders if note is renamed or moved.

## 10.10. [Customizable Sidebar](https://github.com/phibr0/obsidian-customizable-sidebar)

This plugin allows you to add any command, including those of plugins, to the sidebar and assign custom icons to them.

![image-2022-05-08-16-13-25.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-13-25.png>)

## 10.11. [Dataview](https://github.com/blacksmithgu/obsidian-dataview)

Treat your Obsidian Vault as a database which you can query from. Provides a JavaScript API and pipeline-based query language for filtering, sorting, and extracting data from Markdown pages. See the Examples section below for some quick examples, or the full reference for all the details.

![image-2022-05-08-16-12-51.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-12-51.png>)

## 10.12. [Electron Window Tweaker](https://github.com/mgmeyers/obsidian-electron-window-tweaker)

Tweak various Electron window settings.

Described [above](<#8.15.1. HINT Windows: Electron Window Tweaker>).

![image-2022-05-08-16-15-27.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-15-27.png>)

## 10.13. [Excel to Markdown Table](https://github.com/ganesshkumar/obsidian-excel-to-markdown-table)

An Obsidian plugin to paste data from Microsoft Excel, Google Sheets, Apple Numbers and LibreOffice Calc as Markdown tables in Obsidian editor.

![153027044-d1b91515-d5ea-4624-ace1-654c4ceccdc1 (1).gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/153027044-d1b91515-d5ea-4624-ace1-654c4ceccdc1 (1).gif>)

![image-2022-05-08-16-15-55.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-15-55.png>)

## 10.14. [File Cleaner](https://github.com/Johnson0907/obsidian-file-cleaner)

It can help you clean up empty files and unused attachments in the obsidian vault.

![image-2022-05-08-16-18-29.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-18-29.png>)

## 10.15. [Filename Heading Sync](https://github.com/dvcrn/obsidian-filename-heading-sync)

This is a Obsidian plugin to keep the filename and the first heading of a file in sync.

![demo.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/demo.gif>)

![image-2022-05-08-16-39-05.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-39-05.png>)

I had to create my own temporary [fork](https://github.com/mnaoumov/obsidian-filename-heading-sync/releases/tag/1.6.1-unofficial), that includes my fixes, until it's merged into the main plugin.

You can install my fork manually downloading `main.js` from the link above or using [BRAT](<#10.27. [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat)>).

## 10.16. [Find unlinked files](https://github.com/Vinzent03/find-unlinked-files)

This plugin goes through your whole vault and searches for files, which are linked nowhere. In other words: Files with no backlinks.

![image-2022-05-08-16-46-47.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-46-47.png>)

## 10.17. [Folder Note Core](https://github.com/aidenlx/folder-note-core)

Provide core features and API for [folder notes](https://github.com/aidenlx/alx-folder-note).

Required by [AidenLx's Folder Note](<#10.3. [AidenLx's Folder Note](https://github.com/aidenlx/alx-folder-note)>).

## 10.18. [Go to Line](https://github.com/phibr0/obsidian-go-to-line)

This Plugin adds new Commands to go to specific Lines and Characters in Obsidian

![image-2022-05-08-16-50-29.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-16-50-29.png>)

## 10.19. [Hot Reload](https://github.com/pjeby/hot-reload)

If you develop plugins for [Obsidian.md](https://obsidian.md/), you may be familiar with the frequent need to either restart/reload Obsidian, or else go into its plugin settings to disable and re-enable the plugin you're working on.

Well, you don't need to do that any more. Just install this plugin, and let it do all the work

This plugin is not registered in the Obsidian community plugin registry. So you have install it manually.

## 10.20. [Indentation Lines](https://github.com/Arch-Storm/obsidian-indent-lines)

Creates connection-lines for ordered and unordered lists regardless of nesting etc.

The author stopped working on the plugin but the last available version still works fine for me.

![image-2022-05-08-17-38-54.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-38-54.png>)

## 10.21. [Linter](https://github.com/platers/obsidian-linter)

This Obsidian plugin formats and styles your notes with a focus on configurability and extensibility.

![image-2022-05-08-17-40-03.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-40-03.png>)

## 10.22. [Local images](https://github.com/aleksey-rezvov/obsidian-local-images)

The plugin finds all links to external images in your notes, downloads and saves images locally and finally adjusts the link in your note to point to the local image files.

![obsidian-local-images-sep2021.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/obsidian-local-images-sep2021.gif>)

![image-2022-05-08-17-41-37.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-41-37.png>)

## 10.23. [Markdown Table Editor](https://github.com/ganesshkumar/obsidian-table-editor)

An Obsidian plugin to provide an editor for Markdown tables. It can open CSV, Microsoft Excel/Google Sheets data as Markdown tables from Obsidian Markdown editor.

![155854358-fe7df44f-a9ad-42f4-b7e4-e8b639b4c7f8.gif](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/155854358-fe7df44f-a9ad-42f4-b7e4-e8b639b4c7f8.gif>)

![image-2022-05-08-17-42-41.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-42-41.png>)

## 10.24. [Number Headings](https://github.com/onlyafly/number-headings-obsidian)

Add numbers to headings in a doc with outline style numbering. For example, "1.1.2".

![image-2022-05-08-17-44-50.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-44-50.png>)

## 10.25. [Obsidian Git](https://github.com/denolehov/obsidian-git)

Simple plugin that allows you to back up your Obsidian.md vault to a remote git repository.

Described [above](<#8.13.1. HINT Version Control System for Obsidian>).

![image-2022-05-08-17-46-02.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-46-02.png>)

## 10.26. [Obsidian Link Converter](https://github.com/ozntel/obsidian-link-converter)

This plugin helps you to scan all your links in the vault and convert them to `WikiLinks` or `Markdown` format.

Described [above](<#8.11.2. HINT Wikilink <-> Markdown Link Converter>).

![image-2022-05-08-17-48-12.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-48-12.png>)

## 10.27. [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat)

**Beta Reviewers Auto-update Tester** or **BRAT** for short is a plugin that makes it easier for you to assist other developers with reviewing and testing their plugins and themes.

![image-2022-05-08-17-50-22.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-50-22.png>)

## 10.28. [Quick Explorer](https://github.com/pjeby/quick-explorer)

Enter Quick Explorer. It's menu-based and **keyboard-friendly**, stays out of your way when you aren't using it, and makes it super-easy to navigate from either the vault root or current folder, without needing to scroll through or collapse a zillion other folders to find what you're looking for. You can even **search by name within a folder**, just by typing.

![image-2022-05-08-17-58-24.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-58-24.png>)

![image-2022-05-08-17-59-07.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-17-59-07.png>)

## 10.29. [Recent Files](https://github.com/tgrosinger/recent-files-obsidian)

This plugin displays a list of most recently opened files in the sidebar.

Described [above](<#8.6.7. HINT Recent Files>).

![image-2022-05-08-18-01-33.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-01-33.png>)

![image-2022-05-08-18-01-10.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-01-10.png>)

## 10.30. [Shortcuts extender](https://github.com/ryjjin/Obsidian-shortcuts-extender)

The three key features of the plugin so far are:

- the ability to change the heading level of the text by pressing the shortcut
- the ability to clearing the markup of the selected text
- the ability to assign shortcuts to enter special characters - so that you can fully use the markdown markup if you write notes in a language other than English

![image-2022-05-08-18-05-46.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-05-46.png>)

![image-2022-05-08-18-05-53.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-05-53.png>)

## 10.31. [Tag Wrangler](https://github.com/pjeby/tag-wrangler)

This plugin adds a context menu for tags in the [Obsidian.md](https://obsidian.md/) tag pane, with the following actions available:

![image-2022-05-08-18-06-34.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-06-34.png>)

## 10.32. [Templater](https://github.com/SilentVoid13/Templater)

[Templater](https://github.com/SilentVoid13/Templater) is a template language that lets you insert **variables** and **functions** results into your [Obsidian](https://obsidian.md/) notes. It will also let you execute JavaScript code manipulating those variables and functions.

Described [above](<#8.14.2. HINT Templater>).

![image-2022-05-08-18-15-40.png](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/image-2022-05-08-18-15-40.png>)

# 11. How to migrate to Obsidian from other NTS

None of the tools I tried are perfect, and they still require some manual post-processing.

## 11.1. Migrate from [Nimbus Notes](<#6.4. 2018, 2020-2021 [Nimbus Notes](https://nimbusweb.me/)>)

I used [YANOM - Yet Another Note-O-Matic](https://github.com/kevindurston21/YANOM-Note-O-Matic).

It is not perfect, because Nimbus export doesn't include some metadata such as note updated date.

Luckily I found Nimbus database which is json-based so I could write some scripts to extract essential to me metadata.

```
C:\Users\[username]\AppData\Roaming\nimbus-electron\databases\[some id]\[some other id]\nimbusNoteDbItems3
```

## 11.2. Migrate from [Evernote](<#6.2. 2014-2021 [Evernote](https://evernote.com/)>)

I used the tools [Convert Evernote .enex notebooks to Markdown](https://github.com/dmuth/evernote-to-obsidian) and [YARLE - Yet Another Rope Ladder from Evernote](https://github.com/akosbalasko/yarle)

There is a gotcha. When you export `.enex` file from Evernote, the information about notebooks and notebook stacks is not preserved. I came up with the following workaround:

1. Open individual notebooks in Evernote
2. Select all notes in the notebook.
3. Assign to selected notes tag like `!export/NotebookStack1/Notebook2`.
4. Tags are preserved during export.
5. After you import your notes to Obsidian, you can move the notes into corresponding folders based on this `!export` tags.

# 12. Wrapping up

Thanks for everyone who reached this point. It took me a lot of effort to write it down. Any feedback is appreciated.

Stay tuned!

%% PUBLISH_END %%

![wordpress2.html](<./!!files/2022-05-08 Perfect Notes or My Journey to Obsidian/wordpress2.html>)

```
Я разродился огромным [URL=https://mnaoumov.wordpress.com/2022/05/08/perfect-notes-or-my-journey-to-obsidian/]постом[/URL] про заметки. Вкратце, остановился на [URL=https://obsidian.md/]Obsidian[/URL] c доработкой напильником
```
