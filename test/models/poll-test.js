const DbUtil = require('../db-util.js');
const Poll = require('../../src/js/models/poll.js');
const PollData = require('../data/poll-data.js');

DbUtil.testFixture('Can create Poll', (t) => {
  const pollData = PollData.valid();

  return Poll.create(pollData, (err, poll) => {
    t.equal(err, null);
    PollData.test(t, poll, pollData);
    t.end();
  });
});

DbUtil.testFixture('Cannot create Poll without properties', (t) => {
  const pollData = {};

  return Poll.create(pollData, (err) => {
    t.equal(err.name, 'ValidationError');
    t.ok(err.errors.name);
    t.ok(err.errors.question);
    t.ok(err.errors.choices);
    t.end();
  });
});

DbUtil.testFixture('Cannot create Poll without name', (t) => {
  const pollData = {
    question: 'test question',
    choices: ['a', 'b', 'c'],
  };

  return Poll.create(pollData, (err) => {
    t.equal(err.name, 'ValidationError');
    t.ok(err.errors.name);
    t.notOk(err.errors.question);
    t.notOk(err.errors.choices);
    t.end();
  });
});

DbUtil.testFixture('Cannot create Poll without question', (t) => {
  const pollData = {
    name: 'test name',
    choices: ['a', 'b', 'c'],
  };

  return Poll.create(pollData, (err) => {
    t.equal(err.name, 'ValidationError');
    t.notOk(err.errors.name);
    t.ok(err.errors.question);
    t.notOk(err.errors.choices);
    t.end();
  });
});

DbUtil.testFixture('Cannot create Poll without choices', (t) => {
  const pollData = {
    name: 'test name',
    question: 'test question',
  };

  return Poll.create(pollData, (err) => {
    t.equal(err.name, 'ValidationError');
    t.notOk(err.errors.name);
    t.notOk(err.errors.question);
    t.ok(err.errors.choices);
    t.end();
  });
});
