util = require('util')
exec = require('child_process').exec

SOURCE_DIR = './src/coffee'
TARGET_DIR = './lib/js'
TARGET_FILENAME = 'graph.js'

files = [
  'graph.coffee',
  'line_axis.coffee',
  'line.coffee'
]

task 'build', 'CoffeeScript to JavaScript', (options) ->
  fileList = []

  for filename, index in files
      file = SOURCE_DIR + '/' + filename
      fileList.push(file)
      util.log("#{index + 1}) #{file}")

  fileList = fileList.join(' ')

  option = "-b -cj #{TARGET_DIR}/#{TARGET_FILENAME} #{fileList}"

  exec "coffee #{option}", (error, stdout, stderr) ->

      util.log(error) if error
      util.log(stdout) if stdout
      util.log(stderr) if stderr

      if error
          util.log('Fail')
      else
          util.log('Success')
