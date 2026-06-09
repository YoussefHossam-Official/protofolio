// Contact service — sends email via Nodemailer
const nodemailer = require('nodemailer');
const config = require('../../config');

function createTransport() {
  const { user, pass, host, port } = config.email;
  if (!user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

module.exports.send = async ({ name, email, message }) => {
  const transport = createTransport();
  if (!transport) {
    console.log('Contact message (email not configured):', { name, email, message });
    return { sent: false };
  }
  await transport.sendMail({
    from: `"${name}" <${config.email.user}>`,
    replyTo: email,
    to: config.email.to,
    subject: `Portfolio Contact — ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });
  return { sent: true };
};
