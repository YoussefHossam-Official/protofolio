const nodemailer = require('nodemailer');
const config = require('../config');

function createTransporter() {
  const { user, pass, host, port } = config.email;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendContactEmail({ name, email, message }) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured — message saved to log');
    console.log({ name, email, message });
    return { sent: false, reason: 'Email not configured' };
  }
  await transporter.sendMail({
    from: `"${name}" <${config.email.user}>`,
    replyTo: email,
    to: config.email.to,
    subject: `Portfolio Contact — ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });
  return { sent: true };
}

module.exports = { sendContactEmail };
