const dbUtil = require('../db-util.js');
const User = require('../../src/js/models/user.js');

dbUtil.testFixture('Can create User', (t) => {
  const userData = {
    name: 'Test User',
  };

  return User.create(userData, (err, user) => {
    t.equal(err, null);
    t.equal(user.name, userData.name);
    t.end();
  });
});

dbUtil.testFixture('Cannot create User without name', (t) => {
  const userData = {};
  User.create(userData, (err) => {
    t.equal(err.name, 'ValidationError');
    t.ok(err.errors.name);
    t.end();
  });
});
