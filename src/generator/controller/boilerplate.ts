import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

const templatesDir = path.resolve(config.directories.templates);
const tempGenDir =  path.resolve('./temp/generate');
const distDir = path.resolve(`${config.build}/app`);


// Handles building out the boilerplate app

export default async () => {
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