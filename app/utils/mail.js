const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    //   secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function main(to, subject, data) {
    const info = await transporter.sendMail({
        // from: process.env.MAIL_FROM,
        to,
        subject,
        html: data,
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = main;
