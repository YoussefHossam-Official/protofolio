const serverless = require('serverless-http');
const app = require('../back/src/app');

// Vercel entry point — wraps Express in a serverless handler
module.exports = serverless(app);
