'use strict'
const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport(emailConfig);
    }

    async sendContactEmail(formData)  {
        const mailOptions = {
            from:
                process.env.FROM_EMAIL,
            to:
                process.env.TO_EMAIL,
            subject: `New Contact: ${this.getSubjectDisplay(formData.subject)}`,
            html:
                this.generateEmailTemplate(formData),
            replyTo: formData.email
        };
        return await this.transporter.sendMail(mailOptions);
    };

    generateEmailTemplate({ name, email, subject, message }) {
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;"> New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
        <p><strong>Name</strong> ${name}</p>
        <p><strong>Email</strong> ${email}</p>
        <p><strong>Subject</strong> ${this.getSubjectDisplay(subject)}</p>
        <p><strong>Message</strong></p>
        <div style="background: white; padding: 15px;border-left: 4px solid #667eea;"
        ${message.replace(/\n/g, '<br>')}
        </div>
        </div>
        `;
    };
    getSubjectDisplay(subject) {
        const subjects = {
            'general': 'General Inquiry',
            'service': 'Book a service',
            'report':  'Report a bug',
            'collab':  'Collaborate',
            'advice':  'Seek advice',
        };
        return subjects[subject] || 'unknown'
    }
};

module.exports = new EmailService;