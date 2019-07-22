const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
sass.compiler = require('node-sass');

function styles(source, targetDir, extName) {
  return function(cb) {
    return src(source)
      .pipe(sass().on('error', sass.logError))
      .pipe(rename(function(path) {
        path.extname = extName;
      }))
      .pipe(dest(targetDir))
  };
}

module.exports = styles;
