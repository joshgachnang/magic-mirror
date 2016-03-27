var stopId = '41320';
var key = '16b6a300e3da4a1da1e901413559d75d';

angular.module('mirror')
    .service('CTATrain', function ($http, $interval, $log) {
      var CTA = {
        arrivals: {}
      };

      function refreshArrivals() {
        $http({
          method: 'GET',
          url: '/ctaArrivals'
        }).then(function successCallback(response) {
          for (var member in CTA.arrivals) delete CTA.arrivals[member];
          for (let arrival of response.data) {
            if (!CTA.arrivals[arrival.stopDescription]) {
              CTA.arrivals[arrival.stopDescription] = []
         }
            CTA.arrivals[arrival.stopDescription].push(arrival);
          }
          $log.debug("Refreshed CTA arrivals", CTA.arrivals);
        });
      }

      $interval(refreshArrivals, 30 * 1000);
      refreshArrivals();

      return CTA;
    });
