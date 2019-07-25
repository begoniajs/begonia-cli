const home = require('../routes/home');

module.exports = function setRoutes({ app }) {
  app.use('/', home);
  return {};
}
