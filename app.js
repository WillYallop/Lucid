require('dotenv').config();
const express = require('express');
const vhost = require('vhost');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



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
app.use(bodyParser.urlencoded({extended: false}));
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



// ------------------------------------
// ROUTES  SETUP                      |
// ------------------------------------

// Route imports
const apiGeneratorRoutes = require('./core/api/routes/generate');
const apiAdminRoutes = require('./core/api/routes/admin');
const apiThemeRoutes = require('./core/api/routes/theme');
const apiPageRoutes = require('./core/api/routes/page');
 
// Routes
api.use('/generate', apiGeneratorRoutes);
api.use('/admin', apiAdminRoutes);
api.use('/theme', apiThemeRoutes);
api.use('/page', apiPageRoutes);

mainapp.use('/', express.static(process.env.DIST_APP));
admin.use('/', express.static(process.env.DIST_ADMIN));
assets.use('/', express.static(process.env.DIST_ASSETS));

// Subdomain setup
app.use(vhost(`${process.env.DOMAIN}`, mainapp));
app.use(vhost(`admin.${process.env.DOMAIN}`, admin));
app.use(vhost(`api.${process.env.DOMAIN}`, api));
app.use(vhost(`assets.${process.env.DOMAIN}`, assets));

module.exports = app;