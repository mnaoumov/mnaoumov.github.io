---
description: Story of working around a completely broken Android screen using USB OTG mouse, AirDroid, and blind navigation to restore phone access.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[android](<../Tags/android.md>)"
  - "[hardware](<../Tags/hardware.md>)"
  - "[troubleshooting](<../Tags/troubleshooting.md>)"
pubDatetime: 2015-12-29T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:55-06:00
title: "Broken phone screen or 99% success = fail"
url:
  - https://mnaoumov.wordpress.com/2015/12/30/broken-phone-screen-or-99-success-fail/
disabled rules:
  - yaml-title
---

# 2015-12-29 Broken phone screen or 99_ success = fail

Hi folks

I'd like to share my fail story I've got yesterday.

**Preamble (you may skip it)**

I am using Nexus 5 smartphone for 2 years already and I like it very much.

![image-2022-03-28-07-44-32.png](<./!!files/2015-12-29 Broken phone screen or 99_ success = fail/image-2022-03-28-07-44-32.png>)

I've already replaced its screen three times.

First time, I replaced it in 1.5 years ago after my first 1.5 years old son dropped it on tiles in bathroom and the screen cracked.

Second time, I replaced it 4 months ago after my second 6 months old son sucked it so my touch screen stopped to work in some areas.

Then 3 days ago I replaced it again because my second son sucked it again and broke touch screen again.

His saliva is poisonous, he also sucked my wife's iPhone 4S and after that its Home button stopped to work.

So now we are strictly prohibit him to take any sensitive gadgets :)

**Main story**

Yesterday, my phone's screen suddenly stopped to work. Half of it blacked out and other half got color bars on it

Unfortunately the photo of that screen is lost due to a stupid iPhone's Horizon app which I used as a Camera and it pretended the photo was shot, but it was not.

Similar but not exact look was like

![image-2022-03-27-18-00-28.png](<./!!files/2015-12-29 Broken phone screen or 99_ success = fail/image-2022-03-27-18-00-28.png>)

Initially touchscreen worked (at least on the visible half) but quickly it stopped to work as well.

I needed to make it working at least somehow, because I didn't have a spare phone to put my SIM in.

I wanted to install some software to see my phone screen remotely, so I could see what happens on my screen, who called me, read SMS etc. It's like a TeamViewer's access PC from phone but I needed a reversed scenario.

Fortunately, I can install programs on my phone via Google Play from computer without touching phone. I found and installed [AirDroid](https://play.google.com/store/apps/details?id=com.sand.airdroid&hl=en)

But I still needed to unlock my phone to configure app's requirements.

My screen was not working so that's a tricky part.

And I've managed to do that. I have USB OTG cable

http://techonsiteph.com/wp-content/uploads/2014/06/usb_otg.jpg

And I connected my USB hub for wireless mouse and keyboard to the cable and could use mouse to access my phone's screen.

So I unlocked it and tried to launch the app. But remember I could see only right half of the phone so it's tricky to get something from the invisible left half of it.

Unfortunately, my phone had a setting to disable auto-rotate so I could not see more by rotating my phone to 90°

I remember that this auto-rotate was on quick settings panel (on the very top) but this button was hidden.

I googled default quick settings screenshot for Android 6.0 and found

http://www.naldotech.com/wp-content/uploads/2015/10/system-ui-tuner-marshmallow-696x392.jpg

So I found that my button should be left to the flashlight button and I moved my mouse to the left and blindly clicked. And... Hurrah... I turned auto-rotate on. WIN!

Then I've managed to run the installed **AirDroid** app and enter credentials. Here wireless keyboard helped a lot. On-screen keyboard would be challenging. WIN!

After that I could see in this app on my PC a list of missed calls and SMS

But I wanted to see a full screen and control it. The app told me that in order to use that functionality I have to go to the settings and enable USB Debugging Mode. It was pretty challenging, because I could not see settings names often (the mostly on the left half screen). But after some (very long!!!) time I've managed to enable the **USB Debugging Mode**. Remember, I was using USB mouse all the time. WIN!

Now I needed to connect my phone to PC via USB so I did and it showed me a screen where I needed to confirm that I allow to debug from that computer. But wait a minute, I can't do that!!! I connected phone to PC so my mouse is disconnected. If I connect mouse, I disconnect it from PC. So I am nearly there, I just need to confirm the USB debugging mode and I can't. FAIL!!!

**Epilogue**

I gave up on the idea to use the phone remotely and started to wait for the repairer who changed my screen 3 days ago.

He took my phone but couldn't find any reasons for the issue. He said he waits for some reply from the screen shipper and this may take some time, and also there are public holidays coming, so potentially I can wait for more than a week.

I needed a temporary phone. My internet banking is linked to my mobile number. So in order to login and perform any operations, I need to receive and type my bank SMS.

He didn't have a spare phone to give me temporarily. And I don't have any mobile phone shops in a walking distance from home. So I gave up. I took a taxi and ask the driver to bring me to the closest mobile phone shop. So he did. And I bought used Nokia 1100

http://www.phonekade.com/uf/classifieds/2223-classifieds-10262455_1.jpg

I paid ~ $12 for it. But now I can at least receive calls and SMS.

I came home and came back to work and soon I received a call from the repairer who said that he'd managed to order, receive the spare screen and fixed it for me. I came and took it! Problem is gone!

BTW. I enabled the USB debugging mode and can see my phone screen on PC after connecting to USB once (I may disconnect phone then)

**Moral**

Always have a spare phone to be able to take calls and SMS in case if your main phone dies suddenly.

Stay tuned
