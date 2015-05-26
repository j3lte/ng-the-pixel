/* global angular */
angular.module('j3lte.thePixel', []);
/* global angular */
angular.module('j3lte.thePixel')
    .service('pixelService', [function() {
        'use strict';

        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var getTime = function() {
            return Math.floor(new Date() / 1000);
        };

        var getRandom = function() {
            return Math.floor(Math.random() * 1e9);
        };

        var getRandomColor = function () {
            return Math.floor(Math.random()*16777215).toString(16);
        };

        var encode64 = function(input) {

            if (window.btoa) {
                return window.btoa(input);
            }

            if (typeof input !== 'string') {
                input = input + '';
            }
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            } while (i < input.length);
            return output;
        };

        var decode64 = function(input) {

            if (window.atob) {
                return window.atob(input);
            }

            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length);
            return output;
        };

        /**
         * Public API
         */

        return {
            time: getTime,
            random: getRandom,
            randomColor : getRandomColor,
            encode: encode64,
            decode: decode64
        };

    }]);

/* global angular */
angular.module('j3lte.thePixel')
    .directive('thePixel', ['$compile', 'pixelService',function ($compile, pixelService) {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            template: '<div class="thepixel" href="#" ng-click="action()"></div>',
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                var action;

                if ($attrs.thePixelShow) {
                    var act/*, args*/;
                    var matches = $attrs.thePixelShow.match(/(^.*?)\((.*?)\)/);
                    act = matches ? matches[1] : $attrs.thePixelShow;
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
            }],
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
