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
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    p = require('path'),
    wiredep = require('wiredep').stream;

const webroot = "./app/";

const distSrc = webroot + ".dist/";

const paths = {
    ngModule: webroot + "modules/**/*.module.js",
    ngRoute: webroot + "modules/**/*.route.js",
    ngController: webroot + "modules/**/*.controller.js",
    script: webroot + "assets/scripts/**/*.js",
    style: webroot + "assets/styles/**/*.css"
};

const distPath = {
    ngModule: distSrc + "**/*.module.js",
    ngRoute: distSrc + "**/*.route.js",
    ngController: distSrc + "**/*.controller.js",
    script: distSrc + "assets/scripts/**/*.js",
    style: distSrc + "assets/styles/**/*.css"
}

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
    .pipe(gulp.dest(distSrc))
});

gulp.task('build', [], function () {
  const mo = gulp.src(distPath.ngModule, { read: false });
  const ro = gulp.src(distPath.ngRoute, { read: false });
  const ctrl = gulp.src(distPath.ngController, { read: false });
  const scr = gulp.src(distPath.script, { read: false });
  const css = gulp.src(distPath.style, { read: false });

    gulp.src(webroot + 'index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(inject(series(moduleSrc, routeSrc, controllerSrc, scriptSrc), { ignorePath: '/app' }))
        .pipe(inject(series(css), { ignorePath: '/app'  }))
        .pipe(gulp.dest(webroot));
});


// Task For Minify files 
// Browserify task

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('start', ['build', 'nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
    files: [paths.ngController, paths.ngModule, paths.ngRoute, paths.style],
    port: 8080
  });
});