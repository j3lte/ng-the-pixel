module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
    app: {
        files: {
            'release/thepixel.min.js': [
                'release/thepixel.js'
            ]
        }
    }
};