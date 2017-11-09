import babel from 'gulp-babel';
import bs from 'browser-sync';
import gulp from 'gulp';
import sass from 'gulp-sass';

const dir = {
    build: 'build',
    src: 'src'
};

const path = {
    dest: dir.build,
    html: `${dir.src}/**/*.html`,
    js: `${dir.src}/**/*.js`,
    scss: `${dir.src}/**/*.scss`
};

gulp.task('bs', () => {
    bs.init({
        server: dir.build
    });
});

gulp.task('html', () => {
    return gulp.src(path.html)
        .pipe(gulp.dest(path.dest));
});

gulp.task('js', () => {
    return gulp.src(path.js)
        .pipe(babel())
        .pipe(gulp.dest(path.dest))
        .pipe(bs.stream());
});

gulp.task('scss', () => {
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.dest))
        .pipe(bs.stream());
});

gulp.task('watch', ['bs', 'html', 'js', 'scss'], () => {
    gulp.watch(path.html, ['html'])
        .on('change', bs.reload);;
    gulp.watch(path.js, ['js']);
    gulp.watch(path.scss, ['scss']);
});

gulp.task('default', [
    'html',
    'js',
    'scss',
    'bs',
    'watch'
]);