const readFile = require('../lib/readFile');
const createDir = require('../lib/createDir');
const writeFile = require('../lib/writeFile');
const path = require('path');

async function addToConfig(packageName, appConfig, config) {
  appConfig.subpackages.push({
    root: packageName,
    name: packageName,
    pages: []
  });

  let data;
  try {
    data = JSON.stringify(appConfig, null, 2);
  } catch (error) {
    console.error('stringify appConfig failed.', error);
    return Promise.reject(false);
  }
  return await writeFile(path.join(process.cwd(), config.src), 'app.json', data);
}

module.exports = async function createSubPackage({ packageName } = { packageName: '' }, config = {}) {
  if (!packageName) {
    return Promise.reject(false);
  }
  let result = await readFile(path.join(process.cwd(), config.src, 'app.json'));
  if (!result || result.isError) {
    console.error('Read the app.json failed.', result);
    return Promise.reject(false);
  }
  let appConfig;
  try {
    appConfig = JSON.parse(result);
  } catch (error) {
    console.error('Parse the app.json failed.', error);
    return Promise.reject(false);
  }
  let isIn = appConfig.subpackages.some((item) => item.name === packageName);
  if (isIn) {
    console.error(`The ${packageName} already exists in the subPackages.`);
    return Promise.reject(false);
  }
  let dir = path.join(process.cwd(), config.src, packageName);
  return await Promise.all([
    createDir(dir),
    createDir(path.join(dir, 'pages')),
    createDir(path.join(dir, 'components')),
    addToConfig(packageName, appConfig, config)
  ])
    .then(function(res) {
      console.log('success-->>', res);
      return true;
    })
    .catch(function(err) {
      console.error('createPackageDir, addToConfig falied--->>', err);
      return false;
    });
};
