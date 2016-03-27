Magic Mirror
============

This is a server and client for running a magic mirror display. It uses Node.js
as the backend server and an AngularJS frontend to run the mirror itself. It is
targeted at Raspberry Pi-based mirror.

Magic-mirror has a few modules currently:
  * Time
  * Current weather and forecast
  * Google calendar
  * Inspirational quotes
  * Chicago "L" transit schedule
  * Uber estimates

Feel free to add more functionality and submit a pull request!

Inspired by Michael Teeuw's [magic mirror post](http://michaelteeuw.nl/tagged/magicmirror).

Installation
------------

I'm currently targeting a Raspberry Pi 3 Model B with Raspbian Jessie installed
and the Chromium browser. Here's a few links to get you started:

[Install Raspbian](https://www.andrewmunsell.com/blog/getting-started-raspberry-pi-install-raspbian/)

[Install Chromium 48 on Raspian Jessie] (https://www.raspberrypi.org/forums/viewtopic.php?t=121195https://www.raspberrypi.org/forums/viewtopic.php?t=121195https://www.raspberrypi.org/forums/viewtopic.php?t=121195https://www.raspberrypi.org/forums/viewtopic.php?t=121195https://www.raspberrypi.org/forums/viewtopic.php?t=121195)

Now, you'll need to install the Node package manager, npm, as root:

  apt-get install curl
  
  curl -sL https://deb.nodesource.com/setup_5.x | bash -
  
  apt-get install --yes nodejs

Now, install Magic Mirror (still as root). This is going to install some config
files and an init script. 
  
  npm install -g magic-mirror

