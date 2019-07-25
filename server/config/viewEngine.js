const path = require('path');

module.exports = function setViewEngine({ app }) {
  // view engine setup
  app.set('views', path.join(process.cwd(), './server/views'));
  app.set('view engine', 'hbs');
};
