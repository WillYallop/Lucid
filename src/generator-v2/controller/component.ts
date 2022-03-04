import { Liquid } from 'liquidjs';
// Custom scripts
import { lucidAssetTagRegister } from './tags/lucidAsset';
import { lucidScriptTagRegister } from './tags/lucidScript';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid'
});


const __generateComponentDataObj = async (data: gen_componentCompilerProps) => {
    try {
        
        return {}
    }
    catch(err) {
        throw err;
    }
}


export default async (config: Array<gen_componentCompilerProps>) => {
    try {
        // Create empty component map
        const componentsMap: gen_componentCompiledMap = new Map();
        // Build templates out
        for (const data of config) {
            // register tags - TODO - this may be able to be moved up out of the loop!
            lucidScriptTagRegister(engine); // lucidScript
            lucidAssetTagRegister(engine); // lucidAsset
            const componentData = await __generateComponentDataObj(data); // TODO
            const componentDir = path.resolve(`${themeDir}/components/${data.component.file_path}`);
            const markup = await engine.renderFile(componentDir, componentData);
            componentsMap.set(data.component.name, {
                _id: data.component._id,
                markup: markup
            });
        }
        return componentsMap;
    }
    catch(err) {
        throw(err);
    }
}