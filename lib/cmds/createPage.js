const path = require('path');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
const readFile = require('../lib/readFile');
const fileCnt = require('../files/file');

function findPackage(subpackages = [], packageName) {
  let i = -1;
  let obj = subpackages.find(function(item, index) {
    if (item.name === packageName) {
      i = index;
    }
    return item.name === packageName;
  });
  return [i, obj];
}

async function addPathToConfig(
  { pageName, packageName } = { pageName: '', packageName: '' },
  config = {}
) {
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
  let pageStr = `pages/${pageName}/${pageName}`;

  if (packageName && appConfig.subpackages) {
    let [index, packageObj] = findPackage(appConfig.subpackages, packageName);
    console.log(index, packageObj);
    if (index < 0) {
      console.error('Can not find the package', packageName);
      return Promise.reject(false);
    }
    packageObj.pages.push(pageStr);
    appConfig.subpackages[index] = Object.assign({}, packageObj);
  } else {
    appConfig.pages.push(pageStr);
  }

  let data = JSON.stringify(appConfig, null, 2);
  return await writeFile(srcPath, 'app.json', data);
}

/**
 * @description 创建页面文件组合
 */
module.exports = async function createPage(
  { pageName, packageName } = { pageName: '', packageName: '' },
  config = {}
) {
  let srcPath = path.resolve(process.cwd(), config.src);
  let pagePath = packageName
    ? path.join(srcPath, packageName, 'pages', pageName)
    : path.join(srcPath, config.pages, pageName);
  console.log('Will create page--->', pagePath);
  let pageDirOk = await createDir(pagePath);
  if (!pageDirOk) {
    return Promise.reject(false);
  }

  let scriptLang = config.scriptLang || 'js';
  let styleLang = config.styleLang || 'css';
  let fileMaker = fileCnt[scriptLang].page;

  let ok = await Promise.all([
    writeFile(pagePath, `${pageName}.${scriptLang}`, fileMaker.script({ pageName, author: config.author })),
    writeFile(pagePath, `${pageName}.html`, fileMaker.html({ pageName })),
    writeFile(pagePath, `${pageName}.${styleLang}`, fileMaker[styleLang]()),
    writeFile(pagePath, `${pageName}.json`, fileMaker.json()),
    addPathToConfig({ pageName, packageName }, config)
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
