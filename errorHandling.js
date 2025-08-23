// Example: Centralized Error Handling

// utils/errorHandler.js
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { AppError };

// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Different error responses for development and production
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
        // Production: don't leak error details
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or unknown errors
            console.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            });
        }
    }
};

module.exports = { errorHandler };

// Usage in app.js
const { errorHandler } = require('./middleware/errorMiddleware');
const { AppError } = require('./utils/errorHandler');

// This route throws a custom error
app.get('/api/error-demo', (req, res, next) => {
    next(new AppError(404, 'Resource not found'));
});

// Error handling middleware (must be last)
app.use(errorHandler);
