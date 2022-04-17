import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';


// --------------------------------
// Get single page component
// --------------------------------
export const getSinglePageComponent = (data: data_pagecomp_getSingleQuery["query"]["page_components"]["get_single"], success: (res: AxiosResponse<data_pagecomp_getSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_pagecomp_getSingleQuery = {
            query: {
                page_components: {
                    get_single: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}