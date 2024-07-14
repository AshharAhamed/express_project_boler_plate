const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format

const myformat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${info.message}`;
});

const logPath = process.env.LOG_PATH

const logger = createLogger({
    level: "info",
    format: combine(
        label({ label: '127.1.0.0' }), // Loopback Address
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myformat
    ),
    transports: [
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`

        new transports.Console({
            handleExceptions: true,
            colorize: true
        }),
        new transports.File({
            filename: `${logPath}error.log`,
            handleExceptions: true,
            maxsize: 10485760, // 10MB
            maxFiles: 5,
            level: 'error'
        }),
        new transports.File({ filename: `${logPath}combined.log` })
    ],
    exitOnError: false // do not exit on handled exception 
});

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message)
    }
}