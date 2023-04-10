import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";//Сжатие
import webpcss from "gulp-webpcss";//Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer";//Добавление префиксов
import sourcemaps from "gulp-sourcemaps";
import groupCssMediaQueries from "gulp-group-css-media-queries";//Группировка медиа


const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.if(
        app.isDev,
            sourcemaps.init()
        )
    )
    .pipe(app.plugins.replace(/@img\//g, '../images/'))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(
        app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        )
    )
    // .pipe(
    //     app.plugins.if(
    //         app.isBuild,
    //         webpcss(
    //             {
    //                 webpClass: ".webp",
    //                 noWebpClass: ".no-webp"
    //             }
    //         )
    //     )
    // )
    .pipe(
        app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.css)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            cleanCss()
        )
    )
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.plugins.if(
        app.isDev,
            sourcemaps.write()
        )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}