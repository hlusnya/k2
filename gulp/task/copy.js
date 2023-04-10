export const copy = () => {
    return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}

export const dir_root = () => {
    return app.gulp.src(app.path.src.dir_root)
    .pipe(app.gulp.dest(app.path.build.dir_root))
}
