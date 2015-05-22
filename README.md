[![Build Status](https://travis-ci.org/j3lte/ng-the-pixel.svg)](https://travis-ci.org/j3lte/ng-the-pixel)
[![Coverage Status](https://coveralls.io/repos/j3lte/ng-the-pixel/badge.png?branch=master)](https://coveralls.io/r/j3lte/ng-the-pixel?branch=master)

# The Pixel
> This is probably one of the most useless Angular Directives you will ever find. Available as bower component for your project.

## Demo
Coming soon

## Usage
1. `npm install ng-the-pixel` or `bower install ng-the-pixel -p` and set this script as a dependency
2. Add a dependency on `j3lte.thePixel` in your app module.


### Directive in html template

<pre><code>&lt;div the-pixel&gt;&lt;/div&gt;</code></pre>

### Options
 Will be explained

Prerequisites

 1. Run `npm run update-webdriver` once to get latest chrome webdriver (e2e)
 2. Install [InternetExplorerDriver](http://docs.seleniumhq.org/download)

Now we can simply run:
- `grunt sample` to see the demo offline (live reload from src)
- `grunt unit` to start unit test (report in target folder), `grunt unitBrowser` for debugging purpose
- `grunt e2e` to start our end to end test, which uses local chrome, firefox and internet explorer
- `grunt package` to make a complete package which validates everything (used when making new package)
- `grunt update` to update our Angular lib (defined in package json) and verify if module works with some versions backwards as well

## History
The actual setup for this project (testing etc) was borrowed from the [ng-lazy-image repository](https://github.com/afklm/ng-lazy-image). I used this setup to create my own directive.

## License
As AngularJS itself, this module is released under the permissive [MIT license](LICENSE.md).

Contributions are welcome!

