module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        expand: true
        flatten: true
        src: ['src/coffee/*.coffee']
        dest: 'js',
        ext: '.js'
   sass:
     compile:
       expand: true
       flatten: true
       src: ['scss/*.scss']
       dest: 'css'
       ext: '.css'
   watch:
     coffee:
       files: ['src/coffee/*.coffee']
       task: ['coffee']
     sass:
       files: ['src/scss/*scss']
       task: ['sass']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default', ['coffee', 'sass']
  return
