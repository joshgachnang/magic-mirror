angular.module('mirror')
    .directive('stayFresh', function ($interval, $http) {
      return {
        restrict: 'E',
        templateUrl: 'stayFresh/stayFresh.html'
      }
    });
