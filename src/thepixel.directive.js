/* global angular */
angular.module('j3lte.thePixel')
    .directive('thePixel', ['$compile', 'pixelService',function ($compile, pixelService) {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            template: '<div class="thepixel" ng-click="action()"></div>',
            controller: function($scope, $element, $attrs){
                var action;

                if ($attrs.thePixelShow) {
                    var act/*, args*/;
                    var matches = $attrs.thePixelShow.match(/(^.*?)\((.*?)\)/);
                    act = matches ? matches[1] : $attrs.thePixelShow;
                    // TODO: add arguments to action
                    //args = matches ? matches[2] : null;
                    /*switch(act) {
                        case 'rand':
                            action = pixelService.random;
                        break;
                        default:
                            action = pixelService.time;
                        break;
                    }*/
                    action = (act === 'rand') ? pixelService.random : pixelService.time;

                } else {
                    action = pixelService.time;
                }

                $scope.action = function () {
                    var output = ($attrs.thePixelEncode && $attrs.thePixelEncode === 'true') ? pixelService.encode(action()) : action();
                    alert(output);
                };
            },
            compile: function(element, attrs) {

                switch(attrs.thePixel) {
                    case 'random':
                        element.addClass('random');
                    break;
                    default:
                        element.addClass('static');
                    break;
                }

                if (attrs.thePixelPosition) {
                    // the-pixel-position accepts a position as "<absolute|fixed>,<top px>,<left px>"
                    var positionArray = attrs.thePixelPosition.split(',');
                    if (positionArray.length === 3 && attrs.thePixel !== 'random') {
                        if (positionArray[0] === 'absolute' || positionArray[0] === 'fixed') {
                            element[0].style.position = positionArray[0];
                            var v = parseInt(positionArray[1], 10);
                            var h = parseInt(positionArray[2], 10);
                            if (v >= 0) {
                                element[0].style.top = v + 'px';
                            } else {
                                element[0].style.bottom = (0 - v) + 'px';
                            }
                            if (h >= 0) {
                                element[0].style.left = h + 'px';
                            } else {
                                element[0].style.right = (0 - h) + 'px';
                            }
                        }
                    }
                }

                if (attrs.thePixelColor) {
                    if (attrs.thePixelColor === 'rand') {
                        element[0].style['background-color'] = '#' + pixelService.randomColor();
                    } else {
                        element[0].style['background-color'] = attrs.thePixelColor;
                    }
                }

            }
        };

}]);
