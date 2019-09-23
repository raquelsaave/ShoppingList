const sass = require('node-sass');
/*global module:false*/
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    watch: {
    },
    stylelint: {
      all: ["assets/css/*.scss"]
    },
    sass: {
      options: {
          implementation: sass,
          sourceMap: true
      },
      dist: {
          src : ['main.scss'],
          dest : 'assets/css',
          ext : '.css',
          cwd : 'assets/scss',
          expand : true
      },
    },
      eslint: {
        target: ["assets/js/*.js"]
     }
  
  });

  grunt.loadNpmTasks("grunt-stylelint");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks('grunt-eslint');

  // Default task.
  grunt.registerTask('default', ['stylelint','sass']);
};