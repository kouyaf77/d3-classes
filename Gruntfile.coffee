module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        expand: true
        flatten: true
        src: ['src/coffee/*.coffee']
        dest: 'src/js/',
        ext: '.js'
    sass:
      compile:
        expand: true
        flatten: true
        src: ['src/scss/*.scss']
        dest: 'src/css'
        ext: '.css'
    watch:
      coffee:
        files: ['src/coffee/*.coffee']
        task: ['coffee']
      sass:
        files: ['src/scss/*.scss']
        task: ['sass']
    uglify:
      build:
        files: [
          src: 'src/js/*.js'
          dest: 'lib/js/graph.min.js'
        ]

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', ['coffee', 'sass', 'uglify']
  return
