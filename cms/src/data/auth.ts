import { AxiosResponse } from 'axios';
import { queryFunction } from './index';

// --------------------------------
// Sign in
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

// --------------------------------
// Sign in and update
// --------------------------------
export const signInAndUpdate = async (data: data_auth_signInAndUpdateQuery["mutation"]["authentication"]["sign_in_update"], success: (res: AxiosResponse<data_auth_signInAndUpdateQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_auth_signInAndUpdateQuery = {
            mutation: {
                authentication: {
                    sign_in_update: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}