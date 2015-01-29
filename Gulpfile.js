var gulp = require('gulp');
// var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var include = require('gulp-include');
// var prefixer = require('gulp-autoprefixer');
// var minifycss = require('gulp-minify-css');
// var minifyhtml = require('gulp-minify-html');
//
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var cache = require('gulp-rename');
// var clean = require('gulp-clean');
//
// var notify = require('gulp-notify');

var paths = {
    assets: 'assets',
    dists: 'dists',
    bower: {

    },
};

gulp.task('script', function () {
    gulp.src(paths.assets + '/js/*.js')
        .pipe(include())
        // .pipe(uglify())
        .pipe(gulp.dest(paths.dists + '/js'));
});
gulp.task('style', function () {
    return sass(paths.assets + '/scss/base.scss')
        .on('error', function (err) {
            console.error('Error', err.message);
        })
        .pipe(gulp.dest(paths.dists + '/css'));
});


gulp.task('watch', function(){
    gulp.watch('assets/js/**/*.js', ['script']);
    gulp.watch('assets/sass/**/*.scss', ['style']);
});
gulp.task('default', [
    'script',
    'style',
    'watch'
]);
