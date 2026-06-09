// App entry — Express setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');

// Module routes (modular architecture — each module has its own routes, controller, validation)
const pagesRoutes = require('./modules/pages/pages.routes');
const projectsRoutes = require('./modules/projects/projects.routes');
const contactRoutes = require('./modules/contact/contact.routes');
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');

const app = express();

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
app.use(logger);
if (config.nodeEnv === 'development') app.use(morgan('dev'));

// Static files
app.use(express.static(config.paths.front));

// API routes
app.use('/api/pages', pagesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', rateLimiter, contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Admin SPA fallback
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(config.paths.front, 'admin', 'index.html'));
});

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(config.paths.front, '404.html'));
});

// Error handler
app.use(errorHandler);

module.exports = app;
