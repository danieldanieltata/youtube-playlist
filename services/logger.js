const { createLogger, transports, format } = require('winston');

class LoggerService {
    #logger;

    constructor() {
        this.#logger = createLogger({
            exitOnError: false,
            format: format.json(),
            transports: [
                new transports.Console({ level: 'debug' }),
            ],
        });
    }

    info(msg) {
        this.#log('info', msg);
    }

    warn(msg) {
        this.#log('warn', msg);
    }

    error(msg) {
        this.#log('error', msg);
    }

    debug(msg) {
        this.#log('debug', msg);
    }

    #log(logLevel, msg) {
        this.#logger.log({
            message: msg,
            level: logLevel,
        });
    }
}

module.exports = new LoggerService();
