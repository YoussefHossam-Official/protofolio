const nodemailer = require('nodemailer');
const config = require('../../config');

// hna bn3ml el email sending
// law el SMTP settings ms4 4a8ala, bnprint el resala fe el log

function createTransport() {
  const { user, pass, host, port } = config.email;
  if (!user || !pass) return null; // mfesh settings, nr22 null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

module.exports.send = async ({ name, email, message }) => {
  const transport = createTransport();
  if (!transport) {
    // email m4 configured — 5leha fe el log 3ashan n4ofo
    console.log('Contact message (email settings m4 mawgoda):', { name, email, message });
    return { sent: false };
  }
  await transport.sendMail({
    from: `"${name}" <${config.email.user}>`,
    replyTo: email,
    to: config.email.to,
    subject: `Portfolio Contact — ${name}`,
    html: `<p><strong>mn:</strong> ${name} (${email})</p><p>${message}</p>`,
  });
  return { sent: true };
};
