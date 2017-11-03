const App = require('../../src/js/server/app');
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

test('GET /api/polls fails when database is offline', t =>
  request
    .get('/api/polls')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    }));

test('DELETE /api/poll fails when database is offline', t =>
  request
    .delete('/api/poll')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    }));

test('DELETE /api/poll with non-existant ID fails when database is offline', t =>
  request
    .delete('/api/poll/59fa8d7305b9e712dea4e648')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    }));

test('DELETE /api/poll with non-object ID fails when database is offline', t =>
  request
    .delete('/api/poll/100')
    .set('Accept', 'application/json')
    .expect(503)
    .then(() => {
      t.end();
    }));

test('POST /api/poll fails when database is offline', (t) => {
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

test('POST /api/poll with missing name param fails when database is offline', (t) => {
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

test('POST /api/poll with missing question param fails when database is offline', (t) => {
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

test('POST /api/poll with missing choices param fails when database is offline', (t) => {
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
