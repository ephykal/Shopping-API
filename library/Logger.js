const chalk = require("chalk");

class Logging {
  static log(args) {
    Logging.info(args);
  }

  static info(args) {
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}],[INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  }

  static warining(args) {
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}],[WARNING]`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  }

  static error(args) {
    console.log(
      chalk.red(`[${new Date().toLocaleString()}],[ERROR]`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
  }
}

module.exports = Logging;
