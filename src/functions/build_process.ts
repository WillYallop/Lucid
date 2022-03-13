import * as fs from 'fs-extra';
import clc from 'cli-color';
import ip from 'ip';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const distDir = path.resolve(config.build);

export const createBuildDir = () => {
    try {
        const buildDir = path.resolve(distDir);
        const appDir = path.resolve(`${distDir}/app`);
        const assetDir = path.resolve(`${distDir}/assets`);
        if(!fs.existsSync(buildDir)) { fs.mkdirSync(buildDir); }
        if(!fs.existsSync(appDir)) { fs.mkdirSync(appDir); }
        if(!fs.existsSync(assetDir)) { fs.mkdirSync(assetDir); }
    }
    catch(err) {
        throw err;
    }
}

export default async () => {
    try {
        if(process.env.NODE_ENV === 'development') {
            console.log((clc.yellow('-------------------------------------------------------------------------------------')));
            console.log();
            console.log(clc.yellow(clc.bold("Welcome to Lucid!")));
            console.log();
            console.log(clc.yellow("First time? Read our set up guide @ https://lucidcms.com/getting-started"));
            console.log(clc.yellow("Documentation? Dive in @ https://lucidcms.com/documentation"));
            console.log();
            process.stdout.write(clc.yellow(clc.columns([
                [clc.bold("URL"), clc.bold("PORT"), clc.bold("SERVICE")],
                [`http://${ip.address()}:${process.env.APP_PORT || 7343}`, `${process.env.APP_PORT || 7343}`, 'app'],
                [`http://${ip.address()}:${process.env.CMS_PORT || 7344}`, `${process.env.CMS_PORT || 7344}`, 'cms']
              ]))
            );
            console.log();
            console.log((clc.yellow('-------------------------------------------------------------------------------------')));
        }
        if(process.env.NODE_ENV === 'production') {
            createBuildDir();
        }
    }
    catch(err) {
        throw err;
    }
}