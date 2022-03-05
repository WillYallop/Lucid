import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themDir = path.resolve(config.directories.theme);

// Handel copying over the static directory to the di

export default async () => {
    try {
        if(fs.existsSync(`${themDir}/static`)) {
            await fs.copy(`${themDir}/static`, config.directories.dist);
        }
        return true
    }
    catch(err) {
        throw(err);
    }
}