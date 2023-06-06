const chalk = require('chalk');

const logger = {
  info: (message) => {
    console.log(chalk.blue(message));
  },
  warn: (message) => {
    console.log(chalk.yellow(message));
  },
  error: (message) => {
    console.log(chalk.red(message));
  },
};

module.exports = logger;