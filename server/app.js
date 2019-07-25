const express = require('express');

const setRoutes = require('./config/routes');
const setViewEngine = require('./config/viewEngine');
const setStaticSrcRoute = require('./config/staticSrcRoute');
const { addCommonMW } = require('./config/middlewares');
const { watchCommonErr } = require('./config/errors');

function createApp() {
  return express();
}

module.exports = function initApp() {
  return [
    setViewEngine,  // 设置渲染引擎
    addCommonMW, // 设置常用中间件
    setStaticSrcRoute, // 设置静态资源路由
    setRoutes, // 设置路由
    watchCommonErr // 设置错误捕捉
  ].reduce(
    (prev, item) => Object.assign({}, prev, item(prev)),
    { app: createApp() }
  )['app'];
};
