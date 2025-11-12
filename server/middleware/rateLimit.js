"use strict"
const rateLimit = require("express-rate-limit");

// limit form submission to 5 per minute per ip

exports.formSubmission = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 5, // 5 request
    message: {
        success: false,
        message: 'Too many formm submission. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});