function dir(o) {
    for (var i in o) console.log(i);
}

/* globals: beforeEach, describe, it, module, inject, expect, jasmine */
describe("The pixel:", function() {

    var $document, scope, $compile, alert_msg;

    beforeEach(module('j3lte.thePixel'));

    beforeEach(inject(['$compile', '$rootScope', '$document',
        function(_$compile_, $rootScope, _$document_) {

            scope = $rootScope.$new();
            $document = _$document_;
            $compile = _$compile_;
            alert_msg = '_empty_';
            spyOn(window, 'alert').and.callFake(function (msg) {
                alert_msg = msg;
            });

        }
    ]));

    it('Does it create a pixel element', function() {

        var el = angular.element('<div the-pixel></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.hasClass('static')).toBe(true);
        expect(el.html()).toBe('');

        expect(el[0].style.backgroundColor).toBe('');
        expect(el[0].style.position).toBe('');
        expect(el[0].style.top).toBe('');
        expect(el[0].style.left).toBe('');
    });

    it('Should add class on setting the pixel random ', function() {
        var el = angular.element('<div the-pixel="random"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el.hasClass('random')).toBe(true);
    });

    it('Should set a random background color', function() {
        var el = angular.element('<div the-pixel the-pixel-color="rand"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.backgroundColor).toBeDefined();
        expect(el[0].style.backgroundColor === '').toBeFalsy();
    });

    it('Should set a fixed background color', function() {
        var el = angular.element('<div the-pixel the-pixel-color="#FF0000"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('Should trigger an alert on click', function() {
        var el = angular.element('<div the-pixel></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        compiled.triggerHandler('click');

        expect(window.alert).toHaveBeenCalled();
        expect(alert_msg).toEqual(jasmine.any(Number));

    });

    it('Should trigger an alert on click with encoded', function() {
        var el = angular.element('<div the-pixel the-pixel-encode="true"></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        compiled.triggerHandler('click');

        expect(window.alert).toHaveBeenCalled();
        expect(alert_msg).toEqual(jasmine.any(String));
    });

});

describe("The pixel positions:", function() {

    var $document, scope, $compile;
    var thePixelService;

    beforeEach(module('j3lte.thePixel'));

    beforeEach(inject(['$compile', '$rootScope', '$document', 'pixelService',
        function(_$compile_, $rootScope, _$document_, pixelService) {

            scope = $rootScope.$new();
            $document = _$document_;
            $compile = _$compile_;
            spyOn(window, 'alert');

            thePixelService = pixelService;

        }
    ]));

    it('Should set a position', function() {
        var el = angular.element('<div the-pixel the-pixel-position="absolute,1,1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('absolute');
        expect(el[0].style.top).toBe('1px');
        expect(el[0].style.left).toBe('1px');
    });

    it('Should set a position when fixed', function() {
        var el = angular.element('<div the-pixel the-pixel-position="fixed,1,1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('fixed');
        expect(el[0].style.top).toBe('1px');
        expect(el[0].style.left).toBe('1px');
    });

    it('Should set a position from bottom and left', function() {
        var el = angular.element('<div the-pixel the-pixel-position="absolute,-1,1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('absolute');
        expect(el[0].style.bottom).toBe('1px');
        expect(el[0].style.left).toBe('1px');
    });

    it('Should set a position from top and right', function() {
        var el = angular.element('<div the-pixel the-pixel-position="absolute,1,-1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('absolute');
        expect(el[0].style.top).toBe('1px');
        expect(el[0].style.right).toBe('1px');
    });

    it('Should set a position from bottom and right', function() {
        var el = angular.element('<div the-pixel the-pixel-position="absolute,-1,-1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('absolute');
        expect(el[0].style.bottom).toBe('1px');
        expect(el[0].style.right).toBe('1px');
    });

    it('Should not set a position when improperly defined position', function() {
        var el = angular.element('<div the-pixel the-pixel-position="abs,1,1"></div>');
        $compile(el)(scope);
        scope.$digest();

        expect(el[0].style.position).toBe('');
        expect(el[0].style.top).toBe('');
        expect(el[0].style.left).toBe('');

        var el2 = angular.element('<div the-pixel the-pixel-position="abs,1"></div>');
        $compile(el2)(scope);
        scope.$digest();

        expect(el2[0].style.position).toBe('');
        expect(el2[0].style.top).toBe('');
        expect(el2[0].style.left).toBe('');
    });

});

describe("The pixel actions:", function() {

    var $document, scope, $compile;
    var thePixelService;

    beforeEach(module('j3lte.thePixel'));

    beforeEach(inject(['$compile', '$rootScope', '$document', 'pixelService',
        function(_$compile_, $rootScope, _$document_, pixelService) {

            scope = $rootScope.$new();
            $document = _$document_;
            $compile = _$compile_;
            spyOn(window, 'alert');

            thePixelService = pixelService;

        }
    ]));

    it('Should have an action in the scope', function() {
        var el = angular.element('<div the-pixel></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        expect(scope.action).toBeDefined();
    });

    it('Should set the action to random', function() {
        var el = angular.element('<div the-pixel the-pixel-show="random"></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        expect(scope.action).toBeDefined();
    });

    it('Should work with arguments', function() {
        var el = angular.element('<div the-pixel the-pixel-show="random()"></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        expect(scope.action).toBeDefined();
    });

    it('Should set action to time if pixel-show attribute is bogus', function() {
        var el = angular.element('<div the-pixel the-pixel-show="foo()"></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        expect(scope.action).toBeDefined();
    });

    it('Should encode if encoding is switched on', function() {
        var el = angular.element('<div the-pixel the-pixel-show="foo()" the-pixel-encode="true"></div>');
        var compiled = $compile(el)(scope);
        scope.$digest();

        expect(scope.action).toBeDefined();
    });
});


describe("The pixel Service:", function() {

    var thePixelService;

    beforeEach(module('j3lte.thePixel'));

    beforeEach(inject(function(pixelService) {
        thePixelService = pixelService;
    }));


    it('Is my srcset Service available', function() {
        expect(thePixelService).toBeDefined();
    });

    it('Should return the date', function (){
        var now = Math.floor(new Date() / 1000);
        var t = thePixelService.time();

        expect(now).toBe(t);
    });

    it('Should return a random number', function (){
        var rand = thePixelService.random();

        expect(rand).toEqual(jasmine.any(Number));
    });

    it('Should return a random color', function (){
        var color = thePixelService.randomColor();

        expect(color).toEqual(jasmine.any(String));
        expect(color.length).toEqual(6);
    });

    it('Should base64 encode a string', function (){
        var str = "This is the pixel";

        var encoded = thePixelService.encode(str);

        expect(encoded).toEqual(jasmine.any(String));
        expect(encoded).toEqual('VGhpcyBpcyB0aGUgcGl4ZWw=');
    });

    it('Should base64 encode a number', function (){
        var str = 100000;

        var encoded = thePixelService.encode(str);

        expect(encoded).toEqual(jasmine.any(String));
        expect(encoded).toEqual('MTAwMDAw');
    });

    it('Should base64 encode return null if no arguments are given', function (){
        var encoded = thePixelService.encode();

        expect(encoded).toEqual(null);
    });

    it('Should base64 decode a string', function (){
        var str = "VGhpcyBpcyB0aGUgcGl4ZWwgYmFzZTY0IGRlY29kZWQ=";

        var decoded = thePixelService.decode(str);

        expect(decoded).toEqual(jasmine.any(String));
        expect(decoded).toEqual('This is the pixel base64 decoded');
    });

    it('Should base64 decode return null if no arguments are given', function (){
        var decoded = thePixelService.decode();

        expect(decoded).toEqual(null);
    });

});
