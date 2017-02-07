/* eslint-env node */


module.exports = function (app) {
  // Log proxy requests
  const morgan  = require('morgan');
  app.use(morgan('dev'));

  // Uncomment this for client-side routing
  // app.use((req, res, next) => {
  //   const acceptHeaders = req.headers.accept || [];
  //   const hasHTMLHeader = acceptHeaders.indexOf('text/html') !== -1;
  //
  //   if (hasHTMLHeader) {
  //     req.serveUrl = '/index.html';
  //   }
  //
  //   next();
  // });
};
