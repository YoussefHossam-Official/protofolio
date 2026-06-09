// Vercel entry — wraps Express in serverless-http handler
const serverless = require('serverless-http');
const app = require('../back/src/app');
module.exports = serverless(app);
