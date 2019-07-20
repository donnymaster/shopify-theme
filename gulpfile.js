/*
 * Shopify upload configs
 * https://shopify.github.io/themekit/#get-api-access
 */
// var SHOPIFY_API_KEY = '940d05370f07f4b92a8e72cbd6c785b3';
// var SHOPIFY_API_PASS = '0edfc86b22017dbb1a5c1f16fb24c527';
// var STORE_URL = 'likebongs.myshopify.com';
// var THEME_ID = '34116894838';

var gulp = require('gulp');
var gulpShopify = require('gulp-shopify-upload');
var watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const flexibility = require('postcss-flexibility');
const cssnano = require('gulp-cssnano');
const include = require("gulp-include");
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('sass', function (callback) {
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass:'}))
    .pipe(postcss([flexibility]))
    .pipe(autoprefixer({
      zindex: false,
      browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12'
      ],
      cascade: true
    }))
    .pipe(cssnano({zindex: false}))
    .pipe(debug({title: 'prefx:'}))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(debug({title: 'maps:'}))
    .pipe(gulp.dest('assets'));
  callback();
});

gulp.task('watch', function () {
  gulp.watch('src/styles/**/**/*.*', ['sass']);
  gulp.watch('src/js/**/**/*.*', ['vendor-scripts']);
});

gulp.task('vendor-scripts', function () {
  return gulp.src('./src/js/*.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(uglify())
    .pipe(gulp.dest('./assets/'));
});

// gulp.task('shopifywatch', function () {
//   return watch('./+(assets|layout|config|snippets|sections|templates|locales)/**', {usePolling: true})
//     .pipe(gulpShopify(SHOPIFY_API_KEY, SHOPIFY_API_PASS, STORE_URL, THEME_ID));
// });

// gulp.task('deploy', ['sass'], function () {
//   return gulp.src('./+(assets|layout|config|snippets|sections|templates|locales)/**')
//     .pipe(gulpShopify(SHOPIFY_API_KEY, SHOPIFY_API_PASS, STORE_URL, THEME_ID));
//   ;
// });

// gulp.task('default', ['sass', 'watch', 'shopifywatch']);

gulp.task('default', ['sass', 'watch']);
