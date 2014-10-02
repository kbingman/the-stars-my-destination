var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var compiler = require('gulp-hogan-compile');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var refresh = require('gulp-livereload');
var livereload = require('tiny-lr');
var server = livereload();

gulp.task('livereload-server', function () {
  server.listen(35729, function (err) {
    if (err) { return console.log(err); }
  });
});

gulp.task('styles', function() {
  gulp.src('./src/sass/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minify({ keepBreaks:true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify({
      debug: true,
      transform: ['hoganify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function() {
    gulp.src('./templates/**/*.mustache')
        .pipe(compiler('templates.js', {
          wrapper: 'commonjs',
          hoganModule: 'hogan'
        }))
        .pipe(gulp.dest('src/js/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.scss', ['styles']);
  gulp.watch('./templates/**/*.mustache', ['templates']);
});

// gulp.task('default', ['livereload-server', 'styles', 'templates', 'scripts', 'watch']);

gulp.task('default', function () {
  gulp.run('scripts');
  gulp.run('styles');
  // gulp.run('livereload-server');

  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/sass/**/*.scss', ['styles']);
  gulp.watch('./templates/**/*.mustache', ['scripts']);
});
