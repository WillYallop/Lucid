import * as fs from 'fs-extra';
import { createBuildDir } from '../../functions/build_process'; 

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const tempGenDir =  path.resolve('./temp/generate');
const distDir = path.resolve(`${config.build}/app`);

// Handles writing the page data to the app dist
export default async (pages: gen_builtPagesMap): Promise<boolean> => {
    try {
        createBuildDir();
        try {
            // Save new site to a temp directory
            for (const [key, value] of pages.entries()) {
                fs.outputFileSync(`${tempGenDir}${value.slug}/index.html`, value.markup); 
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
    catch(err) {
        throw(err);
    }
}