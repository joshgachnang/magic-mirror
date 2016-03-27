angular.module('mirror')
    .service('Calendar', function ($interval, $http, $log) {
      var Calendar = {
        calendars: []
      };

      // Query the server for updated calendars
      function refreshCalendars() {
        $log.debug("Refreshing calendars");
        $http({
          method: 'GET',
          url: '/calendars'
        }).then(function successCallback(response) {
          var calendars = _.flatten(response.data);
          Calendar.calendars = _.sortBy(calendars, function (calendar) {
            if (calendar.start.dateTime && calendar.end.dateTime) {
              return calendar.start.dateTime;
            } else if (calendar.start.date) {
              return calendar.start.date;
            }
          });
        });
      }

      // Refresh every 5 minutes
      $interval(refreshCalendars(), 5 * 60 * 1000);
      refreshCalendars();

      return Calendar;
    });
