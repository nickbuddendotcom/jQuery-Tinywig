/*jshint unused: false */
'use strict';

/* --------------------------------------------------- */
/* [ DEPENDENCIES ] */
/* --------------------------------------------------- */
var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    sass    = require('gulp-sass'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    mocha   = require('gulp-mocha'),
    prefix  = require('gulp-autoprefixer');

// Lint Task
gulp.task('lint', function() {
  gulp.src('./src/jquery.tinywig.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// SASS
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest('./dist/css/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src('./src/jquery.tinywig.js')
    .pipe(gulp.dest('./dist'))
    .pipe(rename('jquery.tinywig.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// test
gulp.task('test', function () {
    gulp.src('./test/spec/spec.js')
        .pipe(mocha({reporter: 'nyan'}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/jquery.tinywig.js', ['lint', 'scripts']);
    gulp.watch('./src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);