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
