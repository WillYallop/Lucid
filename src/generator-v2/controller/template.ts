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
    extname: '.liquid'
});

export default async (config: gen_templateCompilerProps): Promise<string> => {
    try {
        // Register custom tags
        lucidHeadTagRegister(engine, config.head); // lucidHead
        lucidSEOTagRegister(engine, config.seo); // lucidSEO
        lucidAppTagRegister(engine, config.components); // lucidApp
        lucidFooterTagRegister(engine, config.footer); // lucidFooter
        lucidScriptTagRegister(engine); // lucidScript
        lucidAssetTagRegister(engine); // lucidAsset

        // Render page
        const templateDir = path.resolve(`${themeDir}/templates/${config.template}`);
        const markup = await engine.renderFile(templateDir);
        const newMarkup = await islandScriptHandler(markup);

        return newMarkup
    }
    catch(err) {
        throw(err);
    }
}