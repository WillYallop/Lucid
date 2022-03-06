import { Liquid } from 'liquidjs';
import islandScriptHandler, { stripTempIslandObjEle } from './island';
// Custom scripts
import { lucidAssetTagRegister } from './tags/lucidAsset';
import { lucidScriptTagRegister } from './tags/lucidScript';
import { lucidHeadTagRegister } from './tags/lucidHead';
import { lucidAppTagRegister } from './tags/lucidApp';
import { lucidFooterTagRegister } from './tags/lucidFooter';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid',
    strictVariables: false,
    strictFilters: false
});

export default async (config: gen_templateCompilerProps, addComponents: boolean, stringify: boolean): Promise<string> => {
    try {
        // Register custom tags
        lucidHeadTagRegister(engine, config.head, config.seo); // lucidHead
        lucidAppTagRegister(engine, config.components, addComponents); // lucidApp
        lucidFooterTagRegister(engine, config.footer); // lucidFooter
        lucidScriptTagRegister(engine); // lucidScript
        lucidAssetTagRegister(engine); // lucidAsset

        // Render page
        const templateDir = path.resolve(`${themeDir}/templates/${config.template}`);
        const markup = await engine.renderFile(templateDir);

        // Check if it has islandScriptObj, strip it out
        const islandRes = await stripTempIslandObjEle(markup);
        // Merge all components script config into array
        let scriptConfigArray: Array<gen_islandScriptConfig> = islandRes.scriptConfig;
        for (let [key, value] of config.components) {
            scriptConfigArray = scriptConfigArray.concat(value.scriptConfig);
        }
        // use scriptmarkup to build island script loader
        const newMarkup = await islandScriptHandler(islandRes.markup, scriptConfigArray);

        return stringify ? JSON.stringify(newMarkup) : newMarkup;
    }
    catch(err) {
        throw(err);
    }
}