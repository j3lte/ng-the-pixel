module.exports = {
    options: {
        singleQuotes: true,
    },
    app: {
        files: {
            'release/thepixel.js': [
                'src/lib/angular-base64.min.js',
                'src/thepixel.module.js',
                'src/thepixel.service.js',
                'src/thepixel.directive.js'
            ]
        }
    }
};