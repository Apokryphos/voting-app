process.env.NODE_ENV = 'test';
/* eslint global-require: 0 */
require('dotenv').config();

require('./models');
require('./app/');
