/**
 * @description begonia-cli manager platform server
 * @author Brave Chan on 2019.7.25
 */
//============================================================
const app = require('./app');
const debug = require('debug')('begonia-cli-ui:server');
const http = require('http');
const os = require('os');

const { normalizePort } = require('./config/port');

//=============================================================
/**
 *
 * @param {*} param0
 */
function errorListener({ port }) {
  return function(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

/**
 *
 * @param {*} param0
 */
function listenListener({ server, debug, app }) {
  return function onListening() {

    let addr = server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
    debug('Listening on ' + bind);
  };
}
//=============================================================
/**
 *
 * @param {*} param0
 */
function addServerEvents({ server, port, debug }) {
  server.on('error', errorListener({ port }));
  server.on('listening', listenListener({ server, debug }));
  console.log('add server events finished...');
  return {};
}

/**
 *
 * @param {*} param0
 */
function setupSever({ server, port }) {
  server.listen(port);
  let host = server.address().address;
  console.log(`setup server at ${host}:${port}`, host);
  return {};
}

/**
 *
 * @param {*} param0
 */
function setPort({ app }) {
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  console.log('set port-->', port);
  return { port };
}

/**
 *
 */
function createServer({ app, http }) {
  const server = http.createServer(app);
  console.log('create server finished...');
  return { server };
}
//=============================================================
/**
 * @description 启动UI服务器
 */
module.exports = function setupUIServer() {
  return [
    setPort,  // 设置端口
    createServer, // 创建服务器
    addServerEvents, // 添加服务器事件
    setupSever, // 启动服务器


  ].reduce(
    (prev, item) => Object.assign({}, prev, item(prev)),
    {
      app: app(),
      server: {},
      port: '',
      debug,
      http
    }
  );
};
