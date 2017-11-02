const Express = require('express');
const BodyParser = require('body-parser');
const Router = require('../routes');

module.exports = (function App() {
  const app = Express();

  app.use(BodyParser.json());

  app.use(BodyParser.urlencoded({
    extended: true,
  }));

  app.use('/api', Router);

  return app;
}());
