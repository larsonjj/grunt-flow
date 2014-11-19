/*
 * grunt-flow
 * https://github.com/larsonjj/grunt-flow
 *
 * Copyright (c) 2014 Jake Larson
 * Licensed under the MIT license.
 */

'use strict';

var spawn = require('child_process').spawn;
var flow = require('flow-bin');
var chalk = require('chalk');

module.exports = function(grunt) {

    grunt.registerMultiTask('flow', 'Validates JavaScript with Facebook\'s Flow Library', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            testing: false,
            style: 'color'
        });

        // Read .flowconfig file
        var flowConfigFile = grunt.file.read('.flowconfig');

        if (!flowConfigFile) {
            return grunt.error('No .flowconfig file found!');
        }

        // Recreate color output from flow library
        // Original color is lost a spawn pipe buffer
        var colorize = function(string) {
            if (options.style !== 'none') {
                // split file into array of lines
                var lines = string.replace(/\r\n/g, '\n').split(/\n/);

                // keep track of new errors (-1 means empty line, so 0 means new line)
                var currentErrorLineIndex = -1;
                var newOutputArray = [];
                lines.forEach(function(line, i) {
                    // If at end of errors, the message "Found [number of errors] error(s)"
                    // will be shown, we need to detect this so we know not to parse the line further
                    if (/Found\s(.*?)\serror/.test(line)) {
                        newOutputArray.push(chalk.white(line));
                    } else {
                        // if line is empty, toggle newError
                        if (!line) {
                            // reset current error line index
                            currentErrorLineIndex = -1;
                        }
                        else {
                            // Increment currentErrorLineIndex for every non-empty line
                            currentErrorLineIndex = currentErrorLineIndex += 1;
                        }

                        var currentLine = line.split(/\:/);
                        var colonArray = [];
                        currentLine.forEach(function(item, j) {

                            // Should match "This type is incompatible with"
                            if (currentLine.length < 2) {
                                return colonArray.push(chalk.red(item));

                            // Should match line number indexes
                            } else if (/\,/.test(item) && j > 1) {
                                var lineColArray = [];
                                item.split(',').forEach(function(lineCol) {
                                    lineColArray.push(chalk.cyan(lineCol));
                                });
                                return colonArray.push(lineColArray.join(','));

                            // Should match line number of error
                            } else if (parseInt(item, 10)) {
                                return colonArray.push(chalk.yellow(item));

                            // Should match last item (data type)
                            } else if (currentLine.length > 2 && (currentLine.length - 1) === j) {

                                // Should match first occurance of data type
                                if (currentErrorLineIndex === 0) {
                                    return colonArray.push(chalk.red(item));
                                } else {
                                    return colonArray.push(chalk.green(item));
                                }

                            // Should match first item
                            } else if (currentLine.length > 2 && j === 0) {

                                // Should match first occurance of a filepath
                                if (currentErrorLineIndex === 0) {
                                    return colonArray.push(chalk.blue(item));
                                } else {
                                    return colonArray.push(chalk.magenta(item));
                                }
                            }

                            // Match everything else
                            else {
                                return colonArray.push(chalk.underline(item));
                            }
                        });
                        newOutputArray.push(colonArray.join(':'));
                    }
                });

                return newOutputArray.join('\n');
            }
            else {
                return string;
            }
        };

        var done = this.async();

        // Run `flow check` command
        var cmd = spawn(flow, ['check'], {stdio: ['pipe']});

        cmd.stdout.on('data', function(data) {
            // Convert data buffer to ascii string and colorize output
            var output = colorize(data.toString('ascii', 0, data.length));
            // Log out output
            grunt.log.writeln(output);

            // If testing, create temp file to verify library output
            if (options.testing) {
                grunt.file.write('tmp/int-check', output);
            }
        });

        // Finish up task
        cmd.on('close', function(code) {
            done();
        });

        //  TODO: Find [include] text within .flowconfig

        //  TODO: Find [ignore] text within .flowconfig

    });

};
