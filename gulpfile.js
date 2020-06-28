const gulp   = require("gulp")
const ejs    = require("gulp-ejs")
const jade   = require("gulp-jade")
const less   = require("gulp-less")
const sass   = require("gulp-sass")
const rename = require('gulp-rename')
const bsync  = require('browser-sync').create()

const _path = {
    build: ["./public"],
    ejs:   ["./src/ejs"],
    jade:  ["./src/jade"],
    less:  ["./src/less"],
    sass:  ["./src/scss"]
}

gulp.task('ejs', () =>
    gulp.src(_path.ejs + '/views/*.ejs')
        .pipe(ejs({ title: 'gulp-ejs' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(_path.build))
)

gulp.task('jade', () =>
    gulp.src(_path.jade + '/views/*.jade')
        .pipe(jade({ title: 'gulp-jade' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(_path.build))
)

gulp.task('less', () =>
  gulp.src(_path.less + '/main.less')
    .pipe(less())
    .pipe(gulp.dest(_path.build + '/css'))
)

gulp.task('sass', () =>
    gulp.src(_path.sass + '/main.scss')
        .pipe(sass())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(_path.build + '/css'))
)

gulp.task('serve', () =>
    bsync.init({server: _path.build})
)

gulp.task('reload', done => {
    bsync.reload(),
    done()
})

gulp.task('watch', () =>
    // Initial configuration
    gulp.watch(_path.jade, gulp.series('jade', 'reload')),
    gulp.watch(_path.less, gulp.series('less', 'reload')),
    gulp.watch(_path.build + '/**/*.{html,js,css}', gulp.series('reload'))
)

gulp.task('default', gulp.parallel('serve', 'watch'));