const Express = require('express');
const Db = require('../db');
const PollController = require('../controllers/poll');
const PollsController = require('../controllers/polls');

module.exports = (function Router() {
  //  Middleware to check if database is connected
  function checkDatabase(req, res, next) {
    if (Db.isConnected()) {
      //  Database is connected.
      next();
    } else {
      //  Database is NOT connected.
      //  Send error message to client.
      res.status(503).end('Database unavailable.');
    }
  }

  const router = Express.Router();

  router.use('/poll/:poll_id', checkDatabase);
  router
    .route('/poll/:poll_id')
    .get(PollController.getPoll)
    .delete(PollController.deletePoll);

  router.use('/poll', checkDatabase);
  router.route('/poll').post(PollController.postPoll);

  router.use('/polls', checkDatabase);
  router.route('/polls').get(PollsController.getPolls);

  return router;
}());
