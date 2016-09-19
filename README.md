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

[Install Chromium on Raspian Jessie](https://www.raspberrypi.org/forums/viewtopic.php?t=121195)

Now, you'll need to install the Node package manager, npm, as root:

    apt-get install curl
  
    curl -sL https://deb.nodesource.com/setup_5.x | bash -
  
    apt-get install --yes nodejs

Now, install Magic Mirror (still as root). This is going to install some config
files and an init script. 
  
    sudo npm install -g magic-mirror


Config
------

The config is stored at `/etc/default/magic-mirror`. You'll need to sign up for
a few services to use all the features. Once you have configured all the keys,
restart the mirror API:

      systemctl restart magic-mirror

Make Chromium Start On Boot
---------------------------

If you want Chromium to start up full screen mode as soon as the Pi boots:

    sudo mkdir -p ~/.config/autostart

    sudo nano ~/.config/autostart/autoChromium.desktop

And add the following:

    [Desktop Entry]
    Type=Application
    Exec=/usr/bin/chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://www.website.com
    Hidden=false
    X-GNOME-Autostart-enabled=true
    Name[en_US]=AutoChromium
    Name=AutoChromium
    Comment=Start Chromium when GNOME starts

### Layout

The `LAYOUT` config key controls where each module is rendered on the screen.
The screen is split up into 4 areas: "topLeft", "topRight", "bottomLeft",
"bottomRight". Each module exports one or more Angular directives (see their
documentation to get a list). Simply add each directive to one of the areas
and it will be rendered on the mirror.

The current supported directives:

* clock-simple

* google-calendar

* forecastio-simple

* cta-train-schedule

* uber-estimate

* inspirational-quote

### Forecast.io

* Register for a [Dark Sky Forecast API account](https://developer.forecast.io/register)
 
* Copy the API key at the bottom to the `FORECASTIO_KEY` value in the config
  file.

### Google Calendar

(Grabbed from [Google Calendar Node.js Quickstart](https://developers.google.com/google-apps/calendar/quickstart/nodejs#prerequisites))

* Use [this wizard](https://console.developers.google.com/start/api?id=calendar)
  to create or select a project in the Google Developers Console and
  automatically turn on the API. Click Continue, then Go to credentials.

* At the top of the page, select the OAuth consent screen tab. Select an Email
  address, enter a Product name if not already set, and click the Save button.

* Select the Credentials tab, click the Create credentials button and select
  OAuth client ID.

* Select the application type Other, enter the name "Google Calendar API
  Quickstart", and click the Create button.

* Click OK to dismiss the resulting dialog.

* Click the file_download (Download JSON) button to the right of the client ID.

* Copy the text from the downloaded file and replace the `{}` for the 
  `GOOGLE_CALENDAR_CLIENT_SECRET` key

### Uber

* Sign up for an account at [Uber Developer](developer.uber.com/dashboard).

* Create a new app.

* Fill in the Name and Description field, agree to the terms, then hit
  "Create'.

* Copy "CLIENT ID" to `UBER_CLIENT_ID` in the config

* Click show below "CLIENT SECRET" and copy the key to `UBER_CLIENT_SECRET`

* Copy "SERVER TOKEN" to `UBER_SERVER_TOKEN`

* Copy whatever you filled in for Name to `UBER_APP_NAME`

* Find your latitude and longitude and fill them in for `LATITUDE` and 
  `LONGITUDE`. [This is a good site for finding them](http://mygeoposition.com/)

### Chicago "L" Train

* Apply for a [developer key](http://www.transitchicago.com/developers/traintrackerapply.aspx)

* Wait a few days

* Copy the key to `CTA_TRAIN_API_KEY`

* [Find your StopID here](http://www.transitchicago.com/developers/ttdocs/default.aspx#locations)
  and fill it in for `CTA_TRAIN_MAP_ID`

* This relies on your timezone being set to US Central. To set your time zone, run `sudo raspi-config`, select 'Internationalization options', 'Change Time Zone', then 'US', then 'Central'.
