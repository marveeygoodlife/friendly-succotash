'use strict'

const express = require('express');
const router = express.Router();

//import controller and middleware

const formController = require("../controllers/formControllers");
const validationMiddleware = require("../middleware/validation");
const rateLimitMiddleware = require("../middleware/rateLimit");

//form submission route with middleware

router.post('/submit-form',
    rateLimitMiddleware.formSubmission, // limit rate
    validationMiddleware.validateFormInput,//validate form
    formController.submitForm// process form
);

module.exports = router;