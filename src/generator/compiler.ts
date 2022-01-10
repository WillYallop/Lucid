import { Liquid, TagToken, Context, Emitter, TopLevelToken } from 'liquidjs';
import islandScriptHandler from './island_script';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;
const domain = config.domain;
const hasHttps = config.https;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid'
});


// Generate component data
const __generateDataField = async (content_types: Array<gen_generateAppInpComponentFieldModel>) => {
    // TODO
    let response: any = {};
    for (const type of content_types) {
        response[type.name] = type.data;
    }
    return response;
}



// lucidScript custom tag
const lucidScriptTagRegister = () => {
    return engine.registerTag('lucidScript', {
        parse: function(tagToken: TagToken, remainTokens: TopLevelToken[]) {
            let assetConfig: {
                src: string
                load: 'onload' | 'visible'
                visibleID?: string
                async: boolean
                defer: boolean
            } = JSON.parse(tagToken.args);
            this.assetSrc = `${hasHttps?'https://':'http://'}assets.${domain}${assetConfig.src}`;
            this.load = assetConfig.load;
            this.visibleID = assetConfig.visibleID;
            this.async = assetConfig.async;
            this.defer = assetConfig.defer;
        },
        render: async function(ctx: Context, emitter: Emitter) {
            // If the user wants the script to be on load
            if(this.load === 'onload') {
                emitter.write(`<script src="${this.assetSrc}" ${this.async === true?'async':''} ${this.defer === true?'defer':''}></script>`);
            }
            else if(this.load === 'visible') {
                emitter.write(`<lucidTempIslandObj>
                    {
                        "src": "${this.assetSrc}",
                        "id": "${this.visibleID}"
                    }
                </lucidTempIslandObj>`);
            }
        }
    });
}



// Compile page components
const componentCompiler = async (components: Array<gen_generateAppInpComponentModel>, slug?: mod_pageModel["slug"]): Promise<gene_componentsMap> => {
    try {
        // Create empty component map
        const componentsMap: gene_componentsMap = new Map();
        // Build templates out
        for (const component of components) {

            // Register script tag
            lucidScriptTagRegister();

            const data = await __generateDataField(component.content_types); // TODO
            const dir = path.resolve(`${themeDir}/components/${component.file_path}`);
            const output = await engine.renderFile(dir, data);
            componentsMap.set(component.name, {
                _id: component._id,
                markup: output
            });
        }
        return componentsMap;
    }
    catch (err) {
        throw {
            code: 500,
            origin: 'componentCompiller',
            title: 'Compiling Error',
            message: `Error while compiling page components!`
        };
    }
}

// Compile page
const pageCompiler = async (data: gene_compilePage): Promise<string> => {
    try {

        // Register custom tags
        engine.registerTag('lucidHead', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(data.head);
            }
        });
        engine.registerTag('lucidSeo', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(`<title>${data.seo.title}</title>
                <meta name="description" content="${data.seo.description}">`);
            }
        });
        engine.registerTag('lucidApp', {
            render: async function (context: Context, emitter: Emitter) {
                let componentsString: string = '';
                for (const [key, value] of data.components.entries()) {
                    emitter.write(value.markup);
                }
            }
        });
        engine.registerTag('lucidFooter', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(data.footer);
            }
        });
        // Register script tag
        lucidScriptTagRegister();

        // Render page
        let dir = path.resolve(`${themeDir}/templates/${data.template}`);
        let markup = await engine.renderFile(dir)

        let newMarkup = await islandScriptHandler(markup);

        return newMarkup
    }
    catch (err) {
        throw {
            code: 500,
            origin: 'pageCompiler',
            title: 'Compiling Error',
            message: `Error while compiling page!`
        };
    }
}

export {
    componentCompiler,
    pageCompiler
}