

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


function addLogger({ app }) {
  app.use(logger('dev'));
  return {};
}

function parseJSONBody({ app }) {
  app.use(express.json());
  return {};
}

function urlencodeBody({ app }) {
  app.use(express.urlencoded({ extended: false }));
  return {};
}

function addCookieParser({ app }) {
  app.use(cookieParser());
  return {};
}

function addCommonMW({ app }) {
  return [
    addLogger,
    parseJSONBody,
    urlencodeBody,
    addCookieParser
  ].reduce((prev, item) => Object.assign({}, prev, item(prev)), { app })
}

module.exports = {
  addCommonMW,
  addLogger,
  parseJSONBody,
  urlencodeBody,
  addCookieParser
};
