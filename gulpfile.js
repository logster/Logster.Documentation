var gulp = require('gulp'),
    watch = require("gulp-watch"),
    del = require("del"),
    concat = require("gulp-concat"),
    bower = require("gulp-bower"),
    minifyCss = require("gulp-minify-css");

var config = {
    scriptSrc: ["bower_components/toc/dist/toc.min.js"],
    scriptDest: "scripts/",
    scriptOut: "vendor.js",
    cssSrc: ["css/**.css", "!combined.css"],
    cssDest: "css/",
    cssOut: "combined.css"
};

gulp.task("css", function () {
    del(config.cssDest + config.cssOut);
    return gulp.src(config.cssSrc)
        .pipe(concat(config.cssOut))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.cssDest));
});

gulp.task("scripts", function () {
    return gulp.src(config.scriptSrc)
        .pipe(concat(config.scriptOut))
        .pipe(gulp.dest(config.scriptDest));
});

gulp.task("watch", function () {
    gulp.watch("scripts/**/*.js", ["scripts"]);
    gulp.watch("css/**/*.css", ["css"]);
});

gulp.task("bower", function () {
    return bower();
});

gulp.task('default', ["scripts", "css"], function () {
    // place code for your default task here
});