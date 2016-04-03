angular.module('mirror')
    .directive('ctaTrainSchedule', function (CTATrain) {
      return {
        restrict: 'E',
        templateUrl: 'chicagoCTA/cta.html',
        link: function ($scope) {
          $scope.arrivals = CTATrain.arrivals;
        }
      }
    })
    .filter('minutesUntil', function () {
      "use strict";
      return function (input) {
        var now = moment();
        var datetime = moment(input, "YYYYMMDD HH:mm:ss");
        var until = Math.floor(datetime.diff(now) / (60 * 1000));
        console.log("FILTER", now, datetime, until)
        if (until <= 0) {
          return "Now";
        } else {
          return until;
        }
      }
    });
