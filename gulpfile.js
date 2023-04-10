import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isBuildWebp: process.argv.includes('--buildwebp') ,
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//Импорт задач
import { copy, dir_root } from "./gulp/task/copy.js";
import { reset } from "./gulp/task/reset.js";
import { html } from "./gulp/task/html.js";
import { server } from "./gulp/task/server.js";
import { scss } from "./gulp/task/scss.js";
import { styles } from "./gulp/task/styles.js";
import { js } from "./gulp/task/js.js";
import { images } from "./gulp/task/images.js";
import { svgSprive } from "./gulp/task/svgSprive.js";
import { otfToTtf, ttfToWoff, fontStyle, fonts } from "./gulp/task/fonts.js";

//Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.dir_root, dir_root);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.styles, styles);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.sprite_icons, svgSprive);
}


const fontsAll = gulp.series(/*otfToTtf, ttfToWoff, fontStyle,*/ fonts);

const mainTask = gulp.series(fontsAll, gulp.parallel(copy, dir_root, html, scss, styles, js, images, svgSprive));

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);

export { dev }
export { build }
export { svgSprive }

//Выполнение сценария по умолчанию
gulp.task('default', dev);