/// <reference path="../node_modules/lucid-core/types/index.d.ts" />

require('dotenv').config();
import express from 'express';
import vhost from 'vhost';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { privateSchema } from "./graphql/private/schema";
const expressGraphQL = require('express-graphql').graphqlHTTP;

const path = require('path');
const config = require(path.resolve('./lucid.config.js'));
// Directories
const templatesDir = path.resolve(config.directories.templates);
const themeDir = path.resolve(config.directories.theme);

// create main app
const app = express();


// ------------------------------------
// DATABASE                           |
// ------------------------------------
mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.address}`, {
    dbName: config.database.name
});
mongoose.Promise = global.Promise;


// ------------------------------------
// MIDDLEWARE                         |
// ------------------------------------
app.use(morgan('dev'));


// Subdomain APPS
const mainapp = express();
const api = express();
const cms = express();
const assets = express();


// ------------------------------------
// SUBDOMAINS                         |
// ------------------------------------
// Graphql route - private / authenticated users only.
api.use('/private', expressGraphQL({
    graphiql: true,
    schema: privateSchema
}));

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

export default app;