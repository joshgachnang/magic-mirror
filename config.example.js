module.exports = {
  MODULES: [
      "./chicagoCTA",
      "./clock",
      "./forecastio",
      "./googleCalendar",
      "./quote",
      "./uber"
  ],
  UBER_CLIENT_ID: '',
  UBER_CLIENT_SECRET: '',
  UBER_SERVER_TOKEN: '',
  UBER_APP_NAME: 'MAGIC_MIRROR',
  LATITUDE: 41.000,
  LONGITUDE: -87.000,
  CTA_TRAIN_API_KEY: '',
  CTA_TRAIN_MAP_ID: '41320',
  FORECASTIO_KEY: '',
  GOOGLE_CALENDAR_CLIENT_SECRET: {},
  QUOTES: [
    "Look at that sexy dude!",
    "Woah, stylin' today",
    "Damn guuuurrrrl",
    "Such sexy, much handsome, wow",
    "You are having a great hair day",
    "I'm jealous of that shirt",
    "Go kick some ass today!"
  ],
  TRIGGR_API_URL: 'http://localhost:1337/api/v1',
  TRIGGR_API_KEY: '',
  LAYOUT: {
    topLeft: [
      "clock-simple",
      "cta-train-schedule",
      "uber-estimate"
    ],
    topRight: [
      "forecastio-simple",
      "google-calendar"
    ],
    bottomLeft: [
      "reason-sober"
    ],
    bottomRight: [
      "inspirational-quote"
    ]
  }
};
