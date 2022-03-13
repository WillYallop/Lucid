require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import { privateSchema } from "./graphql/auth/schema";
const expressGraphQL = require('express-graphql').graphqlHTTP;

const path = require('path');
const config = require(path.resolve('./lucid.config.js'));
// Directories
const themeDir = path.resolve(config.directories.theme);


// ------------------------------------
// CORS                               |
// ------------------------------------    
const sharedCors = (req: any, res: any, next: any) => {
  const allowedOrigins = [
    ...config.allowOrigins
  ];
  const origin = req.headers.origin;
  if(allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  else {
    if(origin) {
      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
    }
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth-Strategy');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
}



// ------------------------------------
// APP                                |
// ------------------------------------
const app = express();

// ------------------------------------
// CORS         
app.use(sharedCors);

// ------------------------------------
// MIDDLEWARE                      
app.use(morgan('dev'));

// ------------------------------------
// Routes
app.use('/', express.static(path.resolve(`${config.build}/app`), { extensions: ['html'] }));
app.use('/assets', express.static(path.resolve(`${config.build}/assets`)));

// ------------------------------------
// ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Not Found');
  next(error);
});
app.use((error:any, req:any, res:any, next:any) => {
  res.status(error.status || 500);
  res.sendFile(`${themeDir}/404.html`);
});


// ------------------------------------
// CMS                                |
// ------------------------------------
const cms = express();

// ------------------------------------
// CORS         
cms.use(sharedCors);

// ------------------------------------
// MIDDLEWARE                      
cms.use(morgan('dev'));

// ------------------------------------
// Routes

// api routes
cms.use('/api/v1', expressGraphQL({
  graphiql: true,
  schema: privateSchema
}));

// cdn routes
cms.use('/cdn', (req, res, next) => {
    res.send('THIS WILL BE THE CDN');
});
cms.use('/app-assets', express.static(path.resolve(`${config.build}/assets`)));

/// cms react route
cms.use(express.static(path.join(__dirname, "..",  "cms", "build")));
cms.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "cms", "build", "index.html"));
});

// ------------------------------------
// ERROR HANDLING
cms.use((req, res, next) => {
  const error = new Error('Not Found');
  next(error);
});
cms.use((error:any, req:any, res:any, next:any) => {
  res.status(error.status || 500);
  res.json({
    error: {
        message: error.message
    }
  });
});


export default { app: app, cms: cms };