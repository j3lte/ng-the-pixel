/* global describe, it, beforeEach, browser, expect, element */
'use strict';

describe('Pixels:', function () {

    var pixel = function(n) {
        return '.thepixel.pixel' + n;
    };
    var runOnce = true;


    beforeEach(function() {
        if (runOnce) {
            runOnce = false;
            browser.get('index.html');
        }
    });


    it('Is the element correctly added', function () {
        expect(element(by.css(pixel(1))).isPresent()).toBeTruthy();
    });


});
