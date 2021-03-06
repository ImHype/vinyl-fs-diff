'use strict';

var fs = require('fs'),
    assert = require('assert'),
    gulp = require('gulp'),
    diff = require('../index.js'),
    concatStream = require('concat-stream'),
    rimraf = require('rimraf');

describe('run', function () {
    before(function (callback) {
        rimraf('.gulp/gulp-diff-build', callback);
    });

    it('run first time', function (callback) {
        gulp.src('test/src/*.js')
            .pipe(diff())
            .pipe(concatStream(function (buf) {
                assert.equal(3, buf.length);
                callback();
            }));
    });

    it('run again', function (callback) {
        gulp.src('test/src/*.js')
            .pipe(diff())
            .pipe(concatStream(function (buf) {
                assert.equal(0, buf.length);
                callback();
            }));
    });

    it('file is changed', function (callback) {
        var originalContent = fs.readFileSync('test/src/1.js', 'utf8')
        fs.writeFileSync('test/src/1.js', 'var a = 1;', {
            encoding: 'utf8',
        });

        gulp.src('test/src/1.js')
            .pipe(diff())
            .pipe(concatStream(function (buf) {
                assert.equal(1, buf.length);
                assert.equal(fs.realpathSync('./') + '/test/src/1.js', buf[0].path);

                fs.writeFileSync('test/src/1.js', originalContent, {
                    encoding: 'utf8',
                });
                callback();
            }));
    });

    it('clear cache', function (callback) {
        gulp.src('test/src/*.js')
            .pipe(diff({
                clear: true
            }))
            .pipe(concatStream(function (buf) {
                assert.equal(3, buf.length);
                callback();
            }));
    });
});
