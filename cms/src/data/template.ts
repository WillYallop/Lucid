import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';

// --------------------------------
// Get multiple pages
// --------------------------------
export const getTemplates = async (data: data_template_getAllQuery["query"]["template"]["get_all"], success: (res: AxiosResponse<data_template_getAllQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_template_getAllQuery = {
            query: {
                template: {
                    get_all: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}