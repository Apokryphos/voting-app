const Poll = require('../../models/poll');

function deletePoll(req, res) {
  Poll.findByIdAndRemove(req.params.poll_id, (err, poll) => {
    if (err) {
      if (err.name === 'CastError') {
        //  Client passed an ID that wasn't an ObjectId
        res.status(400).json(err);
        return;
      }
      //  Some other error
      res.status(500).json(err);
      return;
    }

    if (poll) {
      //  Deleted OK
      res.sendStatus(204);
    } else {
      //  Couldn't find document with matching ObjectId
      res.sendStatus(404);
    }
  });
}

function getPoll(req, res) {
  Poll.findById(req.params.poll_id, (err, poll) => {
    if (err) {
      if (err.name === 'CastError') {
        //  Client passed an ID that wasn't an ObjectId
        res.status(400).json(err);
        return;
      }
      res.status(500).json(err);
      return;
    }

    if (poll) {
      res.json(poll);
    } else {
      res.status(404).json(null);
    }
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
  deletePoll,
  getPoll,
  postPoll,
};
