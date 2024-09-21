// utils/logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize } = format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

// Create logger instance
const logger = createLogger({
    level: 'info', // Set the minimum log level (e.g., 'info', 'debug', 'error')
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        // Console output
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat
            ),
        }),
        // File output
        new transports.File({
            filename: path.join(__dirname, '../logs/automation.log'),
            level: 'info', // Only log 'info' level and above to file
        }),
    ],
});

// Export the logger
export default logger;