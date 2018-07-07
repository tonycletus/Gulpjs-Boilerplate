'use strict'

const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const imageMin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// MAJOR FUNCTIONS
/*
  gulp.task = define the task
  gulp.src = target the file to work with
  gulp.dest = target the folder to input to
  gulp.watch = watch all files for any changes
*/

// Test To Confirm Gulp's installed successfully
gulp.task('test', () => {
  console.log('gulp is running fine!')
});


// Creates Live Server
gulp.task('connect', () => {
  connect.server({port:8889})
});

// Copy HTML files to >> dist
gulp.task('statics', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});

// Compile ES6 syntax to ES5 syntax
// Put all JavaScript files in a main.js files
// Create minify version of the main.js files
gulp.task('minify', () => {
  gulp.src('src/js/*.js')
  .pipe(babel({presets: ['env']}))
    .pipe(concat('main.js'))
     .pipe(uglify())
       .pipe(gulp.dest('dist/js'))
});

// Compile Sass To CSS
gulp.task('style', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
});

// Minify images that could be found in the image dir
gulp.task('optImage', () => {
  gulp.src('src/images/*')
    .pipe(imageMin())
      .pipe(gulp.dest('dist/images'))
});


// Enable runing all task by runing "gulp"
gulp.task('default', ['test', 'statics', 'connect', 'minify', 'style', 'optImage','watch']);

// Watch Over All The Files For Changes (Auto)
gulp.task('watch', () => {
  gulp.watch('src/*.html', ['statics']);
  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
})