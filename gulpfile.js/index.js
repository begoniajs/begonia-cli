const { parallel, series } = require('gulp');
const scripts = require('./scripts')('./src/**/*.ts', './release', 'tsconfig.json');
const styles = require('./styles')('./src/**/*.scss', './release', '.wxss');
const views = require('./views')('./src/**/*.html', './release', '.wxml');
const jsons = require('./jsons')('./src/**/*.json', './release');
const assets = require('./assets')('./src/assets/**/*.*', './release/assets');

module.exports = {
  scripts,
  styles,
  views,
  jsons,
  assets,
  build: parallel(
    scripts,
    styles,
    views,
    jsons,
    assets
  ),
  devBuild: parallel(scripts, styles, views),
  vcBuild: parallel(views, styles)
};
