import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

const tempGenDir =  path.resolve('./temp/generate');
const distDir = path.resolve(`${config.build}/app`);


// Handles building out the boilerplate app

export default async () => {
    try {
        const noPagesFilePath = path.resolve(__dirname, '../../../templates/no_pages.html');
        const markup = fs.readFileSync(`${noPagesFilePath}`);
        fs.outputFileSync(`${tempGenDir}/index.html`, markup); 
        fs.rmdirSync(distDir, { recursive: true }); // Wipe app dist
        fs.copySync(tempGenDir, distDir); // Copy temp to app dist
        fs.rmdirSync(tempGenDir, { recursive: true }); // Wipe temp directory
    }
    catch(err) {
        throw err;
    }
}