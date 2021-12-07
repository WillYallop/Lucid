/// <reference path="../node_modules/lucid-core/types/index.d.ts" />

require('dotenv').config();
import express from 'express';
import vhost from 'vhost';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { schema } from "./api/schema";
const expressGraphQL = require('express-graphql').graphqlHTTP;

const path = require('path');
const config = require(path.resolve('./lucid.config.js'));
// Directories
const templatesDir = path.resolve(config.directories.templates);
const themeDir = path.resolve(config.directories.theme);

// create main app
const app = express();
// Subdomain APPS
const mainapp = express();
const api = express();
const cms = express();
const assets = express();

// ------------------------------------ 
// DB CONNECTION                      |
// ------------------------------------
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ADDRESS}`, {
    dbName: process.env.DB_NAME
})

mongoose.Promise = global.Promise;

// ------------------------------------
// MIDDLEWARE                         |
// ------------------------------------
app.use(morgan('dev'));

// ------------------------------------
// SUBDOMAINS                         |
// ------------------------------------
api.use('/graphql', expressGraphQL({
    graphiql: true,
    schema: schema
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