require('dotenv').config();
import express from 'express';
import vhost from 'vhost';
import morgan from 'morgan';
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
app.use((req, res, next) => {

  const allowedOrigins = [
    `${config.https ? 'https://' : 'http://'}${config.domain}`,
    `${config.https ? 'https://' : 'http://'}cms.${config.domain}`,
    `${config.https ? 'https://' : 'http://'}assets.${config.domain}`,
    `${config.https ? 'https://' : 'http://'}api.${config.domain}`,
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  if(origin) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth-Strategy');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


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