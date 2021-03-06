/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

module.exports = function (grunt) {
  var browsers = [{
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1'
  }, {
    browserName: 'chrome',
    platform: 'Windows 8.1',
    version: '36'
  }, {
    browserName: 'firefox',
    platform: 'Windows 8.1',
    version: '31'
  }, {
    browserName: 'chrome',
    platform: 'OS X 10.9'
  }, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7'
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.4'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '.tmp',
          port: 9999
        }
      }
    },
    'saucelabs-mocha': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/sauce-element/tests/runner.html'
          ],
          browsers: browsers,
          build: process.env.TRAVIS_JOB_ID,
          testname: 'mocha tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    },
    clean: {
      tmp: ['.tmp']
    },
    copy: {
      all: {
        files: [{
          expand: true,
          dot: true,
          dest: '.tmp/sauce-element',
          src: [
            '**/*',
            '!.tmp/**/*',
            '!node_modules/**/*'
          ]
        }]
      }
    },
    'bower-install-simple': {
      all: {
        options: {
          cwd: '.tmp/sauce-element'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', [
    'clean',
    'copy:all',
    'bower-install-simple',
    'connect',
    'saucelabs-mocha'
  ]);

  grunt.registerTask('serve', [
    'clean',
    'copy',
    'bower-install-simple',
    'connect:server:keepalive'
  ]);
};
