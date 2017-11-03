const App = require('../../src/server/app');
const DbUtil = require('../db-util.js');
const PollData = require('../data/poll-data.js');
const test = require('tape');
const Request = require('supertest');

const port = process.env.PORT || 3000;
const server = App.listen(port);

const request = Request(`http://localhost:${port}`);

test.onFinish(() => {
  //  Shutdown Express server or test will never end
  server.close();
});

DbUtil.testFixture('GET /api/polls', t =>
  request
    .get('/api/polls')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, []);
      t.end();
    }));

DbUtil.testFixture('GET /api/polls - empty collection', t =>
  request
    .get('/api/polls')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      t.equal(response.body.length, 0);
      t.end();
    })
    .catch((e) => {
      t.fail(e);
      t.end();
    }));

DbUtil.testFixture('GET /api/polls', (t) => {
  const pollData = PollData.valid();

  const testRequest = () =>
    request
      .get('/api/polls')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        t.equal(response.body.length, 1);
        const poll = response.body[0];
        PollData.test(t, poll, pollData);
        t.end();
      })
      .catch((e) => {
        t.fail(e);
        t.end();
      });

  return PollData.create(t, pollData, testRequest);
});

DbUtil.testFixture('DELETE /api/poll', (t) => {
  const pollData = PollData.valid();

  return PollData.create(t, pollData, (poll) => {
    PollData.test(t, poll, pollData);

    //  Delete poll
    return request
      .delete(`/api/poll/${poll._id}`)
      .set('Accept', 'application/json')
      .expect(204)
      .then(() =>
        //  Confirm poll no longer exists
        request
          .get(`/api/poll/${poll._id}`)
          .expect(404)
          .then((res) => {
            t.equal(res.body, null);
            t.end();
          }));
  });
});

DbUtil.testFixture('DELETE /api/poll with non-existant ObjectID', t =>
  request
    .delete('/api/poll/59fa8d7305b9e712dea4e648')
    .set('Accept', 'application/json')
    .expect(404)
    .then(() => {
      t.end();
    }));

DbUtil.testFixture('DELETE /api/poll with invalid ObjectID', t =>
  request
    .delete('/api/poll/100')
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => {
      t.end();
    }));

DbUtil.testFixture('GET /api/poll', (t) => {
  const pollData = PollData.valid();

  return PollData.create(t, pollData, (poll) => {
    PollData.test(t, poll, pollData);

    return request
      .get(`/api/poll/${poll._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        const resPoll = res.body;
        PollData.test(t, resPoll, pollData);
        t.end();
      });
  });
});

DbUtil.testFixture('GET /api/poll with non-existant ObjectID', t =>
  request
    .get('/api/poll/59fa8d7305b9e712dea4e648')
    .set('Accept', 'application/json')
    .expect(404)
    .then(() => {
      t.end();
    }));

DbUtil.testFixture('GET /api/poll with invalid ObjectID', t =>
  request
    .get('/api/poll/100')
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => {
      t.end();
    }));

DbUtil.testFixture('POST /api/poll', (t) => {
  const pollData = PollData.valid();

  return request
    .post('/api/poll')
    .send(pollData)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      const poll = response.body.data;
      PollData.test(t, poll, pollData);
      t.end();
    });
});

DbUtil.testFixture('POST /api/poll - missing name param', t =>
  request
    .post('/api/poll')
    .send({ question: 'Test', choices: ['a', 'b', 'c'] })
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => {
      t.end();
    })
    .catch((e) => {
      t.fail(e);
      t.end();
    }));

DbUtil.testFixture('POST /api/poll - missing question param', t =>
  request
    .post('/api/poll')
    .send({ name: 'Test', choices: ['a', 'b', 'c'] })
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => t.end())
    .catch((e) => {
      t.fail(e);
      t.end();
    }));

DbUtil.testFixture('POST /api/poll - missing choices param', t =>
  request
    .post('/api/poll')
    .send({ name: 'Test', question: 'Test' })
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => t.end())
    .catch((e) => {
      t.fail(e);
      t.end();
    }));

DbUtil.testFixture('POST /api/poll - empty choices param', t =>
  request
    .post('/api/poll')
    .send({ name: 'Test', question: 'Test', choices: [] })
    .set('Accept', 'application/json')
    .expect(400)
    .then(() => t.end())
    .catch((e) => {
      t.fail(e);
      t.end();
    }));
