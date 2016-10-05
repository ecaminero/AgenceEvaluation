/// <binding BeforeBuild='inject:index' />
"use strict";

const gulp = require("gulp"),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    ngAnnotate = require('gulp-ng-annotate'),
    closure = require('gulp-jsclosure'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    p = require('path'),
    wiredep = require('wiredep').stream;

const webroot = "./app/";

const distSrc = webroot + "./app/dist/";

const paths = {
    ngModule: webroot + "modules/**/*.module.js",
    ngRoute: webroot + "modules/**/*.route.js",
    ngController: webroot + "modules/**/*.controller.js",
    script: webroot + "assets/scripts/**/*.js",
    style: webroot + "assets/styles/**/*.css"
};

const moduleSrc = gulp.src(paths.ngModule, { read: false });
const routeSrc = gulp.src(paths.ngRoute, { read: false });
const controllerSrc = gulp.src(paths.ngController, { read: false });
const scriptSrc = gulp.src(paths.script, { read: false });
const styleSrc = gulp.src(paths.style, { read: false });

function handleError(result){
  console.log("Error Complile", result);
};

gulp.task('watch', [], function() {
  gulp.watch([moduleSrc, routeSrc, ngController], ['compile-js']);
});


gulp.task('empty-dist', function() {
  return gulp.src(distSrc, { read: false })
    .pipe(rimraf());
});

gulp.task('compile-js', ['empty-dist'], function() {
  gulp.src([paths.ngModule, paths.ngRoute, paths.ngController])
    .pipe(closure({angular: true}))
    .pipe(ngAnnotate({ add: true, single_quotes: true })).on('error', handleError)
    .pipe(gulp.dest(webroot + 'dist/'))
});

gulp.task('build', ['compile-js'], function () {
    gulp.src(webroot + 'index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here',
            ignorePath: '..'
        }))
        .pipe(inject(series(moduleSrc, routeSrc, controllerSrc, scriptSrc), { ignorePath: '/app' }))
        .pipe(inject(series(styleSrc), { ignorePath: '/app'  }))
        .pipe(gulp.dest(webroot));
});


// Task For Minify files 
// Browserify task
gulp.task('browserify', ['build'], function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/modules/app.module.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))

});


gulp.task('serve', ['build'], function () {
  connect.server({
    proxy: "http://localhost:10010",
    root: './app/',
    port: 8888
  });
});

