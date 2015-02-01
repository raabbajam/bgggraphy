var gulp = require('gulp');
// var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var include = require('gulp-include');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// var prefixer = require('gulp-autoprefixer');
// var minifycss = require('gulp-minify-css');
// var minifyhtml = require('gulp-minify-html');
//
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var cache = require('gulp-rename');
// var clean = require('gulp-clean');
//

var chmod = require('gulp-chmod');
var notify = require('gulp-notify');

var paths = {
	assets: 'assets',
	dists: 'dists',
	bower: {

	},
};

gulp.task('script', function() {
	gulp.src(paths.assets + '/js/*.js')
		.pipe(include())
		// .pipe(uglify())
		.pipe(gulp.dest(paths.dists + '/js'))
		.pipe(notify({
			message: '"Script" completed!'
		}));
});
gulp.task('style', function() {
	return sass(paths.assets + '/scss/', {
			trace: true,
			sourcemap: true
		})
		.on('error', function(err) {
			console.error('Error!', err.message);
		})
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dists + '/css'))
		.pipe(notify({
			message: '"Style" completed!'
		}));
});

gulp.task('image', function() {
	return gulp.src('assets/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				cleanupIDs: {
					remove: false
				},
                convertShapeToPath: {
                    active: false
                }
			}],
			use: [pngquant()]
		}))
        .pipe(chmod(755))
		.pipe(gulp.dest('dists/images'))
		.pipe(notify({
			message: '"Image" completed!'
		}));
});

gulp.task('watch', function() {
	gulp.watch('assets/js/**/*.js', ['script']);
	gulp.watch('assets/scss/**/*.scss', ['style']);
});
gulp.task('default', [
	'script',
	'style',
	'watch'
]);
