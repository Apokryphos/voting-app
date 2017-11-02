/* eslint no-console: 0 */
const Chalk = require('chalk');

module.exports = (function Print() {
  function printError(message, err) {
    console.error(Chalk.red(`\u2717 ${message}`));
    //  Don't print stack trace
    console.error(Chalk.red(`\u2717 ${err}`));
  }

  function printStatus(message) {
    console.log(Chalk.yellow(`\u2022 ${message}`));
  }

  function printSuccess(message) {
    console.log(Chalk.green(`\u2713 ${message}`));
  }

  return {
    error: printError,
    status: printStatus,
    success: printSuccess,
  };
}());
