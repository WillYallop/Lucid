import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';

// --------------------------------
// generate site
// --------------------------------
export const generateSite = async (data: data_generator_generateSiteQuery["query"]["generator"]["site"], success: (res: AxiosResponse<data_generator_generateSiteQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_generator_generateSiteQuery = {
            query: {
                generator: {
                    site: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}


// --------------------------------
// generate preview
// --------------------------------
export const generatePreview = async (data: data_generator_generatePreviewQuery["query"]["generator"]["preview"], success: (res: AxiosResponse<data_generator_generatePreviewQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_generator_generatePreviewQuery = {
            query: {
                generator: {
                    preview: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}