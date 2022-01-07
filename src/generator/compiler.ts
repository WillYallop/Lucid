import { Liquid, TagToken, Context, Emitter } from 'liquidjs';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid'
})

// Generate component data
const __generateDataField = async (content_types: Array<gen_generateAppInpComponentFieldModel>) => {
    // TODO
    let response: any = {};
    for (const type of content_types) {
        response[type.name] = type.data;
    }
    return response;
}

// Compile page components
const componentCompiler = async (components: Array<gen_generateAppInpComponentModel>): Promise<gene_componentsMap> => {
    try {
        // Create empty component map
        const componentsMap: gene_componentsMap = new Map();
        // Build templates out
        for (const component of components) {
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
        engine.registerTag('lucidScript', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(data.script);
            }
        });

        let dir = path.resolve(`${themeDir}/templates/${data.template}`);
        let markup = await engine.renderFile(dir)

        return markup
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