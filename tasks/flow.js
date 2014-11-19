/*
 * grunt-flow
 * https://github.com/larsonjj/grunt-flow
 *
 * Copyright (c) 2014 Jake Larson
 * Licensed under the MIT license.
 */

'use strict';

var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;
var flow = require('flow-bin');

module.exports = function(grunt) {

    grunt.registerMultiTask('flow', 'Validates JavaScript with Facebook\'s Flow Library', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            testing: false
        });

        // Read .flowconfig file
        var flowConfigFile = grunt.file.read('.flowconfig');

        if (!flowConfigFile) {
            return grunt.error('No .flowconfig file found!');
        }

        var flowCB = function(output, done) {
            if (options.testing) {
                grunt.file.write('tmp/int-check.js', output);
            }
            done();
        };

        var output;
        var done = this.async();

        execFile(flow, ['check'], function(err, stdout, stderr) {
            if (err) {
                grunt.log.error(err);
                flowCB(err, done);
            }
            if (stderr) {
                grunt.log.error(stderr);
                flowCB(stderr, done);
            }
            grunt.log.write(stdout);
            flowCB(stdout, done);
        });

        //  TODO: Find [include] text within .flowconfig

        //  TODO: Find [ignore] text within .flowconfig

        //  TODO: Clean up output

    });

};
