const path = require('path');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
// const readFile = require('../lib/readFile');
const fileCnt = require('../files/file');

module.exports = async function createStore(
  { type, name, parentPath },
  config = {}
) {
  let srcPath = path.resolve(process.cwd(), config.src);
  let outputPath = path.join(srcPath, parentPath);
  let scriptLang = config.scriptLang || 'js';
  console.log('Will create service--->', `${outputPath}\\${name}.${scriptLang}`);
  let dirOk = await createDir(outputPath);
  if (!dirOk) {
    return Promise.reject(false);
  }
  let fileMaker = fileCnt[scriptLang].store[type];
  let ok = await writeFile(outputPath, `${name}.${scriptLang}`, fileMaker({ title: name, author: config.author }));
  if (!ok) {
    return Promise.reject(false);
  }
  return Promise.resolve(true);
};