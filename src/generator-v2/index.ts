// Generator controllers
import componentCompiler from './controller/component';
import templateCompiler from './controller/template';
import staticHandler from './controller/static';
import assetsHandler from './controller/assets';

// Data
import { getSingle as getSinglePage } from '../graphql/auth/page/data';
// Helpers
import { __generateErrorString } from "../helper/shared";


// Generate site preview template and components
const generatePreview = async (config: gen_generatePreviewConfig) => {
    try {
        // Get live page data
        const pageLiveData: mod_pageModel = await getSinglePage(config.page_id);

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
        config.page_components.forEach((pageComp) => {
            // Find corresponding page
            const findPageComp = pageLiveData.page_components.find( x => x._id === pageComp._id );

            // Set groups and data variables
            let groups: Array<mod_contentTypeFieldGroupModel> = [];
            let data: Array<mod_contentTypesDatabaseModel> = [];
            let contentTypes: Array<mod_contentTypesConfigModel> = [];
            if('provided' === config.data_mode) { // uses live data as a fallback
                groups = pageComp.groups !== undefined ? pageComp.groups : findPageComp !== undefined ? findPageComp.groups : [];;
                data = pageComp.data !== undefined ? pageComp.data : findPageComp !== undefined ? findPageComp.data : [];;
            }
            else if('live' === config.data_mode) {
                groups = findPageComp !== undefined ? findPageComp.groups : [];
                data = findPageComp !== undefined ? findPageComp.data : [];
            }
            contentTypes = findPageComp !== undefined ? findPageComp.content_types : [];

            // Add to components data array
            componentData.push({
                component: {
                    _id: pageComp.component._id,
                    page_component_id: pageComp._id,
                    file_path: pageComp.component.file_path,
                    name: pageComp.component.name
                },
                groups: groups,
                data: data,
                content_types: contentTypes
            })
        });

        // Build components
        markupRes.components = await componentCompiler(componentData, true);
        // Build template
        markupRes.template = await templateCompiler({
            template: config.data_mode === 'live' ? pageLiveData.template : config.template ? config.template : pageLiveData.template,
            components: markupRes.components,
            seo: pageLiveData.seo,
            head: '',
            footer: ''
        }, false, true);

        await assetsHandler();

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