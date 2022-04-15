import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';

// --------------------------------
// Ping API
// --------------------------------
export const utilityPing = async (data: data_utility_pingQuery["query"]["utility"]["ping"], success: (res: AxiosResponse<data_utility_pingQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_utility_pingQuery = {
            query: {
                utility: {
                    ping: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}
