import * as fs from 'fs-extra';
import { createBuildDir } from '../../functions/build_process'; 

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themDir = path.resolve(config.directories.theme);

// Handel copying over the assets content to the assets sub domain directory
export default async () => {
    try {
        createBuildDir();
        if(fs.existsSync(`${config.build}/assets`)) {
            await fs.copy(`${themDir}/assets`, `${config.build}/assets`); 
        }
        return true
    }
    catch(err) {
        throw err;
    }
}