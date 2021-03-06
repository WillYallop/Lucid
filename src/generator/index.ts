import db from '../db';
// Generator controllers
import componentCompiler from './controller/component';
import templateCompiler from './controller/template';
import buildBoilerplate from './controller/boilerplate';
import staticHandler from './controller/static';
import assetsHandler from './controller/assets';
import savePageHandler from './controller/save';
import sitemapHandler from './controller/sitemap';
// Data
import { getSingle as getSinglePage } from '../graphql/page/data';
import { getAll as getAllContentTypes } from '../controller/content_type_config';
// Helpers
import { __generateErrorString } from "../functions/shared";

// Generate site preview template and components
const generatePreview = async (config: gen_generatePreviewConfig) => {
    try {
        // Get live page data
        const pageLiveData: mod_pageModel = await getSinglePage(false, config.page_id);

        // Response object
        const markupRes: {
            template: string,
            components: gen_componentCompiledMap
        } = {
            template: '',
            components: new Map()
        }

        const componentData: Array<gen_componentCompilerProps> = [];
        // Build out the component data array
        for await(const pageComp of config.page_components) {
            // Find corresponding page
            const findPageComp = pageLiveData.page_components.find( x => x._id === pageComp._id );

            // Set groups and data variables
            let groups: Array<mod_contentTypeFieldGroupModel> = [];
            let data: Array<mod_contentTypesDatabaseModel> = [];
            let contentTypes: Array<mod_contentTypesConfigModel> = [];

            if('provided' === config.data_mode) { 
                groups = pageComp.groups !== undefined ? pageComp.groups : [];
                data = pageComp.data !== undefined ? pageComp.data : [];
                contentTypes = await getAllContentTypes(pageComp.component._id);
            }
            else if('live' === config.data_mode) {
                groups = findPageComp !== undefined ? findPageComp.groups : [];
                data = findPageComp !== undefined ? findPageComp.data : [];
                contentTypes = findPageComp !== undefined ? findPageComp.content_types : [];
            }

            // Add to components data array
            componentData.push({
                component: {
                    _id: pageComp.component._id,
                    page_component_id: pageComp._id,
                    file_path: pageComp.component.file_path,
                    name: pageComp.component.name
                },
                mode: 'preview',
                relative_path: config.location,
                groups: groups,
                data: data,
                content_types: contentTypes
            })
        }

        // Build components
        markupRes.components = await componentCompiler(componentData, true);
        // Build template
        markupRes.template = await templateCompiler({
            mode: 'preview',
            relative_path: config.location,
            template: config.data_mode === 'live' ? pageLiveData.template : config.template ? config.template : pageLiveData.template,
            components: markupRes.components,
            seo: pageLiveData.seo,
            head: '',
            footer: ''
        }, false, true);

        if(config.data_mode === 'live') await assetsHandler();

        return {
            template: markupRes.template,
            components: Array.from(markupRes.components.values())
        };
    }
    catch(err) {
        throw(err);
    }
}

// Generate entire site
const generateSite = async () => {
    try {
        // Start timer
        const start = Date.now();
        // Data map
        const builtPages: gen_builtPagesMap = new Map();


        // Get all page data
        const pageIDs: Array<{_id:mod_pageModel["_id"]}> = await db.manyOrNone('SELECT _id FROM pages');

        // If we have pages, build them out, else build out a boilerplate app
        if(pageIDs.length) {

            // For each page, build out its data and generate its page
            for await(const { _id } of pageIDs) {
                // page components
                const pageData: mod_pageModel = await getSinglePage(false, _id);
    
                // Build out the component data array
                const componentData: Array<gen_componentCompilerProps> = [];
                pageData.page_components.forEach((pageComp) => {
                    if(pageComp.component != undefined) {
                        componentData.push({
                            component: {
                                _id: pageComp.component._id,
                                page_component_id: pageComp._id,
                                file_path: pageComp.component.file_path,
                                name: pageComp.component.name
                            },
                            mode: 'site',
                            relative_path: pageData.path,
                            groups: pageComp.groups,
                            data: pageComp.data,
                            content_types: pageComp.content_types
                        });
                    }
                });
    
                // Build components
                const components = await componentCompiler(componentData, false);
                // Build template
                const template = await templateCompiler({
                    mode: 'site',
                    relative_path: pageData.path,
                    template: pageData.template,
                    components: components,
                    seo: pageData.seo,
                    head: '',
                    footer: ''
                }, true, false);

                builtPages.set(pageData._id, {
                    slug: pageData.path,
                    markup: template
                });
            }

            // Save pages and create a sitemap!
            await savePageHandler(builtPages);
            await sitemapHandler(builtPages);

        } else await buildBoilerplate();


        // Copy static files over
        await staticHandler();
        await assetsHandler();

        // Stop Timer
        const stop = Date.now();

        return {
            build_time: (stop - start)/1000,
            pages_built: builtPages.size
        }
    }
    catch(err) {
        throw(err);
    }
}

// Generator Handler
export default async (mode: 'site' | 'preview', data?: gen_generatePreviewConfig) => {
    try {
        if('site' === mode) {
            const response = await generateSite();
            return response;
        }
        else if('preview' === mode) {
            if(data != undefined) {
                const response = await generatePreview(data);
                return response;
            }
            else {
                throw __generateErrorString({
                    code: 400,
                    origin: 'generatorHandler',
                    message: `"data" paramater for mode "preview" is undefined!`
                }); 
            }
        }
        else {
            throw __generateErrorString({
                code: 400,
                origin: 'generatorHandler',
                message: `"mode" paramater must be either "site" or "preview"!`
            });
        }
    }
    catch(err) {
        throw(err);
    }
}