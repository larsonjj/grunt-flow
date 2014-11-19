'use strict';

var grunt = require('grunt');
var spawn = require('child_process').spawn;
var flow = require('flow-bin');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.flow = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    int_check: function(test) {
        test.expect(1);

        var output = grunt.file.read('tmp/int-check');
        test.ok(/Found 1 error/.test(output));

        test.done();
    }
};
