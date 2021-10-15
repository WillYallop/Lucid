const express = require('express');
const app = express();

// Routers
const apiRoutes = require('./core/api/routes/index');
const appRoutes = require('./core/theme/routes/app');
const cmsRoutes = require('./core/theme/routes/cms');

// Static files
app.use('/dist/cms/scripts', express.static('./dist/cms/scripts'));
app.use('/dist/app/scripts', express.static('./dist/app/scripts'));
// Static assets
app.use('/dist/assets', express.static('./dist/assets'));

// Routes
app.use('/', appRoutes);
app.use('/site-admin', cmsRoutes);
app.use('/api', express.text(), apiRoutes);

module.exports = app;