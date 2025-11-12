'use stricts'
const logger = require('../utils/logger');

module.exports = (error, req, res, next) => {
    logger.error("Server error:", error);

    res.status(500).json({
        success: false,
        message: 'An internal server error  occured. Please try again later.'
    });
};