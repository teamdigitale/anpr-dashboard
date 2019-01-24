'use strict';

var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');

const less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
//ar sass = require('gulp-sass');
var uglify = require('gulp-uglify');

const concat = require('gulp-concat');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDelete = require('gulp-rev-delete-original');

const pubFolder="docs"
const pubPath="./"+pubFolder

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];




  // Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./css/**.css')
      // Auto-prefix css styles for cross browser compatibility
       //.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(less())
    .pipe(minifyCSS())
      // Output
      .pipe(gulp.dest(pubPath+'/css/'))
  });
  // Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src(['./*.js','./*json',"!./gulpfile.js","!./package.json"])
      // Minify the file
      //.pipe(uglify())
      //.pipe(concat('app.min.js'))
      // Output
      .pipe(gulp.dest(pubPath))
  });

  gulp.task('img', function() {
    return gulp.src('./img/**')
      
      .pipe(gulp.dest(pubPath+'/img/'))
  });
  gulp.task('fonts', function() {
    return gulp.src('./fonts/**')
      
      .pipe(gulp.dest(pubPath+'/fonts/'))
  });


  gulp.task('pages', function() {
    return gulp.src(['./*.html'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest(pubPath));
  });

  // Clean output directory
gulp.task('clean', () => del([pubFolder]));



/*
Create and append an hash for javascript and css files in order to prevent caching
*/
gulp.task('revision', ['scripts', 'styles'], () => {
  return gulp.src(pubPath+'/**/*.{css,js,json}')
    .pipe(rev())
    .pipe(revDelete()) // Remove the unrevved files
    .pipe(gulp.dest(pubFolder))
    .pipe(rev.manifest())
    .pipe(gulp.dest(pubFolder));
});

gulp.task('revRewrite', ['revision'], function() {
  const manifest = gulp.src(pubPath+'/rev-manifest.json');

  return gulp.src([pubPath+'/index.html'])
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest(pubFolder));
});
// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts',
    'pages',
    'img',
    'fonts',
    'revision',
    'revRewrite'
  );
});