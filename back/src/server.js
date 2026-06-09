// da el server beta3na lel local development
// fe Vercel, da m4 hyst5dm — byst5dm api/index.js

const app = require('./app');
const config = require('./config');

// bn4a8al el server 3ala el port elly fe el config
app.listen(config.port, () => {
  console.log(`Server 4a8al → http://localhost:${config.port}`);
});
