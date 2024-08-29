const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask(cb) {
  console.log("Starting scssTask...");
  src("app/scss/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }))
    .pipe(browsersync.stream())
    .on("end", () => {
      console.log("scssTask completed.");
      cb();
    })
    .on("error", (err) => {
      console.error("Error in scssTask:", err);
      cb(err);
    });
}

// JavaScript Task
function jsTask(cb) {
  console.log("Starting jsTask...");
  src("app/js/script.js", { sourcemaps: true })
    .pipe(
      babel({ presets: ["@babel/preset-env"] }).on("error", (err) => {
        console.error("Babel error:", err);
        cb(err);
      }),
    )
    .pipe(
      terser().on("error", (err) => {
        console.error("Terser error:", err);
        cb(err);
      }),
    )
    .pipe(dest("dist", { sourcemaps: "." }))
    .on("end", () => {
      console.log("jsTask completed.");
      cb();
    })
    .on("error", (err) => {
      console.error("Error in jsTask:", err);
      cb(err);
    });
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload); // Reloads on HTML changes

  watch("app/scss/**/*.scss", series(scssTask)); // Injects CSS on changes

  watch("app/**/*.js", series(jsTask, browserSyncReload)); // Rebuilds JS and reloads on changes
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, jsTask);

// // Initialize modules
// const { src, dest, watch, series } = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const cssnano = require("cssnano");
// const babel = require("gulp-babel");
// const terser = require("gulp-terser");
// const browsersync = require("browser-sync").create();

// // Use dart-sass for @use
// //sass.compiler = require('dart-sass');

// // Sass Task
// function scssTask(cb) {
//   return src("app/scss/style.scss", { sourcemaps: true })
//     .pipe(sass())
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(dest("dist", { sourcemaps: "." }))
//     .pipe(browsersync.stream()) // Inject changes without a full reload
//     // .on('end', cb)
//     .on('error', (err) => {
//       console.error('Error in scssTask:', err);
//       cb(err);
//     });
// }

// // JavaScript Task
// function jsTask(cb) {
//   return src("app/js/script.js", { sourcemaps: true })
//     .pipe(babel({ presets: ["@babel/preset-env"] }))
//     .pipe(terser())
//     .pipe(dest("dist", { sourcemaps: "." }))
//     // .on('end', cb)
//     .on('error', (err) => {
//       console.error('Error in jsTask:', err);
//       cb(err);
//     });
// }

// // Browsersync
// function browserSyncServe(cb) {
//   browsersync.init({
//     server: {
//       baseDir: ".",
//     },
//     notify: {
//       styles: {
//         top: "auto",
//         bottom: "0",
//       },
//     },
//   });
//   cb();
// }

// function browserSyncReload(cb) {
//   browsersync.reload();
//   cb();
// }

// // Watch Task
// function watchTask() {
//   watch("*.html", browserSyncReload); // Reloads on HTML changes

//   watch("app/scss/**/*.scss", series(scssTask)); // Injects CSS on changes

//   watch("app/**/*.js", series(jsTask, browserSyncReload)); // Rebuilds JS and reloads on changes
// }

// // Default Gulp Task
// exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

// // Build Gulp Task
// exports.build = series(scssTask, jsTask);
