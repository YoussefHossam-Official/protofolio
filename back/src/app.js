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
const { adminAuth } = require('./middleware/auth');

const pagesRoutes = require('./routes/pages.routes');
const projectsRoutes = require('./routes/projects.routes');
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Security headers
app.use(helmet({ contentSecurityPolicy: false }));

// CORS — allow frontend on different origin in dev
app.use(cors({ origin: true, credentials: true }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parsing (for JWT)
app.use(cookieParser());

// Logging
app.use(logger);
if (config.nodeEnv === 'development') app.use(morgan('dev'));

// Static files (for local dev)
app.use(express.static(config.paths.front));

// API routes
app.use('/api/pages', pagesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', rateLimiter, contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve index.html for SPA routes (admin pages, etc.)
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(config.paths.front, 'admin', 'index.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(config.paths.front, '404.html'));
});

// Error handler
app.use(errorHandler);

module.exports = app;
