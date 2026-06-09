// hna bn3ml setup lel Express app kolo
// el app dh hy4ta8al 3ala Vercel w 3ala localhost

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

// el config beta3na (fe el config folder)
const config = require('./config');
// el middleware elly bn7t 3aleeh fe error handling
const errorHandler = require('./middleware/errorHandler');
// middleware 3ashan n3rf kol request w7na 4a8aleen
const logger = require('./middleware/logger');
// middleware 3ashan n7d kol wa7ed 3ala el request
const rateLimiter = require('./middleware/rateLimiter');

// modules beta3etna (kol module 3ndo routes, controller, validation beta3to)
const pagesRoutes = require('./modules/pages/pages.routes');
const projectsRoutes = require('./modules/projects/projects.routes');
const contactRoutes = require('./modules/contact/contact.routes');
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const githubRoutes = require('./modules/github/github.routes');

// bn3ml el express app
const app = express();

// ============ Middleware ============

// da b7me el app mn kol 7aga (security headers)
// contentSecurityPolicy: false 3ashan el frontend y4ta8al m3a el inline styles
app.use(helmet({ contentSecurityPolicy: false }));

// da by5ly el frontend ytklem m3a el backend law homa fe domains m5tlfyn
app.use(cors({ origin: true, credentials: true }));

// ben7awl el JSON body mn el requests le JS object
app.use(express.json());
// ben7awl el URL-encoded body (mn el forms)
app.use(express.urlencoded({ extended: true }));

// da by2ra el cookies (3ashan el JWT token)
app.use(cookieParser());

// da bytl3 kol request fe el terminal (3ashan debugging)
app.use(logger);
// fe development bnst5dm morgan kaman 3ashan el log ykon a7la
if (config.nodeEnv === 'development') app.use(morgan('dev'));

// el static files (HTML, CSS, JS) — bn7othom fe front folder
app.use(express.static(config.paths.front));

// ============ Routes ============

// el pages routes (home, about, projects, contact)
app.use('/api/pages', pagesRoutes);
// el projects API (public — 4of el projects)
app.use('/api/projects', projectsRoutes);
// el contact form API (m7my bel rate limiter 3ashan el spam)
app.use('/api/contact', rateLimiter, contactRoutes);
// el auth routes (login, logout, change password)
app.use('/api/auth', authRoutes);
// el admin routes (CRUD — m7my bel auth middleware)
app.use('/api/admin', adminRoutes);
// el GitHub webhook w refresh (3ashan el repos ttt7addth awtomatyk)
app.use('/api/github', githubRoutes);

// law 7ad 7awel yro7 le /admin/* w mfesh file, nwreeh el admin index
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(config.paths.front, 'admin', 'index.html'));
});

// law 7ad 7awel yro7 le 7aga m4 mawgoda, nwreeh 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(config.paths.front, '404.html'));
});

// el error handler el a5er (law ay 7aga w74et 7asalt)
app.use(errorHandler);

module.exports = app;
