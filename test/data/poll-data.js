const Poll = require('../../src/js/models/poll.js');

//  Helper function to wrap creating a Poll in database
function createPoll(t, pollData, fn) {
  return Poll.create(pollData, (err, poll) => {
    if (err) {
      throw err;
    }
    if (process.env.VERBOSE_TESTS) {
      t.comment('Poll created.');
    }
    return poll;
  })
    .then(poll => fn(poll))
    .catch((err) => {
      t.fail(err);
      t.end();
    });
}

//  Helper function to wrap testing two Poll objects
function testPoll(t, actual, expected) {
  if (actual === expected) {
    throw new Error('Actual and expected should be two different objects.');
  }

  t.equal(actual.createdBy, expected.createdBy);
  t.equal(actual.question, expected.question);
  t.equal(actual.choices.length, expected.choices.length);
  for (let c = 0; c < actual.choices.length; ++c) {
    t.equal(actual.choices[c].text, expected.choices[c].text);
    t.equal(actual.choices[c].votes.length, 0);
  }
}

//  Helper function to creating a valid Poll data object
function validPoll() {
  return {
    createdBy: 'Test User',
    question: "What's your favorite hot dog?",
    choices: [
      { text: "Attman's Deli" },
      { text: 'Ball Park Franks' },
      { text: 'Dachshund' },
      { text: 'Esskay' },
      { text: 'Hebrew National' },
      { text: "Nathan's Famous" },
    ],
  };
}

module.exports = {
  create: createPoll,
  test: testPoll,
  valid: validPoll,
};
