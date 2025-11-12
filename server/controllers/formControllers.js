"use strict"

const emailService = require("../utils/emailService");
const logger = require("../utils/logger");

exports.submitForm = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        // send email
        await emailService.sendContactEmail({
            name, email, subject, message
        });
        
        logger.info('Form Submitted successfully', { email, subject });
        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });

    } catch (error) {
        logger.error("Form Submission Failed, check logger.", { error: error.message });
        next(error)
    }
};