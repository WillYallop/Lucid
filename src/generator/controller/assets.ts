import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themDir = path.resolve(config.directories.theme);

// Handel copying over the assets content to the assets sub domain directory
export default async () => {
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