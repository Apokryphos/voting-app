const Mongoose = require('mongoose');
const Print = require('./print');

Mongoose.Promise = global.Promise;

module.exports = (function Db() {
  const options = { useMongoClient: true };

  function getName() {
    switch (process.env.NODE_ENV) {
      case 'development':
        return `${process.env.VOTING_APP_DB_NAME}-dev`;
      case 'test':
        return `${process.env.VOTING_APP_DB_NAME}-test`;
      default:
        return process.env.VOTING_APP_DB_NAME;
    }
  }

  function getUri() {
    const dbHost = process.env.VOTING_APP_DB_HOST;
    const dbPort = process.env.VOTING_APP_DB_PORT;
    const dbName = getName();
    return `mongodb://${dbHost}:${dbPort}/${dbName}`;
  }

  const dbUri = getUri();

  function isConnected() {
    return Mongoose.connection.readyState === 1;
  }

  function connect() {
    return Mongoose.connect(dbUri, options).catch((err) => {
      Print.error('Failed to connect to database.', err);
    });
  }

  function disconnect() {
    return Mongoose.disconnect();
  }

  function reconnect() {
    Print.status('Retrying database connection in five seconds...');
    setTimeout(connect, 5000);
  }

  function start(autoReconnect = true) {
    connect();

    Mongoose.connection.on('connected', () => {
      Print.success('Connected to database.');
    });

    Mongoose.connection.on('disconnected', () => {
      Print.error('Disconnected from database.');
      if (autoReconnect) {
        reconnect();
      }
    });

    process.on('SIGINT', () => {
      Mongoose.connection.close(() => {
        Print.status('Database connection closed.');
        process.exit(0);
      });
    });
  }

  return {
    connect,
    disconnect,
    getName,
    getUri,
    isConnected,
    start,
  };
}());
