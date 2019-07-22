const path = require('path');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
// const readFile = require('../lib/readFile');
const fileCnt = require('../files/file');

/**
 * @description 创建服务文件
 */
module.exports = async function createService(
  { type, name, parentPath },
  config = {}
) {
  let srcPath = path.resolve(process.cwd(), config.src);
  let outputPath = path.join(srcPath, parentPath);
  let scriptLang = config.scriptLang || 'js';
  console.log('Will create service--->', `${outputPath}\\${name}.${scriptLang}`);
  let pageDirOk = await createDir(outputPath);
  if (!pageDirOk) {
    return Promise.reject(false);
  }
  let fileMaker = fileCnt[scriptLang].service[type];
  let ok = await writeFile(outputPath, `${name}.${scriptLang}`, fileMaker({ title: name, author: config.author }));
  if (!ok) {
    return Promise.reject(false);
  }

  return Promise.resolve(true);
}
