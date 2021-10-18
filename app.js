require('dotenv').config();
const express = require('express');
const connect = require('connect');
const vhost = require('vhost');
const ip = require("ip");

const apiRoutes = require('./core/api/routes/index');  // API Routers
 
// Subdomain APPS
const mainapp = connect();
const api = connect();
const admin = connect();
const assets = connect();

api.use('/', apiRoutes);
mainapp.use('/', express.static(process.env.DIST_APP));
admin.use('/', express.static(process.env.DIST_ADMIN));
assets.use('/', express.static(process.env.DIST_ASSETS));

// create main app
const app = connect();

app.use(vhost(`${process.env.DOMAIN}`, mainapp));
app.use(vhost(`admin.${process.env.DOMAIN}`, admin));
app.use(vhost(`api.${process.env.DOMAIN}`, api));
app.use(vhost(`assets.${process.env.DOMAIN}`, assets));

console.log(`${ip.address()}:${process.env.PORT || 80}`);
app.listen(process.env.PORT || 80);