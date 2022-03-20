import * as fs from 'fs-extra';
import clc from 'cli-color';
import ip from 'ip';
import { QueryFile } from 'pg-promise';
import db from '../db';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const distDir = path.resolve(config.build);

// Create app build dist
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

// Build Database
const builtDatabase = () => {
    try {   
        // if we have a database connection
        // check to see if the database needs building
        db.connect()
        .then(async (obj: any) => {
            // Check to see if the database has been built already.
            const { exists } = await db.oneOrNone("SELECT EXISTS ( SELECT FROM pg_tables WHERE schemaname='public' AND tablename='config' )");
            if(!exists) {
                const dbQueryFilePath = path.resolve(__dirname, '../../database.sql');
                const dbQueryFile = new QueryFile(dbQueryFilePath, {minify: true});
                db.none(dbQueryFile);
                console.log((clc.green('Initialised the database!')));
            }
        })
        .catch((error: any) => {
            console.log((clc.red(error.message)));
        });
    }
    catch(err) {
        throw err;
    }
}

// Log the welcome message and the cms and app ips
const logWelcomeMessage = () => {
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

export default async () => {
    try {
        builtDatabase();
        if(process.env.NODE_ENV === 'development') {
            logWelcomeMessage();
        }
        if(process.env.NODE_ENV === 'production') {
            createBuildDir();
        }
    }
    catch(err) {
        throw err;
    }
}