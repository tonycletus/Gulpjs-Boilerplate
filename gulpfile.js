const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const imageMin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

// MAJOR FUNCTIONS
/*
  gulp.task = define the task
  gulp.src = target the file to work with
  gulp.dest = target the folder to input to
  gulp.watch = watch all files for any changes
*/

gulp.task('test', () => {
  console.log('gulp is running fine!')
});



gulp.task('connect', () => {
  connect.server({port:8889})
});

gulp.task('statics', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});


gulp.task('minify', () => {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
     .pipe(uglify())
       .pipe(gulp.dest('dist/js'))
});

gulp.task('style', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
});

gulp.task('optImage', () => {
  gulp.src('src/images/*')
    .pipe(imageMin())
      .pipe(gulp.dest('dist/images'))
});

gulp.task('default', ['test', 'statics', 'connect', 'minify', 'style', 'optImage','watch']);

gulp.task('watch', () => {
  gulp.watch('src/*.html', ['statics']);
  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
})