/// <reference path="../types/index.d.ts" />

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
    console.log(`${ip.address()}:${port}`);
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