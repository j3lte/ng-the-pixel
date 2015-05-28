!function(){"use strict";angular.module("base64",[]).constant("$base64",function(){function a(a,b){var c=f.indexOf(a.charAt(b));if(-1==c)throw"Cannot decode base64";return c}function b(b){b=""+b;var c,d,f,g=b.length;if(0==g)return b;if(0!=g%4)throw"Cannot decode base64";c=0,b.charAt(g-1)==e&&(c=1,b.charAt(g-2)==e&&(c=2),g-=4);var h=[];for(d=0;g>d;d+=4)f=a(b,d)<<18|a(b,d+1)<<12|a(b,d+2)<<6|a(b,d+3),h.push(String.fromCharCode(f>>16,255&f>>8,255&f));switch(c){case 1:f=a(b,d)<<18|a(b,d+1)<<12|a(b,d+2)<<6,h.push(String.fromCharCode(f>>16,255&f>>8));break;case 2:f=a(b,d)<<18|a(b,d+1)<<12,h.push(String.fromCharCode(f>>16))}return h.join("")}function c(a,b){var c=a.charCodeAt(b);if(c>255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";return c}function d(a){if(1!=arguments.length)throw"SyntaxError: Not enough arguments";var b,d,g=[];a=""+a;var h=a.length-a.length%3;if(0==a.length)return a;for(b=0;h>b;b+=3)d=c(a,b)<<16|c(a,b+1)<<8|c(a,b+2),g.push(f.charAt(d>>18)),g.push(f.charAt(63&d>>12)),g.push(f.charAt(63&d>>6)),g.push(f.charAt(63&d));switch(a.length-h){case 1:d=c(a,b)<<16,g.push(f.charAt(d>>18)+f.charAt(63&d>>12)+e+e);break;case 2:d=c(a,b)<<16|c(a,b+1)<<8,g.push(f.charAt(d>>18)+f.charAt(63&d>>12)+f.charAt(63&d>>6)+e)}return g.join("")}var e="=",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";return{encode:d,decode:b}}())}();
/* global angular */
angular.module('j3lte.thePixel', []);
/* global angular */
angular.module('j3lte.thePixel', ['base64'])
    .service('pixelService', ['$base64', function($base64) {
        'use strict';

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

            if (!input) {
                return null;
            }

            return $base64.encode(input);
        };

        var decode64 = function(input) {

            if (!input) {
                return null;
            }

            return $base64.decode(input);
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
            template: '<div class="thepixel"></div>',
            link: function(scope, element, attrs) {

                switch(attrs.thePixel) {
                    case 'random':
                        element.addClass('random');
                        break;
                    default:
                        element.addClass('static');
                        break;
                }

                // Pixel position
                if (angular.isDefined(attrs.thePixelPosition)) {
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

                // Setting color
                if (angular.isDefined(attrs.thePixelColor)) {
                    if (attrs.thePixelColor === 'rand') {
                        element[0].style['background-color'] = '#' + pixelService.randomColor();
                    } else {
                        element[0].style['background-color'] = attrs.thePixelColor;
                    }
                }

                // Setting an action
                var action;

                if (angular.isDefined(attrs.thePixelShow)) {
                    var matches = attrs.thePixelShow.match(/(^.*?)\((.*?)\)/);
                    var act = matches ? matches[1] : attrs.thePixelShow;
                    action = (act === 'random') ? pixelService.random : pixelService.time;

                } else {
                    action = pixelService.time;
                }

                scope.action = function () {
                    var output = angular.isDefined(attrs.thePixelEncode) ? pixelService.encode(action()) : action();
                    alert(output);
                };

                element.bind('click', scope.action);

                //console.log(scope, element, attrs);
            }
        };

}]);
