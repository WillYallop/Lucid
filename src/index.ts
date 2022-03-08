/// <reference path="../types/index.d.ts" />

import http from 'http';

import lucid from "./app";
import buildProcess from './functions/build_process';

import validate from "./validator";
import validatorConfig from './validator/validator-config';
import * as generator from './generator';
import * as componentController from './controller/component';
import * as postsController from './controller/posts';
import * as themeController from './controller/theme';
import * as contentTypeController from './controller/content_type_config';
import * as templateController from './controller/template';

const start = async () => {

    // Start app
    const appPort = process.env.APP_PORT || 7343;
    const appServer = http.createServer(lucid.app);
    appServer.listen(appPort);

    // Start cms
    const cmsPort = process.env.CMS_PORT || 7344;
    const cmsServer = http.createServer(lucid.cms);
    cmsServer.listen(cmsPort);

    buildProcess();


}


export {
    validate,
    validatorConfig,
    componentController,
    postsController,
    themeController,
    contentTypeController,
    generator,
    templateController,
    start
};