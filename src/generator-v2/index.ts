// Generator controllers
import componentCompiler from './controller/component';
import templateCompiler from './controller/template';
import staticHandler from './controller/static';
// Helpers
import { __generateErrorString } from "../helper/shared";


// Generate site preview template and components
const generatePreview = async (config: gen_generatePreviewConfig) => {
    try {



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