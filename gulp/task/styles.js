

import cleanCss from "gulp-clean-css";//Сжатие
import webpcss from "gulp-webpcss";//Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer";//Добавление префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries";//Группировка медиа



export const styles = () => {
    return app.gulp.src(app.path.src.styles)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "STYLES",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(
        app.plugins.if(
            app.isBuild,
            cleanCss()
        )
    )
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream());
}