module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    watch: {
      files: ['scss/**/*.scss'],
      tasks: ['compass'],
    },

    cmq: {
      options: {
        log: true
      },
      your_target: {
        files: {
          'css': ['css/*.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-combine-media-queries');

  // Default task.
  grunt.registerTask('default', ['watch']);

  // Build task.
  grunt.registerTask('build', ['compass', 'cmq']);

};
