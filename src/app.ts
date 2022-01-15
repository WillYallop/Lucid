require('dotenv').config();
import express from 'express';
import vhost from 'vhost';
import morgan from 'morgan';
import cors from 'cors';
import { privateSchema } from "./graphql/auth/schema";
const expressGraphQL = require('express-graphql').graphqlHTTP;

const path = require('path');
const config = require(path.resolve('./lucid.config.js'));
// Directories
const templatesDir = path.resolve(config.directories.templates);
const themeDir = path.resolve(config.directories.theme);

// create main app
const app = express();

// ------------------------------------
// CORS                               |
// ------------------------------------
var whitelist = ['http://localhost:3000', `${config.https ? 'https://' : 'http://'}${config.domain}`];
var corsOptions = {
  origin: function (origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions))


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
api.use('/auth', expressGraphQL({
    graphiql: true,
    schema: privateSchema
}));

mainapp.use('/', express.static(path.resolve(config.directories.dist), { extensions: ['html'] }));
cms.use('/', express.static(path.resolve(__dirname, '../cms/build')));
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
app.use((error:any, req:any, res:any, next:any) => {
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