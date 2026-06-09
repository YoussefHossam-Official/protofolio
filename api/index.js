// da el entry point beta3 Vercel
// hna Express byt7wal le serverless function 3ashan y4ta8al 3ala Vercel
const serverlessHttp = require('serverless-http');
const app = require('../back/src/app');

// bn export el app wrapped bel serverless-http
module.exports = serverlessHttp(app);
