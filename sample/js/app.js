(function (angular) {
    'use strict';
    angular.module('sample-app', ['j3lte.thePixel'])
    .controller('appCtrl', ['$scope', function mainCtrl($scope) {

            $scope.customAction = function() {
                alert(1);
            }
    }]);

})(angular);