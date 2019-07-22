const path = require('path');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
const fileCnt = require('../files/file');

/**
 * @description 创建页面文件组合
 */
module.exports = async function createComponent(
  { component, targetPath } = { component: '', targetPath: '' },
  config = {}
) {
  let srcPath = path.resolve(process.cwd(), config.src);
  let outputPath = path.join(srcPath, targetPath, component);
  console.log('Will create component--->', outputPath);
  let pageDirOk = await createDir(outputPath);
  if (!pageDirOk) {
    return Promise.reject(false);
  }

  let scriptLang = config.scriptLang || 'js';
  let styleLang = config.styleLang || 'css';
  let fileMaker = fileCnt[scriptLang].component;

  let ok = await Promise.all([
    writeFile(outputPath, `${component}.${scriptLang}`, fileMaker.script({ component, author: config.author })),
    writeFile(outputPath, `${component}.html`, fileMaker.html({ component })),
    writeFile(outputPath, `${component}.${styleLang}`, fileMaker[styleLang]()),
    writeFile(outputPath, `${component}.json`, fileMaker.json())
  ])
    .then(function(res = []) {
      return res.every(item => !!item);
    })
    .catch(function(err) {
      return false;
    });

  if (!ok) {
    return Promise.reject(false);
  }

  return Promise.resolve(true);
};
