'use strict'
const logger = require('../utils/logger');

module.exports = (error, req, res, next) => {
    logger.error('Server error', { message: error.message, stack: error.stack });

    res.status(500).json({
        success: false,
        message: 'An internal server error occurred. Please try again later.'
    });
};