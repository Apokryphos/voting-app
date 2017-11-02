const App = require('../../src/server/app');
const PollData = require('../data/poll-data.js');
const test = require('tape');
const Request = require('supertest');

//  Use different port to avoid EADDRINUSE error
const port = process.env.PORT || 3001;
const server = App.listen(port);

const request = Request(`http://localhost:${port}`);

test.onFinish(() => {
  //  Shutdown Express server or test will never end
  server.close();
});

test('GET /api/polls when Database is offline', t =>
  request
    .get('/api/polls')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    }));

test('POST /api/poll when Database is offline', (t) => {
  const pollData = PollData.valid();

  request
    .post('/api/poll')
    .send(pollData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    });
});

test('POST /api/poll missing name param when Database is offline', (t) => {
  request
    .post('/api/poll')
    .send({ question: 'Test', choices: ['a', 'b', 'c'] })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    });
});

test('POST /api/poll missing question param when Database is offline', (t) => {
  request
    .post('/api/poll')
    .send({ name: 'Test', choices: ['a', 'b', 'c'] })
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => t.end())
    .catch((e) => {
      t.fail(e);
      t.end();
    });
});

test('POST /api/poll missing choices param when Database is offline', (t) => {
  request
    .post('/api/poll')
    .send({ name: 'Test', question: 'Test' })
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => t.end())
    .catch((e) => {
      t.fail(e);
      t.end();
    });
});
