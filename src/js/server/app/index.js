const Express = require('express');
const BodyParser = require('body-parser');
const PollRouter = require('../routes/poll');
const LogRouter = require('../routes/log');

module.exports = (function App() {
  const app = Express();

  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  app.use(BodyParser.json());

  app.use(BodyParser.urlencoded({
    extended: true,
  }));

  app.use(LogRouter);
  app.use('/api', PollRouter);

  return app;
}());
