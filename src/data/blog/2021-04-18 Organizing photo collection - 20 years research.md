---
description: A 20-year journey through photo organization tools concluding with Adobe Lightroom Classic CC, PhotoStructure, AntiDupl.NET, ExifTool, and two key plugins.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[photo-management](<../Tags/photo-management.md>)"
  - "[adobe-lightroom](<../Tags/adobe-lightroom.md>)"
  - "[exiftool](<../Tags/exiftool.md>)"
  - "[nas](<../Tags/nas.md>)"
  - "[productivity](<../Tags/productivity.md>)"
pubDatetime: 2021-04-18T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:56-06:00
title: "Organizing photo collection - 20 years research"
url:
  - https://mnaoumov.wordpress.com/2021/04/18/organizing-photo-collection-20-years-research/
disabled rules:
  - yaml-title
---

# 2021-04-18 Organizing photo collection - 20 years research

# **TL;DR**

If you just want to jump to the solution I found without reading all my 20 years struggles, see the following list. You will need all software from it

[PhotoStructure](https://photostructure.com/)

[AntiDupl.NET](https://ermig1979.github.io/AntiDupl/english/index.html)

[Adobe Lightroom Classic CC](https://www.adobe.com/products/photoshop-lightroom-classic.html)

**plugins**

[jb Video Metadata](http://lightroomsolutions.com/plug-ins/jb-video-metadata/)

[Any Tag](https://johnrellis.com/lightroom/anytag.htm)

# Intro

Hi folks

I would like to tell you about the problem that took me over 20 years to solve. That sounds really easy: **Organize photo collection**. But trust me, it is far from being easy. Or maybe I am just too dumb to see the easy solution. I will tell you my way and you are more than welcome to share your thoughts in the comments.

I realize that it is very hard to believe that there is no a good service to handle photos. There are millions of people with smartphones that take photos every day. And we have tons of services such as [Google Photos](https://photos.google.com/) or [Apple Photos](https://www.apple.com/ios/photos/). So, it is logical to think we have tons of way to have perfectly organized photo collections. But stay with me and I will tell you about everything I ever tried with their shortcomings.

# Photos and Videos

First of all, let's agree on the terminology. Whenever I say **photo**, most of the time I actually mean **photo or video**. I don't know the good term to combine **photo and video**. I tried to think of it as **media** **file** or **digital asset**. But at the end, I found it is more confusing I just gave up and just use term **photo**. Similarly **Google Photos** holds not only photos. And marketing name **Google Media** or **Google Digital Assets** doesn't sound too good. Whenever I need to refer to an actual **photo** (rather than **video**), I will call it **actual photo**.

# Requirements

What do I actually mean by **organizing** my photo collection?

1. I want to be able to quickly find the photo by multiple criteria such as date, location, people, event or any other metadata that I might want to add additionally.
2. I want to have my photo collection stored on the storage that I fully control.
3. I want to have an easy access to my photo collection from my phone, tablet and computer.
4. I want to be able to share my files/folders/albums with other people via hyperlinks.
5. I want to be able to easily add/edit asset's metadata and have it in the hierarchical form.

# 2001-2007 Messy

I started to organize my photo collections from around 2001. Back then I didn't have a digital camera so most of the photos I had where scans of the physical printed photos (here it is actual photos). From time to time I was getting photos from digital cameras from other people such as classmates from some common events. Unfortunately back then, I didn't realize the necessity of storing the metadata. So I had pretty much unorganized collection.

I had pretty much flat structure of folders like **Mom**, **Sister**, **I**, **Friend John**, **Friend Bob**, **School**, **Home** etc. I was putting all photos there accordingly and even tried to rename them to give them meaningful names such as **Sister laughs.jpg**, **Sister cries.jpg** etc.

The obvious issue with that approach is where to put the photo where mom stays with the sister? I had folders like **Mom and sister** but as you can guess this approach is not easy to maintain.

Another issue is that I didn't keep track of dates or events so in folder **Sister** you could see photos from multiple years and different events such as **Birthday, Xmas** etc without any way to identify those events later on.

# 2007-2010 Date/event Based

In 2007 I've got my own first digital camera. I started to take more photos and started to think more about organizing them better. I could recover some of dates and events from some of my older photos but most of the metadata is lost forever.

Starting from 2007 I keep my photos in **yyyy-MM-dd Event name** folder

**2007-09-22 Party**

**2009-12-27 - 2010-01-14 Israel**

**yyyy-MM-dd** format was chosen so when folders are sorted in the alphabetic order, it naturally sorts in the chronological order as well.

The problem with this approach is that most photos are made not during some dedicated event so we end up with

**2008-03-04\Mom**

**2008-03-04\Sister**

**2008-03-05\Mom**

**2008-03-05\Sister**

etc

**Pain1**. So if you don't know the exact date/event when some photo was taken, you will have to endlessly browse many many folders.

**Pain2**. And looking for photos in the sequential days was kinda a painful process. You enter one folder, look all photos there, go up, go to the next folder etc.

# 2010-2013 Google Picasa

[Google Picasa](https://en.wikipedia.org/wiki/Picasa) is a product discontinued since 2016 but back in 2010 I found it and felt a bit relieved. It had a pretty fast search engine and allowed to watch photos from folder with subfolders so it addressed my **Pain1** and **Pain2**

Moreover, it had a face-recognition module so I could automatically tag people on the photos where I didn't add them explicitly to the folder names. But I still had to review the people suggestions and correct them if needed. Picasa stored additional metadata inside **.picasa.ini** files in all collection folders but as I discovered later on...

**Pain3** Some crucial metadata **Google Picasa** was storing under its **ApplicationData** folder rather than inside my photo collection. I had no clue about it. So when I reinstalled Windows and I didn't know I had to backup any **Google Picasa**'s database, all my organizational metadata was gone. I was so disappointed losing so many hours of my efforts, so I didn't even want start it over.

So afterwards I was using **Google Picasa** only to browse my photos but never added any metadata in there.

# 2013 Google+, SkyDrive, Google Drive, Dropbox

In 2013 I realized that I should stop storing my photo collections on my computer or DVD-RWs and upload them into some cloud service. As I was already using **Google Picasa** it had an integration with [Google+](https://en.wikipedia.org/wiki/Google%2B) (it was discontinued in 2019) but this integration was more annoying than useful.

**Pain4** Does not support nested albums.

**Pain5** You cannot tag a person if it does not have an email. To tag my one-year-old son I used Leonid.Naumov@fakeemail.com, but this just looks ridiculous. Moreover Google+ doesn't remember emails if you don't have a person in your circles so autocomplete for next photos won't work.

Then I tried [Microsoft SkyDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage?rtc=1) (it was rebranded into **OneDrive** in 2014) and at least it supported nested folders so it solved my **Pain4**

**Pain6** SkyDrive's sync engine occasionally was deciding to reupload my entire 70 GB photo collection over and over.

**Pain7** I was also striked back with my **Date-based** folder structure because now my oldest photos were always on the top and when I want to see the most recent photos I had to endlessly scroll down.

To address **Pain7** I started to organize additionally photos by years

**2007\2007-12-31**

**2008\2008-01-01**

Then even by decades

**199x\1999\1999-10-03**

**200x\2007\2007-12-08**

**201x\2013\2013-03-21**

At least it helped with scrolling

I also tried [Google Drive](https://drive.google.com/) and [Dropbox](https://www.dropbox.com/) and they didn't solve any pain I had.

Overall I realized that generic file-based online storage is not a way to go. I need services dedicated to store/search/edit photos.

# 2014 Adobe Lightroom & Flickr

After those many years of struggling I couldn't believe there is no a way to organize photos efficiently and I tried to [ask](https://superuser.com/questions/715181/best-ways-to-organize-photo-collections) questions online. These days I disagree with something I was saying back in 2014 but still provide the link for historical reasons.

Some people told me that the best product on the market is [Adobe Lightroom](https://www.adobe.com/products/photoshop-lightroom-classic.html) (it was rebranded into **Adobe Lightroom Classic CC** in 2017).

Indeed, that was the best software I've used so far. It complied with most of my requirements. I didn't need its main functions related to editing photos such as changing brightness. But its organizational features were very awesome.

However, **Adobe Lightroom** is a computer-based program and I still needed to sync my photo collection with some cloud services. **Adobe Lightroom** had native integration with many services such as **Google+** or [Flickr](https://www.flickr.com/). I was already disappointed with **Google+** so decided to give **Flickr** a go.

**Pain8** I was immediately disappointed. All my metadata that I see correctly in **Adobe Lightroom** was gone in **Flickr**. Some photos even had incorrect dates. Then I found out that **Adobe Lightroom** stores all the metadata in its own database but when you upload photos into **Flickr** it doesn't see your changes.

I found the following menu item in the **Adobe Lightroom**:

![image-6.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-6.png>)

Moreover, it even has a Catalog Setting

![image-7.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-7.png>)

![image-8.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-8.png>)

So I learnt that writing metadata inside photo files themselves is crucial. It makes those files portable and accessible in other services.

**Pain9** Video files' metadata was not stored by **Adobe Lightroom**. So I have perfectly-organized video files in my **Adobe Lightroom**'s collection but I have no way to store the metadata back to files to be able to see them in cloud services such as **Flickr**

I was so disappointed so I've decided not to purchase **Adobe Lightroom** and find something better

# 2014-2018 Bargain

I was trying to convince myself that's some issue with me. How come I struggle with something so basic? Maybe I have OCD? Maybe my requirements are so stupid so I should let them go?

I have an Android smartphone with native integration with [Google Photos](https://photos.google.com/) (evolved from **Google+** in 2015)

I tried. I really tried to convince myself I don't need to have nested albums (**Pain4)**. It's fine to not have direct access to your own photos (**Requirement2)** etc

But **Google Photos** doesn't have a desktop client. It's UI capabilities is so limited. It's very slow and very limited for bulk operations.

At the end I ended up having only few albums in **Google Photos** and tons of poorly managed folders in my own filesystem.

I tried my best to bargain with myself but I just couldn't cope with lack of the functionality I consider to be essential.

# 2018 Monument

I found a promising product [Monument](https://getmonument.com/) that aims to address all the issues I had. I purchased that device and imported my library into it. It has many cool things such as face recognition or machine learning but

**Pain10** It completely ignores the keywords that my photo files have

All the efforts I spent adding keywords to my files **Monument** just ignores and suggests me to start from scratch through their app. And their app is far from being perfect. So I could not make much use of it

# 2020 Adobe Lightroom Classic CC Chance 2

I kept googling all those years and every time I was only finding that **Adobe Lightroom Classic CC** is still the best on the market. I decided to give it the second chance.

The first thing I checked if they finally fixed **Pain9** I had 6 years ago. Guess what? No! No! This issue they still have and they didn't bother to fix it for that many years despite the fact people are complaining for it for years on their forums (not only me complaining, as you might have assumed).

Well, I decided to be more proactive this time. At the end, I am a programmer. So I decided to try to solve my issues with Lightroom as I can't find any product with that many useful features.

I realized I will have to learn how to use [ExifTool](https://exiftool.org/) a lot. So I can set or correct all the metadata that I am interested in.

**Adobe Lightroom Classic CC** stores its database in the **MyCatalog.lrcat** file which actually is a **SQLite** database but most of the useful information in there is stored in the binary blob format so it requires some extra effort to decode it. I was asking around the Internet: [1](https://stackoverflow.com/questions/62825586/lightroom-sqlite-database-binary-xmp-format), [2](https://www.lightroomqueen.com/community/threads/lightroom-sqlite-database-binary-xmp-format.40692/), [3](https://community.adobe.com/t5/lightroom-classic/lightroom-sqlite-database-binary-xmp-format/m-p/11277989) and found a way how to read the data but not how to write it back. Moreover, it is not even recommended to mess up with this **.lrcat** database because this database format is totally undocumented and **Adobe** can change it in any further releases.

## Video Files Metadata

But luckily on these forums I was suggested to use the plugin [jb Video Metadata](http://lightroomsolutions.com/plug-ins/jb-video-metadata/). Essentially it calls **ExifTool** to save metadata from ****Adobe Lightroom Classic CC**** into video files' EXIF metadata. That was such a relief from **Pain9**. I found some essential issues with this plugin and suggested the author how to fix them and luckily he took my suggestions into considerations and now this plugin works as charm. It requires a bit of a discipline, though. It's very easy to forget to use it. So from time to time after I edited lots of metadata and there is a chance I modified some video files I filter only Video files and sort them via **Edit Time** so I can see the files I modified recently, select them and save metadata.

![image-2.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-2.png>)

## Reverse Geocoding

Another gotcha I found is a **reverse geocoding**. If your photos have GPS data and location columns are not set, ****Adobe Lightroom Classic CC**** automatically deduces **Country/State/City/Location** columns based on the GPS coordinates. But those automatically deduced columns are not being stored in the photo file's EXIF metadata until you manually confirm those columns. See this cursive values? That means those values are **Uncommitted**

![2021-04-18\_11-48-43.jpg](<./!!files/2021-04-18 Organizing photo collection - 20 years research/2021-04-18_11-48-43.jpg>)

In order to find such photos there is another plugin [Any Tag](https://johnrellis.com/lightroom/anytag.htm)

![image-3.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-3.png>)

You can find all photos that requires Location columns to be saved. You can then use **Commit Locations** function from the same plugin but it doesn't work for video files so I had to do a bit of semi-manual approach. I go through all new video files, filter them by **Country** (or other Location columns), select all files and set their values explicitly. And then I save those metadata back to the file using the plugin I described before.

![2021-04-18\_11-56-10.jpg](<./!!files/2021-04-18 Organizing photo collection - 20 years research/2021-04-18_11-56-10.jpg>)

## File Naming Conventions

I tried many approaches such as naming files after their timestamps and putting them into corresponding folders **yyyy\yyyy-MM\yyyy-MM-dd\yyyy-MM-dd-HH-mm-ss.jpg**

For example, **2021\2021-04\2021-04-18\2021-04-18-12-11-35.jpg**

Such approach is very popular, I found many people recommending something like that or with additional suffixes to avoid duplicate names. Well I tried that approach for many years and realized that storing timestamps in the file name is not as useful for photo viewing purposes. Hierarchical date filter in ****Adobe Lightroom Classic CC**** serves browsing needs way more conveniently. You can quickly jump from date to date much more efficiently that any folder structure could provide.

![image-5.png](<./!!files/2021-04-18 Organizing photo collection - 20 years research/image-5.png>)

Another problem with timestamp-based naming is when some of your files are not processed properly such as backup or upload tasks, it is way too difficult to find problematic files with that long names.

Basically just having files named with sequential numbers will be fine. But as file systems behave not too friendly when you have too many files in one folder, I decided to keep only 1000 files in one folder so I ended up with

**0001\0001.jpg**

**0001\0002.jpg**

**...**

**0001\1000.jpg**

**0002\1001.jpg**

**...**

**0002\2000.jpg**

**...**

I ensure that file timestamps are properly stored in the corresponding EXIF tags. And all other metadata that I used to store in the folder names or file names, I move to the corresponding keywords.

## Unknown Values

Sometimes I have photos (and especially videos) that don't have any metadata stored. It could be a photo came from scanner or file downloaded from social media or messengers. Normally for security reasons those social media and messengers stripe all the metadata, so you lose the information of when or where exactly the photo was taken. If I get such photos, I try to remember when they were taken and set datetime metadata accordingly. If I can remember where is the photo was taken, I use ******Adobe Lightroom Classic CC****'s Map Module** to set missing GPS data or at least as much location columns I could remember.

But sometimes you just don't know anything. For unknown dates I set date to be **1/1/1904** because it is a default value for **mp4** files without corresponding date info. As EXIF doesn't have a concept of **unknown date** we have to set it to some magic value, so **1/1/1904** is a fake date to represent **unknown date**. I also have a special keyword **Unknown Year** which I apply to mark that I have no clue when the corresponding photo was taken.

If I don't remember the exact date but at least I can guess the year I set date like **1/1/2021** and apply **Unknown Date** keyword. So I can distinguish the photos that were indeed taken on the New Year from photos from the unknown date.

Regarding Unknown location columns, ******Adobe Lightroom Classic CC****** shows then as **Unknown Country, Unknown State,** **Unknown City, Unknown Location**. Internally they are stored as blank values. But the problem with such blank values is that, if you ever modify unknown value to something and then want to clear it up, it won't show **Unknown Country** anymore. It will show you the last value before you clear it out.

So relying on the blank values is not reliable and I modify all **unknown/blank** values to **_ (underscore)** to explicitly save and ensure their values are preserved.

## Hierarchical Keywords

I had a root tag **!My keywords** where I put all my other tags. This helps me to easily distinguish keywords that I already organized from unorganized yet ones. Starting it with **! (exclamation mark)** ensures it will be always on top of the list of keywords sorted alphabetically.

I tend to store all the possible information in keywords.

For example, I have keywords **!My keywords | !Albums | Album 1** instead of storing this information just as ******Adobe Lightroom Classic CC******'s built-in collection. The problem with collection is that it is stored purely inside ******Adobe Lightroom Classic CC******'s database and completely not portable. With my keywords approach, I can easily recreate albums in any other photo organization software. You might find term **DAM** (**digital asset management)** as a more formal name for such software. Anyway, currently I am stuck with ******Adobe Lightroom Classic CC****** but I am ready to switch from it at any moment if I find anything better.

Another example if I have a photo that I want to have a special name, I don't use **Caption** or **Desription** fields as many software don't respect them. I just use **!My keywords | !Captions | My very cool caption**. Support for searching, browsing, exporting etc for hierarchical keywords generally more developed than for **Caption** or **Description** fields.

## Duplicates

As I had lots of approaches of organizing my photo collection, I had tons of backups and backups of the backups and they were very inconsistent, so I needed to find a way to quickly remove the duplicated photos even if files are not binary equal

I ended up with [AntiDupl.NET](https://ermig1979.github.io/AntiDupl/english/index.html)

It doesn't work with video duplicates, though, so I am still looking for a way to clean my collection from duplicated video in an good automated way with proper logging.

# 2020 Synology Photo Station, Synology Moments

Ok, let's assume for local organization of my library I settled with ******Adobe Lightroom Classic CC****** but that's all local. My **Requirement3** and **Requirement4** are completely not solved. I have **Synology DS218j** NAS at home and I was hoping to build my own photo server from it. It has an app [Photo Station](https://www.synology.com/en-global/dsm/feature/photo_station) and [Moments](https://www.synology.com/en-global/dsm/feature/moments) and I tried to use them.

**Moments** I stopped using almost immediately because it had the same **Pain10**

**Photo Station** looked more promising. It had its own gotchas, though. It wants all photos to be kept in **/var/services/photo** and I kept and synced them in some other directories so I had to fight with it to add some mounting, to fix indexing service etc.

But even after I made indexing working, it took around a week to index my ~50k files and even after that it for whatever reason many of my files were just ignored. It was so slow so it was impractical to keep using it.

# 2020 Adobe Lightroom CC (not Classic)

[Adobe Lightroom CC](https://www.adobe.com/products/photoshop-lightroom.html) is a completely separate product and it has its own cloud and mobile apps. It looked very promising so I was even considering to give up on my **Requirement2**. I tried to use it. It's so much limited in terms of functionality, so after **Adobe Lightroom Classic CC**, it's impossible to comfortably use **Adobe Lightroom CC (not classic)**. It also doesn't comply with **Requirement5** and they have only flat structure of keywords. I have way too many keywords for it to be practical to use in non-hierarchical form.

I tried to use the best of two worlds.

1. Organize my collection with **Adobe Lightroom Classic CC**.
2. Sync it to the Adobe Cloud.
3. Look what was not synced to the cloud.
4. Add non-synced files via **Adobe Lightroom CC** **(not classic)**.

It's a difficult process but I tried to follow it.

**Pain11** It's a one-time sync. If you edit any metadata in the **Adobe Lightroom Classic CC** after you synced that file to the cloud, it won't synchronize any metadata changes to the cloud.

This is just unacceptable and too critical for me to keep trying with it.

# 2021 Piwigo

I was looking again to self-hosted web galleries and I found one the seemed promising: [Piwigo](https://piwigo.org/). I installed in on my **Synology Web Station**. I had to install plugins to work with video files, parse EXIF tags etc. But it supports only flat keywords and all plugins to support hierarchical keywords are unsupported and outdated.

# 2021 PhotoStructure

Finally, I accidentally found something that is very promising: [PhotoStructure](https://photostructure.com/).

I found this product absolutely accidentally. I was pissed off and felt I have to start everything from scratch. I needed to find a self-hosted gallery that supports hierarchical keywords. And I googled [xmp HierarchicalSubject self hosted](https://www.google.com/search?q=xmp+HierarchicalSubject+self+hosted) and the second link introduced me to that project. It looks very-very promising. It was in a very pre-release stage since 2019 and I regret I couldn't find it before. Because even in pre-release stage it is significantly better than all products I used for past 20 years.

The author is very responsive to feedbacks and quickly fixes issues alpha testers are finding. I personally raised a bunch of issues in the forums that the author fixed.

There are only two steps left for me to be fully satisfied with this product.

- I am currently unable to run **PhotoStructure** server on my NAS **Synology DS218j**, because my NAS doesn't have a Docker support and I could not recompile all the required dependencies for it. I am planning to purchase a new NAS with Docker support and run **PhotoStructure** server there. In the meanwhile I ran **PhotoStructure** server locally on my laptop and opened ports for myself to be able to access it externally, e.g. from my mobile. It's nearly perfect and I am sure when I buy a new NAS, it will be even more perfect.
- Sharing photos is still not implemented so my **Requirement4** is still not met but I am sure it won't take too long and all my needs will be finally satisfied.

Thanks to everyone that could read till this point. I know this was a long text but I had to share my experience with you, folks.

Stay tuned!
