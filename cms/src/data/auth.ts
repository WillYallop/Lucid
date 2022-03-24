import { AxiosResponse } from 'axios';
import { queryFunction } from './index';

// --------------------------------
// Get single component
// --------------------------------
export const signIn = async (data: data_auth_signInQuery["query"]["authentication"]["sign_in"], success: (res: AxiosResponse<data_auth_signInQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_auth_signInQuery = {
            query: {
                authentication: {
                    sign_in: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}