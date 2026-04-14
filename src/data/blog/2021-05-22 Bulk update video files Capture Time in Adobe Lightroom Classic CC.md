---
description: Two methods for bulk-updating video capture time in Lightroom using ExifTool and the jb Video Metadata plugin, working around SDK limitations.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[adobe-lightroom](<../Tags/adobe-lightroom.md>)"
  - "[exiftool](<../Tags/exiftool.md>)"
  - "[video](<../Tags/video.md>)"
  - "[photo-management](<../Tags/photo-management.md>)"
pubDatetime: 2021-05-22T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "Bulk update video files Capture Time in Adobe Lightroom Classic CC"
url:
  - https://mnaoumov.wordpress.com/2021/05/22/bulk-update-video-files-capture-time-in-adobe-lightroom-classic-cc/
disabled rules:
  - yaml-title
---

# 2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC

Hi folks

Adobe Lightroom Classic CC is my favorite photo organization software but its support for video files metadata is pretty limited.

Today I want to talk about how **to update the Capture Time of the video file**.

We can do it manually if we modify just one file.

![image-1.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-1.png>)

![image.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image.png>)

We can select multiple files and invoke the same **Edit Capture Time** functionality but it is almost never the desired result as it just calculates the difference between previous time of one selected file and newly set time and applies this difference to all selected files.

So it's much easier to to do that outside of the Lightroom. E.g., using **ExifTool**

```shell
exiftool -DateTimeOriginal=2021:05:22:12:34:56 path/to/video1.mp4
exiftool -DateTimeOriginal<FileName -dateFormat "%Y-%m-%d-%H-%M-%S". path/to/2021-05-21-11-22-33.mp4
...
```

So we've got bunch of files with updated DateTimeOriginal which we would like to import back to Lightroom Unfortunately Lightroom's **Read Metadata from File** doesn't work for video files.

There is an awesome plugin [jb Video Metadata](http://lightroomsolutions.com/plug-ins/jb-video-metadata/) that was made to improve the missing Read/Save Metadata for video files. But due to the Lightroom SDK limitations setting dates via plugin is not possible.

I found two ways to achieve the desired result

# Method 1. Remove and Reimport

## 1\. Save All Metadata to the File Using **jb Video Metadata** Plugin

![image-2.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-2.png>)

## 2\. Remove the File From the Lightroom Catalog

![image-3.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-3.png>)

## 3\. Then Reimport Them Back

![image-4.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-4.png>)

![image-5.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-5.png>)

However, this method has an issue. Not everything can be stored in the file metadata. So with this method it something can be lost. For example, your Collections (Lightroom's term for Albums) containing the processed video files, won't readd those files back.

# Method 2. File Creation Date

## 1\. Save Capture Time to FileCreateDate

exiftool -FileCreateDate<DateTimeOriginal path/to/video1.mp4

## 2\. Import in Lightroom

![image-6.png](<./!!files/2021-05-22 Bulk update video files Capture Time in Adobe Lightroom Classic CC/image-6.png>)

This can be done in bulk and doesn't have any shortcomings.

Stay tuned.
