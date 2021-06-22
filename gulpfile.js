'use strict';

const minifyCSS = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');

const less = require('gulp-less');
const htmlmin = require('gulp-htmlmin');

const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDelete = require('gulp-rev-delete-original');

const pubFolder = "docs"
const pubPath = "./" + pubFolder


// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./css/**.css')
    // Auto-prefix css styles for cross browser compatibility
    //.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(less())
    .pipe(minifyCSS())
    // Output
    .pipe(gulp.dest(pubPath + '/css/'))
});
// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
  return gulp.src(['./*.js', './*json', "!./gulpfile.js", "!./package.json"])
    // Minify the file
    //.pipe(uglify())
    //.pipe(concat('app.min.js'))
    // Output
    .pipe(gulp.dest(pubPath))
});

gulp.task('img', function () {
  return gulp.src('./img/**')

    .pipe(gulp.dest(pubPath + '/img/'))
});
gulp.task('fonts', function () {
  return gulp.src('./fonts/**')

    .pipe(gulp.dest(pubPath + '/fonts/'))
});


gulp.task('pages', function () {
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
gulp.task('revision', gulp.series('scripts', 'styles', () => {
  return gulp.src(pubPath + '/**/*.{css,js,json}')
    .pipe(rev())
    .pipe(revDelete()) // Remove the unrevved files
    .pipe(gulp.dest(pubFolder))
    .pipe(rev.manifest())
    .pipe(gulp.dest(pubFolder));
}));

gulp.task('revRewrite', gulp.series('revision', () => {
  const manifest = gulp.src(pubPath + '/rev-manifest.json');

  return gulp.src([pubPath + '/index.html', pubPath + '/index-prev.html'])
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest(pubFolder));
}));

// Gulp task to minify all files
gulp.task('default', gulp.series('clean', 'styles',
  'scripts',
  'pages',
  'img',
  'fonts',
  'revision',
  'revRewrite'
));
