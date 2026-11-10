---
layout: ../../layouts/AboutLayout.astro
title: "Plugin sync data folder"
---

Some of my Obsidian plugins keep data in your vault, as ordinary files, so that it travels between your devices with the rest of the vault. That data lives in a folder at the root of the vault, called `@Plugin sync data (DO NOT REMOVE)` by default. This page explains what is in it and how to look after it.

## What the folder holds

Each plugin writes into its own subfolder, named by the plugin's id, so the plugins sharing the folder never touch each other's files. What a plugin keeps there is **history**, not a cache. It cannot be rebuilt from anything else in the vault: once it is removed, it is gone.

Each folder that holds such data also has a `README.md` saying what the folder is for and linking here. The plugin rewrites that file whenever its text differs, so edits to it do not last.

## Do not remove or edit it

While any device synchronizes, do not delete, move or rename the folder or anything in it, and do not edit the files by hand. What is removed cannot be rebuilt, and an edited file can make the plugin stop rather than silently start a new, separate history. To be rid of the folder for good, stop synchronizing first, as each plugin's section below describes.

If you want the folder somewhere else, use the plugin's own setting for it, described below. That moves the data safely and keeps every device in step.

## Keep it synchronized on every device

The folder is only useful if every device that uses the vault receives it.

- **Obsidian Sync:** turn on **Sync all other types** in **Settings → Sync** on every device, because the history is stored as JSON files. Restart Obsidian after changing Sync settings. See [Obsidian Sync settings](https://help.obsidian.md/sync/settings).
- **Git, WebDAV or another tool:** make sure it includes JSON files and the folder itself, on every device. If you moved the folder into a hidden folder (one whose name starts with a dot), check that your tool synchronizes hidden folders too.

`Custom Attachment Location` checks the Obsidian Sync settings on the device you set it up on, but it cannot check your other devices, so check those yourself.

Hiding the folder from Obsidian's search, described next, does not stop it from synchronizing. The two are separate settings.

## Why it is in Excluded files

The plugin adds the folder to **Settings → Files and links → Excluded files**, so its files stay out of search, the graph and the quick switcher. When the folder moves, the plugin replaces only the entry it added itself. An entry you added yourself is never removed. A hidden folder gets no entry, because Obsidian never indexes it anyway.

## Custom Attachment Location

[`Custom Attachment Location`](https://github.com/mnaoumov/obsidian-custom-attachment-location) uses the folder to remember the name each attachment had when it arrived in the vault, so `{{originalAttachmentFileName}}` keeps giving the same answer after the attachment is renamed or collected. Its data is in the `obsidian-custom-attachment-location` subfolder.

The plugin writes to the folder only after you turn synchronization on, in **Settings → `Custom Attachment Location` → Original name storage**. Until then it keeps the names on this device only, and creates no folder. Each device opts in on its own, even if the plugin's settings arrive through sync.

A vault that already synchronized this data with an earlier version of the plugin keeps using the folder those versions used, `Plugin data`, so devices on one vault never split their history between two folders.

### When to turn it on

Turn synchronization on only when another device uses the vault **and** a template reads `{{originalAttachmentFileName}}`. On a single device, local history already keeps that token stable.

The **Original name storage** page tells each device which case it is in. **Set up Obsidian Sync** checks this device's Sync connection and its **Sync all other types** and **Excluded folders** settings, and refuses when they would keep the history from synchronizing. **Set up external sync** is always available, for Git, Syncthing, iCloud or WebDAV, because the plugin cannot see those tools.

### Moving the folder

1. Update the plugin on every device first. Older versions do not understand a moved folder.
2. In **Original name storage**, set **Plugin data folder** to a path inside the vault, such as `99-Meta/Plugin sync data`. To use a hidden folder such as `99-Meta/.plugin-data`, which only external sync tools can carry, also turn on **Allow hidden plugin data folders**.
3. Choose **Apply folder**, on one device only.

You do not need to repeat the move on your other devices. The plugin records the move in the original folder, and every device that has synchronization turned on reads that record and switches to the new folder by itself, as soon as its sync tool delivers it. Applying the same path on another device does no harm, but applying a different path there before the first move arrives is refused.

**Apply folder copies; it does not move.** The original folder stays in the vault for good, next to the new one, because every device opens it first to find where the history went. So applying a folder to get the original out of sight leaves you with two folders, not one. The plugin already keeps both out of search through **Excluded files**. To be rid of every folder, see [Stop synchronizing and remove the folders](#stop-synchronizing-and-remove-the-folders).

The plugin copies its own data to the new place and checks the copy. It refuses to go on if the new place already holds different data, rather than overwrite either one. If the move is interrupted, let the files finish synchronizing and choose **Apply folder** again with the same path.

Moving changes where new data is written. The old folder stays, and a device that was offline can still deliver data into it, so **keep every folder the plugin lists in its settings synchronized**, permanently. The plugin never deletes an old folder by itself.

**Never delete the original folder** (`@Plugin sync data (DO NOT REMOVE)`, or `Plugin data` in a vault that started on an earlier version) while any device synchronizes, even once every device has switched. It is where every device, including one you add later, looks first to find out where the data went.

### Stop synchronizing and remove the folders

The folders exist only for synchronization. To remove them for good:

1. On **every** device that uses the vault, open **Original name storage** and choose **Disable sync on this device**. A device that still synchronizes recreates the folder the next time it writes history, so do this everywhere first, including devices that are offline today.
2. Let your sync tool settle, then delete every folder listed under **History locations**: the original folder and every folder **Apply folder** moved the history to. Delete them on one device; the sync tool carries the deletion to the others.

What stays and what is lost:

- Each device keeps every original name it already knows, in its own local history, and keeps recording new ones. On a single device nothing changes.
- Devices stop sharing names. A template that reads `{{originalAttachmentFileName}}` then gives an attachment's original name only on the device that saw it arrive, so the same collect or rename can produce different names on different devices.
- A device added to the vault later starts with no history from the others.

The next time Obsidian starts, the plugin removes the **Excluded files** entries it added for the folders that are gone. You can turn synchronization on again at any time; it starts a new shared history from what each device has kept locally.

The plugin's [full documentation](https://github.com/mnaoumov/obsidian-custom-attachment-location/blob/main/docs/original-name-storage.md) covers the details, including recovery.
