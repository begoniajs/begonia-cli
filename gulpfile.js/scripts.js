const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const path = require('path');

function scripts(source, targetDir, configPath) {
  console.log(source, targetDir, configPath);
  let tsProject = ts.createProject(path.resolve(process.cwd(), configPath));

  return function(cb) {
    let tsResult = src(path.resolve(process.cwd(), source)) // or tsProject.src()
      .pipe(tsProject())
      .pipe(dest(path.resolve(process.cwd(), targetDir)));

    cb();
  };

}

module.exports = scripts;
