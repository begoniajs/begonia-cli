const { src, dest } = require('gulp');
const rename = require('gulp-rename');

function assets(srouce, targetDir) {
  return function(cb) {
    return src(srouce)
      .pipe(rename(function(path) {}))
      .pipe(dest(targetDir));
  };
}

module.exports = assets;
