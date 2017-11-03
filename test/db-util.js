const Mongoose = require('mongoose');
const test = require('tape');
const Db = require('../src/js/server/db');

function verbose(t, message) {
  if (process.env.VERBOSE_TESTS) {
    t.comment(message);
  }
}

Mongoose.Promise = global.Promise;

function clearDatabase(connection, t) {
  if (Db.isConnected()) {
    return connection.db.dropDatabase().then(() => {
      verbose(t, 'Database dropped');
    });
  }

  return Promise.resolve();
}

function setup(t) {
  if (!Db.isConnected()) {
    return Db.connect()
      .then(() => {
        if (Db.isConnected()) {
          verbose(t, 'Connected to database.');
        }
      })
      .then(() => clearDatabase(Mongoose.connection, t));
  }

  return clearDatabase(Mongoose.connection, t);
}

function teardown(t) {
  return Db.disconnect().then(() => verbose(t, 'Disconnected from database.'));
}

function testFixture(description, fn) {
  test(description, (t) => {
    setup(t)
      .then(() => fn(t))
      .then(() => teardown(t));
  });
}

module.exports = {
  clearDatabase,
  testFixture,
  setup,
  teardown,
};
