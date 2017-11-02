if (process.env.NODE_ENV === 'development') {
  /* eslint global-require: 0 */
  require('dotenv').config();
}
const App = require('./app');
const Db = require('./db');
const Print = require('./print');

//  Start database with auto-reconnect
Db.start(true);

const port = process.env.PORT || 3000;

const listener = App.listen(port, () => {
  Print.status(`Build: ${process.env.NODE_ENV}`);

  const address = listener.address();
  Print.success(`Listening on ${address.address}:${address.port}...`);
});
