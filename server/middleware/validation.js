const validator = require('validator');

exports.validateFormInput = (req, res, next) => {
    const { name, email, subject, message } = req.body;

    // Check required fields
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    // Validate name
    if (!validator.isLength(name, { min: 2, max: 100 })) {
        return res.status(400).json({
            success: false,
            message: 'Name must be between 2-100 characters'
        });
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    // Validate subject
    const validSubjects = ['general', 'service', 'report', 'collab', 'advice'];
    if (!validSubjects.includes(subject)) {
        return res.status(400).json({
            success: false,
            message: 'Please select a valid subject'
        });
    }

    // Validate message
    if (!validator.isLength(message, { min: 10, max: 1000 })) {
        return res.status(400).json({
            success: false,
            message: 'Message must be between 10-1000 characters'
        });
    }

    // Sanitize data
    req.body.name = validator.escape(name.trim());
    req.body.email = validator.normalizeEmail(email);
    req.body.message = validator.escape(message.trim());

    next();
};