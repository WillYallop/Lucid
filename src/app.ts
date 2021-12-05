require('dotenv').config();
import express from 'express';
import vhost from 'vhost';
import morgan from 'morgan';
import mongoose from 'mongoose';

const path = require('path');
const config = require(path.resolve('./lucid.config.js'));
// Directories
const templatesDir = path.resolve(config.directories.templates);
const themeDir = path.resolve(config.directories.theme);

// create main app
const app = express();


// ------------------------------------
// DB CONNECTION                      |
// ------------------------------------
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ADDRESS}`, {
    dbName: process.env.DB_NAME
})
.then(() => {

    mongoose.Promise = global.Promise;

    // ------------------------------------
    //  VHOST SETUP                       |
    // ------------------------------------

    // Subdomain APPS
    const mainapp = express();
    const api = express();
    const cms = express();
    const assets = express();



    // ------------------------------------
    // MIDDLEWARE                         |
    // ------------------------------------

    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }));
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
    const apiGeneratorRoutes = require('./api/routes/generate');
    const apiCmsRoutes = require('./api/routes/cms');
    const apiThemeRoutes = require('./api/routes/theme');

    // Routes
    api.use('/generate', apiGeneratorRoutes);
    api.use('/cms', apiCmsRoutes);
    api.use('/theme', apiThemeRoutes);

    mainapp.use('/', express.static(path.resolve(config.directories.dist), { extensions: ['html'] }));
    cms.use('/', express.static(path.resolve(config.directories.cms_dist)));
    assets.use('/', express.static(path.resolve(config.directories.assets_dist)));


    // Subdomain setup
    app.use(vhost(`${config.domain}`, mainapp));
    app.use(vhost(`cms.${config.domain}`, cms));
    app.use(vhost(`api.${config.domain}`, api));
    app.use(vhost(`assets.${config.domain}`, assets));


    //Handle errors that make it past routes
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        next(error);
    });
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        // If the error is on the home page and is a 404
        if(req.vhost.host === config.domain && error.status === 404) {
            res.sendFile(`${themeDir}/404.html`)
        }
        else {
            res.json({
                error: {
                    message: error.message
                }
            });
        }
    });


})
.catch((err) => {
    console.log(err);
    app.use((req, res, next) => {
        res.sendFile(`${templatesDir}/connect-db.html`)
    });
})

export default app;