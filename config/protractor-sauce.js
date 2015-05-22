exports.config = {

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    multiCapabilities: [{
        'browserName': 'chrome',
        'platform': 'Windows 7',
        'version': '',
        'chromeOptions': {
            'args': ['test-type']
        },
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'THEPIXEL CHROME OSX ' + process.env.TRAVIS_BUILD_NUMBER
    }],

    chromeOnly: false,

    specs: [
        '../test/e2e/*.js'
    ],

    baseUrl: 'http://localhost:9000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        includeStackTrace: true
    }
};
