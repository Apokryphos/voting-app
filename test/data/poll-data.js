const Poll = require('../../src/models/poll.js');

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

  t.equal(actual.name, expected.name);
  t.equal(actual.question, expected.question);
  t.equal(actual.choices.length, expected.choices.length);
  for (let c = 0; c < actual.choices.length; ++c) {
    t.equal(actual.choices[c], expected.choices[c]);
  }
}

//  Helper function to creating a valid Poll data object
function validPoll() {
  return {
    name: 'Test Poll',
    question: "What's your favorite hot dog?",
    choices: [
      "Attman's Deli",
      'Ball Park Franks',
      'Dachshund',
      'Esskay',
      'Hebrew National',
      "Nathan's Famous",
    ],
  };
}

module.exports = {
  create: createPoll,
  test: testPoll,
  valid: validPoll,
};
