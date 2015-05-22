module.exports = {
    options: {
        singleQuotes: true,
    },
    app: {
        files: {
            'release/thepixel.js': [
                'src/thepixel.module.js',
                'src/thepixel.service.js',
                'src/thepixel.directive.js'
            ]
        }
    }
};