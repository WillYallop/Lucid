import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
import { __generateErrorString } from '../helper/shared';

const themDir = path.resolve(config.directories.theme);
const templatesDir = path.resolve(config.directories.templates);
const tempGenDir =  path.resolve(config.directories.temp + '/generate');
const distDir = path.resolve(config.directories.dist);
const assetDir = path.resolve(config.directories.assets_dist);

// ------------------------------------ ------------------------------------
//  Handles building the default boiler app
// ------------------------------------ ------------------------------------
const buildDefaultApp = async () => {
    try {
        let markup = fs.readFileSync(`${templatesDir}/get-started.html`);
        fs.outputFileSync(`${tempGenDir}/index.html`, markup); 
        fs.rmdirSync(distDir, { recursive: true }); // Wipe app dist
        fs.copySync(tempGenDir, distDir); // Copy temp to app dist
        fs.rmdirSync(tempGenDir, { recursive: true }); // Wipe temp directory
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
//  Handles copying over the static theme directory to the dist
// ------------------------------------ ------------------------------------
const copyStatic = async () => {
    try {
        if(fs.existsSync(`${themDir}/static`)) {
            await fs.copy(`${themDir}/static`, config.directories.dist); // Copy temp to app dist
        }
        return true
    }
    catch(err) {
        throw err;
    }
}

const copyAssets = async () => {
    try {
        if(fs.existsSync(`${themDir}/assets`)) {
            await fs.copy(`${themDir}/assets`, config.directories.assets_dist); 
        }
        return true
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
//  Handles creating the sitemap
// ------------------------------------ ------------------------------------
const createSitemap = async (pages: gene_pagseMap) => {
    try {
        console.log('Build Sitemap!');
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
//  Handles saving pages map to the designated dist directory
// ------------------------------------ ------------------------------------
const savePages = async (pages: gene_pagseMap): Promise<boolean> => {
    try {
        // Save new site to a temp directory
        for (const [key, value] of pages.entries()) {
            fs.outputFileSync(`${tempGenDir}${value.slug}/index.html`, value.markup); 
            console.log(`Page "/${value.slug}" has been created!`);
        }
        fs.rmdirSync(distDir, { recursive: true }); // Wipe app dist
        fs.copySync(tempGenDir, distDir); // Copy temp to app dist
        fs.rmdirSync(tempGenDir, { recursive: true }); // Wipe temp directory
        return true
    }
    catch(err) {
        fs.rmdirSync(tempGenDir, { recursive: true }); // Wipe temp directory
        throw err;
    }
}

export {
    buildDefaultApp,
    copyStatic,
    copyAssets,
    createSitemap,
    savePages
}