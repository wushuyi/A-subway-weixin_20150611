// project build
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var del = require('del');

var srcPath ='../';
var imagesPath = './assets/images/*/*';
var beforeScripts = [
    "./assets/libs/modernizr/2.8.3/modernizr.min.js"
];
var scripts = [
    "./assets/libs/jquery/2.1.4/jquery.min.js",
    "./assets/libs/jquery-touch/1.0.0/jquery-touch.js",
    "./assets/libs/preloadjs/0.6.0/preloadjs.min.js",
    "./assets/libs/skrollr/0.6.29/skrollr.js",
    "./assets/js/functions.js"
];
var styls = [
    "./assets/css/reset.css",
    "./assets/css/loaders.css",
    "./assets/css/style.css"
];

gulp.task('clean-script', function(cb){
    del(['./dist/assets/js/script.min.js']);
});

gulp.task('clean-before-script', function(cb){
    del(['./dist/assets/js/before.min.js']);
});

gulp.task('min-before-script', function(cb){
    var thisScripts = [];
    beforeScripts.forEach(function(item, index, obj){
        thisScripts[index] = [srcPath, beforeScripts[index]].join('');
    });
    return gulp.src(thisScripts)
        .pipe(concat('before.js'))
        .pipe(uglify())
        .pipe(rename('before.min.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('min-script',function(cb){
    var thisScripts = [];
    scripts.forEach(function(item, index, obj){
        thisScripts[index] = [srcPath, scripts[index]].join('');
    });
    return gulp.src(thisScripts)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('clean-styles', function(cb){
    del(['./dist/assets/css/style.min.css']);
});

gulp.task('min-styles', function(cb){
    var thisStyles = [];
    styls.forEach(function(item, index, obj){
        thisStyles[index] = [srcPath, styls[index]].join('');
    });
    return gulp.src(thisStyles)
        .pipe(concat('style.css'))
        .pipe(uncss({
            html: ['http://localhost:63342/A-subway-weixin_20150611/index.html']
        }))
        .pipe(autoprefixer({
            browsers: [
                'last 2 Android versions',
                'last 2 ChromeAndroid versions',
                'last 2 iOS versions'
            ],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dist/assets/css/'))
});

gulp.task('copy-images', function(cb){
    var thisImages = srcPath + imagesPath;
    return gulp.src(thisImages)
        .pipe(gulp.dest('./dist/assets/images/'))
});

gulp.task('min-html', function(cb){
    var thisHtmls = srcPath + './index.html';
    return gulp.src(thisHtmls)
        .pipe(replace(/<script.*?>.*?<\/script>/ig, ''))
        .pipe(replace(/<link rel="stylesheet" .*?\/>/ig, ''))
        .pipe(replace(/buildscript/ig, 'script'))
        .pipe(replace(/buildstyle/ig, 'link'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('script', ['min-script', 'min-before-script']);
gulp.task('style', ['min-styles']);
gulp.task('image', ['copy-images']);
gulp.task('html', ['min-html']);
gulp.task('default', ['script', 'style', 'image', 'html']);