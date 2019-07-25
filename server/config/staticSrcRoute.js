const express = require('express');
const path = require('path');

module.exports = function setStaticSrcRoute({ app }) {
  app.use(express.static(path.join(process.cwd(), './server/static')));
  return {};
};
