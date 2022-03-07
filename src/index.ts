/// <reference path="../types/index.d.ts" />

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

import clc from 'cli-color';

import app from "./app";
import http from 'http';
import ip from 'ip';

import validate from "./validator";
import validatorConfig from './validator/validator-config';
import * as generator from './generator';
import * as componentController from './controller/component';
import * as postsController from './controller/posts';
import * as themeController from './controller/theme';
import * as distController from './controller/dist';
import * as contentTypeController from './controller/content_type_config';
import * as templateController from './controller/template';

const start = () => {

    const port = process.env.PORT || 80;
    const server = http.createServer(app);
    server.listen(port);

    console.log((clc.yellow('-------------------------------------------------------------------------------------')));
    console.log();
    console.log(clc.yellow(clc.bold("Welcome to Lucid!")));
    console.log();
    console.log(clc.yellow("First time? Read our set up guide @ https://lucidcms.com/getting-started"));
    console.log(clc.yellow("Documentation? Dive in @ https://lucidcms.com/documentation"));
    console.log();
    process.stdout.write(clc.yellow(clc.columns([
        [clc.bold("Domain"), clc.bold("IP")],
        [`${ config.https ? 'https://' : 'http://' }${ config.domain }`, `${ip.address()}:${port}`],
        [`${ config.https ? 'https://' : 'http://' }cms.${ config.domain }`, `${ip.address()}:${port}`],
        [`${ config.https ? 'https://' : 'http://' }api.${ config.domain }`, `${ip.address()}:${port}`],
        [`${ config.https ? 'https://' : 'http://' }assets.${ config.domain }`, `${ip.address()}:${port}`],
      ]))
    );
    console.log();
    console.log((clc.yellow('-------------------------------------------------------------------------------------')));
      
}


export {
    validate,
    validatorConfig,
    componentController,
    postsController,
    themeController,
    distController,
    contentTypeController,
    generator,
    templateController,
    start
};