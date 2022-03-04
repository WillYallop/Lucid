import { Liquid } from 'liquidjs';
import islandScriptHandler from './island';
// Custom scripts
import { lucidAssetTagRegister } from './tags/lucidAsset';
import { lucidScriptTagRegister } from './tags/lucidScript';
import { lucidHeadTagRegister } from './tags/lucidHead';
import { lucidSEOTagRegister } from './tags/lucidSEO';
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
        lucidHeadTagRegister(engine, config.head); // lucidHead
        lucidSEOTagRegister(engine, config.seo); // lucidSEO
        lucidAppTagRegister(engine, config.components, addComponents); // lucidApp
        lucidFooterTagRegister(engine, config.footer); // lucidFooter
        lucidScriptTagRegister(engine); // lucidScript
        lucidAssetTagRegister(engine); // lucidAsset

        // Render page
        const templateDir = path.resolve(`${themeDir}/templates/${config.template}`);
        const markup = await engine.renderFile(templateDir);

        // Merge all components script config into array
        let scriptConfigArray: Array<gen_islandScriptConfig> = [];
        for (let [key, value] of config.components) {
            scriptConfigArray = scriptConfigArray.concat(value.scriptConfig);
        }
        // use scriptmarkup to build island script loader
        const newMarkup = await islandScriptHandler(markup, scriptConfigArray);

        return stringify ? JSON.stringify(newMarkup) : newMarkup;
    }
    catch(err) {
        throw(err);
    }
}