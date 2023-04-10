import webp from "gulp-webp";
import imagemin from "gulp-imagemin";


export const images = () => {
    return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "images",
            message: "Error: <%= error.message %>"
        })
    ))
    
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
        app.plugins.if(
            app.isBuildWebp,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuildWebp,
            app.gulp.dest(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuildWebp,
            app.gulp.src(app.path.src.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuildWebp,
            app.plugins.newer(app.path.build.images)
        )
    )
    .pipe(
        // app.plugins.if(
        //     app.isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false,  cleanupIDs: false}],
                interlaced: true,
                optimizationLevel: 3
            })
        // )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.sprite))
    .pipe(app.gulp.dest(app.path.build.images))

    .pipe(app.plugins.browsersync.stream());
}