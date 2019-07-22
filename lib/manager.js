const readFile = require('./lib/readFile');
const path = require('path');
const createPage = require('./cmds/createPage');
const createComponent = require('./cmds/createComponent');
const createSubpackage = require('./cmds/createSubpackage');
const createService = require('./cmds/createService');
const createWorker = require('./cmds/createWorker');
const createStore = require('./cmds/createStore');

const cmdHandler = {
  help() {
    console.log('exec cmd help----->');
    return console.log(`
      命令格式:\t\t\tnpm run m -- <cmd> <key=value> -- <cmd> <key=value>\n
      help\t\t\t输出帮助文本\n

      setConfig\t\t\t设置be.project.json中的配置项\n

      resetDefault\t\t以最小化配置重置be.project.json中的设置\n

      projectConfig\t\t打印项目配置内容\n

      createPage\t\t根据be.project.json中的设置，在指定目录创建页面文件view(html), script(js/ts), style(scss/css), config(json)，
                \t\t并在pages目录中创建页面逻辑功能所需的文件和文件夹
      \t\t\t\t\t参数：
      \t\t\t\t\t\t- page 页面名称 page=<pageName> 在pages目录建立同名的文件夹和相应的文件
      \t\t\t\t\t\t- package 子包名称 package=<sub package name> 如果配置此项，页面将会建立在该子包的pages目录下。

      createComponent\t\t在指定目录创建一个component文件组件组合
      \t\t\t\t\t参数:
      \t\t\t\t\t\t- component 组件名称 component=<componentName>
      \t\t\t\t\t\t- path 组件所在地址 相对于项目根目录(例如：src)的文件存放地址，例如"/pages/pageName/components/"，最终文件会在"/src/pages/pageName/components/"中

      createSubpackage\t\t在指定目录创建一个子包文件夹
      \t\t\t\t\t参数:
      \t\t\t\t\t\t- package 子包名称 package=<sub package name>

      createService\t\t在指定目录创建服务文件或者服务处理文件(service data)
      \t\t\t\t\t参数:
      \t\t\t\t\t\t- type 服务文件类型 type=<type txt> 取值: service / serviceData
      \t\t\t\t\t\t- name 文件名称 name=<file name>
      \t\t\t\t\t\t- path 文件所在地址 相对于项目根目录(例如：src)的文件存放地址，例如"/service/"，最终文件会在"/src/service"中

      createStore\t\t在指定目录创建状态管理文件store或者state分支文件
      \t\t\t\t\t参数:
      \t\t\t\t\t\t- type 文件类型 type=<type txt> 取值: store / branch
      \t\t\t\t\t\t- name 文件名称 name=<file name>
      \t\t\t\t\t\t- path 文件所在地址 相对于项目根目录(例如：src)的文件存放地址，例如"/store/"，最终文件会在"/src/store"中

      createWorker\t\t在指定目录创建线程文件
      \t\t\t\t\t参数:
      \t\t\t\t\t\t- type 线程文件类型 type=<type txt> 取值: entry
      \t\t\t\t\t\t- name 线程名称 name=<file name>，将会在存放线程的目录中建立同名文件夹和入口文件
      \t\t\t\t\t\t文件会被创建在小程序的app.json中workers字段所指定的目录中

      default\t\t\t默认输出
    `);
  },
  setConfig(params = {}, config = {}) {
    console.log('exec cmd------>>setConfig:', params);
    writeFile(
      path.join(process.cwd(), './devBuild'),
      'be.project.json',
      JSON.stringify(Object.assign({}, config, params), null, 2)
    )
      .then(function(res) {
        if (res) {
          console.log('update be.project.json scuccess!!!');
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  resetDefault(params = {}, config = {}) {
    console.log('exec cmd------>>resetDefault:', params);
  },
  projectConfig(params = {}, config = {}) {
    console.log('exec cmd------>>projectConfig:', params);
    console.info(config);
  },
  async createPage(params = {}, config = {}) {
    console.log('exec cmd------>>createPage:', params);
    let ok = await createPage(
      {
        pageName: params.page,
        packageName: params.package || ''
      },
      config
    );
    if (!ok) {
      return console.error('Create page failed, please check the params.', params);
    }

    console.info(`Create the page ${params.page} success!!!`);
  },
  async createComponent(params = {}, config = {}) {
    console.log('exec cmd------>>createComponent:', params);
    let ok = await createComponent(
      {
        component: params.component,
        targetPath: params.path || ''
      },
      config
    );
    if (!ok) {
      return console.error('Create component failed, please check the params.', params);
    }

    console.info(`Create the page ${params.component} success!!!`);
  },
  async createSubpackage(params = {}, config = {}) {
    let packageName = params.package || '';
    createSubpackage({ packageName }, config)
      .then(function() {
        console.log(`Create the sub package ${packageName} success!!`);
      })
      .catch(function(err) {
        console.error(`Create the sub package ${packageName} failed!!!`, err);
      });
  },
  async createService(params = {}, config = {}) {
    let ok = await createService(
      {
        type: params.type || 'service',
        name: params.name || '',
        parentPath: params.path || ''
      },
      config
    );

    if (!ok) {
      return console.error('Create service/serviceData failed, please check the params.', params);
    }

    console.info(`Create the ${params.type} ${params.name} success!!!`);
  },
  async createWorker(params = {}, config = {}) {
    let ok = await createWorker(
      {
        type: params.type || 'entry',
        name: params.name || ''
      },
      config
    );

    if (!ok) {
      return console.error('Create worker failed, please check the params.', params);
    }

    console.info(`Create the ${params.type} ${params.name} success!!!`);
  },
  async createStore(params = {}, config = {}) {
    let ok = await createStore(
      {
        type: params.type || '',
        name: params.name || '',
        parentPath: params.path || ''
      },
      config
    );

    if (!ok) {
      return console.error('Create store/stateBranch failed, please check the params.', params);
    }

    console.info(`Create the ${params.type} ${params.name} success!!!`);
  },
  default() {
    console.log(`=======>>没有这个命令，不会执行任何东西<<=======`);
    return `=======>>没有这个命令，不会执行任何东西<<=======`;
  }
};

(async function init(cmds = []) {
  // console.log('run manager--->>', cmds);
  let config = await readFile(path.resolve(process.cwd(), './devBuild/be.project.json'));
  if (!config || config.isError) {
    console.error('Can not find the be.project.json file.', config);
    return;
  }

  try {
    config = JSON.parse(config);
  } catch (error) {
    console.error('parse config failed--->>>', error);
    return;
  }
  // console.log('config--->>', config);
  if (cmds.length <= 0) {
    return cmdHandler.help();
  }

  execCmds(
    chunkCmd(cmds).map(parseParams),
    cmdHandler,
    config
  );
})(process.argv.slice(2));

/**
 * 执行命令集合
 * @param {*} list
 * @param {*} handlers
 * @param {*} config
 */
function execCmds(list, handlers, config) {
  list.forEach(function(item = {}) {
    let cmd = item.cmd;
    let fn = handlers[cmd] || handlers.default;
    fn.apply(null, [item.params, config]);
  });
}
/**
 * 将命令文本打包成命令对象（命令名，参数集合）
 * @param {*} ary
 */
function chunkCmd(ary = []) {
  let start = 0;
  return ary.reduce(function(prev, item, index) {
    if (item && item === '--') {
      let list = ary.slice(start, index);
      start = index + 1;
      prev.push(list);
      return prev;
    }
    if (index === ary.length - 1) {
      prev.push(ary.slice(start));
    }
    return prev;
  }, []);
}
/**
 * 解析参数，产生参数集合
 * @param {*} list
 */
function parseParams(list = []) {
  let cmd = list[0] || 'default';
  let params = list.slice(1).reduce(function(prev, item) {
    if (item.indexOf('=') <= 0) {
      return prev;
    }
    let ary = item.split('=');
    prev[ary[0]] = ary[1];
    return prev;
  }, {});
  return {
    cmd,
    params
  };
}
