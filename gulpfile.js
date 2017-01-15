var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var sync = require('browser-sync').create();


gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(sync.reload({
            stream: true
        }))
});

gulp.task('minify-css', ['sass'], function() {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(sync.reload({
            stream: true
        }))
});

gulp.task('minify-js', function() {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(sync.reload({
            stream: true
        }))
});

gulp.task('copy', function() {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['bower_components/magnific-popup/dist/*'])
        .pipe(gulp.dest('vendor/magnific-popup'))

    gulp.src(['bower_components/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('vendor/scrollreveal'))

    gulp.src(['bower_components/wow/dist/wow.min.js'])
        .pipe(gulp.dest('vendor/wow'))

    gulp.src(['bower_components/animate.css/animate.min.css'])
        .pipe(gulp.dest('vendor/animate.css'))

    gulp.src([
            'bower_components/compass-mixins/lib/*.scss',
            'bower_components/compass-mixins/lib/**/*.scss'
        ])
        .pipe(gulp.dest('sass/compass'))

    gulp.src([
            'bower_components/font-awesome/**',
            '!bower_components/font-awesome/less',
            '!bower_components/font-awesome/less/**',
            '!bower_components/font-awesome/scss',
            '!bower_components/font-awesome/scss/**',
            '!bower_components/font-awesome/**/*.map',
            '!bower_components/font-awesome/*.txt',
            '!bower_components/font-awesome/*.md',
            '!bower_components/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

gulp.task('sync', function() {
    sync.init({
        server: {
            baseDir: ''
        },
    })
})

gulp.task('dev', ['sync', 'sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('*.html', sync.reload);
    gulp.watch('js/**/*.js', sync.reload);
});

gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);
