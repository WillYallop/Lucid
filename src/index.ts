/// <reference path="../types/index.d.ts" />

import clc from 'cli-color';

import lucid from "./app";
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

    // Start app
    const appPort = process.env.APP_PORT || 7343;
    const appServer = http.createServer(lucid.app);
    appServer.listen(appPort);

    // Start cms
    const cmsPort = process.env.CMS_PORT || 7344;
    const cmsServer = http.createServer(lucid.cms);
    cmsServer.listen(cmsPort);

    if(process.env.NODE_ENV == 'development') {
        console.log((clc.yellow('-------------------------------------------------------------------------------------')));
        console.log();
        console.log(clc.yellow(clc.bold("Welcome to Lucid!")));
        console.log();
        console.log(clc.yellow("First time? Read our set up guide @ https://lucidcms.com/getting-started"));
        console.log(clc.yellow("Documentation? Dive in @ https://lucidcms.com/documentation"));
        console.log();
        process.stdout.write(clc.yellow(clc.columns([
            [clc.bold("URL"), clc.bold("PORT"), clc.bold("SERVICE")],
            [`http://${ip.address()}:${appPort}`, `${appPort}`, 'app'],
            [`http://${ip.address()}:${cmsPort}`, `${cmsPort}`, 'cms']
          ]))
        );
        console.log();
        console.log((clc.yellow('-------------------------------------------------------------------------------------')));
    }
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