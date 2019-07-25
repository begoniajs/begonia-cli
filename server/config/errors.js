const createError = require('http-errors');

const errWatchs = {
  [404]({ app }) {
    app.use(function(req, res, next) {
      next(createError(404));
    });
    return {};
  },
  default({ app }) {
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    return {};
  }
};

function watchCommonErr({ app }) {
  return [
    errWatchs['404'],
    errWatchs.default
  ].reduce((prev, item) => Object.assign({}, prev, item(prev)), { app });
}

module.exports = {
  watchCommonErr
};
