const Poll = require('../../models/poll');

function getPoll(req, res) {
  Poll.findById(req.params.poll_id, (err, poll) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(poll);
  });
}

function postPoll(req, res) {
  const poll = new Poll(req.body);

  poll.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err);
        return;
      }
      res.status(500).json(err);
    } else {
      res.json({ message: 'Poll created.', data: poll });
    }
  });
}

module.exports = {
  getPoll,
  postPoll,
};
