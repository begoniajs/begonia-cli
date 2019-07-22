const { src, dest } = require('gulp');
const rename = require('gulp-rename');

function views(srouce, targetDir, extName) {
  return function(cb) {
    return src(srouce)
      .pipe(rename(function(path){
        path.extname = extName;
      }))
      .pipe(dest(targetDir));
  };
}

module.exports = views;

