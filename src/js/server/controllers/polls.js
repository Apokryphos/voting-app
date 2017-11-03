const Poll = require('../../models/poll.js');

function getPolls(req, res) {
  Poll.find({}, (err, polls) => {
    res.send(polls);
  });
}

module.exports = {
  getPolls,
};
