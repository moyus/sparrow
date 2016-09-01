var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var cssBase64 = require('gulp-css-svg');
var del = require('del');
var gulpif = require('gulp-if')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sizereport   = require('gulp-sizereport');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-prettify');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

var paths = {
  root: {
    src: "src",
    dest: "app"
  },
  styles: {
    src: 'src/scss',
    dest: 'app/assets/css'
  },
  scripts: {
    src: 'src/js',
    dest: 'app/assets/js'
  },
  assets: {
    src: 'src/assets',
    dest: 'app/assets'
  },
  templates: {
    pages: 'src/pages',
    partials: 'src/templates',
    dest: 'app'
  }
};

/**
 * Clean Folder
 */
gulp.task('clean', function () {
  return del(['app']);
});

/**
 * Build Scripts
 */
gulp.task('scripts', function () {
  return gulp.src([
      paths.scripts.src + '/*.js'
    ])
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(concat('sparrow.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify('scripts build successfully.'));
});

/**
 * Build Styles
 */
gulp.task('styles', function () {
  return gulp.src(paths.styles.src + '/sparrow.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 8
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(cssBase64({
      baseDir: "../images",
      extensionsAllowed: ['.gif', '.png', '.svg']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
    .pipe(notify('styles build successfully.'));
});

/**
 * Copy Assets
 */
gulp.task('copy-assets', function () {
  return gulp.src(paths.assets.src + '/**/*')
    .pipe(gulp.dest(paths.assets.dest));
});

/**
 * HTML Files
 */
gulp.task('html:build', function () {
  return gulp.src([
      paths.templates.pages + '/**/*.html'
    ])
    .pipe(nunjucksRender({
      path: [paths.templates.partials]
    }))
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('html:prettify', function () {
  return gulp.src(paths.templates.dest + '/**/*.html')
    .pipe(prettify({
      indent_size: 4
    }))
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('html', gulp.series('html:build', 'html:prettify'));

/**
 * Watcher
 */
gulp.task('watch', function (done) {
  gulp.watch(paths.styles.src + '/**/*.scss', gulp.parallel('styles'));
  gulp.watch(paths.scripts.src + '/*.js', gulp.series('scripts', browserSync.reload));
  gulp.watch([
    paths.templates.pages + '/**/*.html',
    paths.templates.partials + '/**/*.nunjucks'
  ], gulp.parallel('html'));
  gulp.watch(paths.assets.src + '/**/*', gulp.parallel('copy-assets'));
  gulp.watch("app/*.html").on('change', browserSync.reload);
  done();
});

gulp.task('size-report', function () {
  return gulp.src(paths.root.dest + '/**/*')
    .pipe(sizereport({
      gzip: true
    }))
});

/**
 * Local Server
 */
gulp.task('server', function (done) {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    open: false
  });
  done();
});

/**
 * Production Environment
 */
gulp.task('build',
  gulp.series('clean', 'styles', 'scripts', 'copy-assets', 'html')
);
gulp.task('default', gulp.series('build'));

/**
 * Development Environment
 */
gulp.task('dev', gulp.series('server', 'watch'));
