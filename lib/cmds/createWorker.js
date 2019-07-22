const path = require('path');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
const readFile = require('../lib/readFile');
const fileCnt = require('../files/file');

async function getWorkersDir(config = {}) {
  let srcPath = path.join(process.cwd(), config.src);
  let configPath = path.join(srcPath, 'app.json');
  let result = await readFile(configPath);
  if (!result || result.isError) {
    return Promise.reject(false);
  }
  let appConfig;
  try {
    appConfig = JSON.parse(result);
  } catch(error) {
    console.error('In createPage parse app.json failed.', error);
    return Promise.reject(false);
  }

  return Promise.resolve(path.join(srcPath, appConfig.workers));
}

module.exports = async function({ type, name } = {}, config = {}) {
  let scriptLang = config.scriptLang || 'js';
  let outputPath = await getWorkersDir(config);
  if (!outputPath) {
    return Promise.reject(false);
  }

  let fileMaker = fileCnt[scriptLang].worker[type || 'entry'];
  let workerDir = path.join(outputPath, name);
  let ok = [
    await createDir(workerDir),
    await writeFile(workerDir, `${name}.worker.${scriptLang}`, fileMaker({ title: name, author: config.author }))
  ].every(item => item);

  if (!ok) {
    return Promise.reject(false);
  }

  return Promise.resolve(true);
};
