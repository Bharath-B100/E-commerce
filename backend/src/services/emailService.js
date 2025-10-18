const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

// Send email
exports.sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"ShopEasy" <${process.env.EMAIL_USERNAME}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

// Send order confirmation email
exports.sendOrderConfirmation = async (order, user) => {
    const { orderConfirmationTemplate } = require('../utils/emailTemplates');
    const subject = `Order Confirmation - ${order.orderNumber}`;
    const html = orderConfirmationTemplate(order, user);
    
    return await this.sendEmail(user.email, subject, html);
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
    const { welcomeEmailTemplate } = require('../utils/emailTemplates');
    const subject = 'Welcome to ShopEasy!';
    const html = welcomeEmailTemplate(user);
    
    return await this.sendEmail(user.email, subject, html);
};