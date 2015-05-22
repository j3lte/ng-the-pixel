module.exports = {
  options: {
    livereload: true
  },
  js: {
    files: ['src/*.js'],
    tasks: ['js', 'copy:build']
  },
  css: {
    files: ['src/*.css'],
    tasks: ['cssmin', 'copy:build']
  },
  tests: {
    files: ['test/**/*.js'],
    tasks: ['js', 'copy:build']
  }
};