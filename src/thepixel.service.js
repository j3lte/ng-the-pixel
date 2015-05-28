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

            if (!input) {
                return null;
            }

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

            if (!input) {
                return null;
            }

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
