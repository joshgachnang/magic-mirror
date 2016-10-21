angular.module('mirror')
    .directive('reasonSober', function($interval, $http, $log) {
      return {
        restrict: 'E',
        templateUrl: 'reasonSober/reasonSober.html',
        link: function($scope) {

          function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }

            return array;
          }

          function pickReasons() {
            $log.info('Refreshing reason sober');
            $http({
              method: 'GET',
              url: '/reasonSober'
            }).then(function successCallback(response) {
              let reasons = shuffle(response.data);
              $scope.reasons = reasons.slice(0, 5);
            });
          }

          // Pick new reasons every 5 mins
          $interval(pickReasons, 5 * 60 * 1000);
          pickReasons();
        }
      }
    })
    .filter('capitalize', function() {
      return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
      }
    });
