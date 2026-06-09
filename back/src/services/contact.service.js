const { sendContactEmail } = require('../utils/mailer');

async function handleContact({ name, email, message }) {
  return await sendContactEmail({ name, email, message });
}

module.exports = { handleContact };
