const Express = require('express');
const BodyParser = require('body-parser');
const PollRouter = require('../routes/poll');
const LogRouter = require('../routes/log');

module.exports = (function App() {
  const app = Express();

  app.use(BodyParser.json());

  app.use(BodyParser.urlencoded({
    extended: true,
  }));

  app.use(LogRouter);
  app.use('/api', PollRouter);

  return app;
}());
