require('dotenv').config();
const express = require('express');
const vhost = require('vhost');

const apiRoutes = require('./core/api/routes/index');  // API Routers
 
// Subdomain APPS
const mainapp = express();
const api = express();
const admin = express();
const assets = express();

api.use('/', express.text(), apiRoutes);
mainapp.use('/', express.static(process.env.DIST_APP));
admin.use('/', express.static(process.env.DIST_ADMIN));
assets.use('/', express.static(process.env.DIST_ASSETS));

// create main app
const app = express();

app.use(vhost(`${process.env.DOMAIN}`, mainapp));
app.use(vhost(`admin.${process.env.DOMAIN}`, admin));
app.use(vhost(`api.${process.env.DOMAIN}`, api));
app.use(vhost(`assets.${process.env.DOMAIN}`, assets));

module.exports = app;