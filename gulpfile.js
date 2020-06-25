const gulp   = require("gulp")
const sass   = require("gulp-sass")
const ejs    = require("gulp-ejs")
const rename = require('gulp-rename')
const bsync  = require('browser-sync').create()

const _path = {
    build: ["./public"],
    ejs:   ["./src/views"],
    sass:  ["./src/scss"]
}

gulp.task('sass', () =>
    gulp.src(_path.sass + '/main.scss')
        .pipe(sass())
        // .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(_path.build + '/css'))
)

gulp.task('ejs', () =>
    gulp.src(_path.ejs + '/pages/*.ejs')
        .pipe(ejs({ title: 'gulp-ejs' }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(_path.build))
)

gulp.task('serve', () =>
    bsync.init({server: _path.build})
)

gulp.task('reload', (done) => {
    bsync.reload(),
    done()
})

gulp.task('watch', () =>
    gulp.watch(_path.ejs, gulp.series('ejs', 'reload')),
    gulp.watch(_path.sass, gulp.series('sass', 'reload')),
    gulp.watch(_path.build + '/**/*.{html,js,css}', gulp.series('reload'))
)

gulp.task('default', gulp.parallel('serve', 'watch'));