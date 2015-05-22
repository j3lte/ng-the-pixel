module.exports = {
    options: {
        hostname: 'localhost',
        base: ['./sample', './release']
    },
    test: {
        options: {
            port: 9000
        }
    },
    open: {
        options: {
            livereload: true,
            // keepalive: true,
            open: true
        }
    }
};