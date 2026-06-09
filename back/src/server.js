const app = require('./app');
const config = require('./config');

// Start local dev server
app.listen(config.port, () => {
  console.log(`Server running → http://localhost:${config.port}`);
});
