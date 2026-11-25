const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool:true,       // connection pool use karein
  maxConnections: 1,    // ek time par sirf ek connection
  rateDelta: 10000,    // 10 second ka window
  rateLimit: 3      // 10 sec me max 3 emails
});

const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text, // Ya html: text agar aap HTML bhejna chahte hain
    });
    console.log(`✉️ Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw error;
  }
};

module.exports = { sendEmail };