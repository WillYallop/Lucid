require('dotenv').config();
const express = require('express');
const vhost = require('vhost');
const morgan = require('morgan');
const mongoose = require('mongoose');



// ------------------------------------
// DB CONNECTION                      |
// ------------------------------------

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ADDRESS}`, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;



// ------------------------------------
//  VHOST SETUP                       |
// ------------------------------------

// Subdomain APPS
const mainapp = express();
const api = express();
const admin = express();
const assets = express();
// create main app
const app = express();



// ------------------------------------
// MIDDLEWARE                         |
// ------------------------------------

app.use(morgan('dev'));



// ------------------------------------
// ROUTES  SETUP                      |
// ------------------------------------

// Route imports
const apiGeneratorRoutes = require('./core/api/routes/generate');
const apiAdminRoutes = require('./core/api/routes/admin');
const apiPageRoutes = require('./core/api/routes/page');
 
// Routes
api.use('/generate', express.text(), apiGeneratorRoutes);
api.use('/admin', express.text(), apiAdminRoutes);
api.use('/page', express.text(), apiPageRoutes);

mainapp.use('/', express.static(process.env.DIST_APP));
admin.use('/', express.static(process.env.DIST_ADMIN));
assets.use('/', express.static(process.env.DIST_ASSETS));

// Subdomain setup
app.use(vhost(`${process.env.DOMAIN}`, mainapp));
app.use(vhost(`admin.${process.env.DOMAIN}`, admin));
app.use(vhost(`api.${process.env.DOMAIN}`, api));
app.use(vhost(`assets.${process.env.DOMAIN}`, assets));

module.exports = app;