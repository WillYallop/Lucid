import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';



// --------------------------------
// get single content type config
// --------------------------------
export const getSingleContentTypeConfig = async (data: data_cont_conf_getSingleQuery["query"]["content_type_config"]["get_single"], success: (res: AxiosResponse<data_cont_conf_getSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_cont_conf_getSingleQuery = {
            query: {
                content_type_config: {
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


// --------------------------------
// create single content type config
// --------------------------------
export const createSingleContentTypeConfig = async (data: data_cont_conf_createSingleQuery["mutation"]["content_type_config"]["create_single"], success: (res: AxiosResponse<data_cont_conf_createSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_cont_conf_createSingleQuery = {
            mutation: {
                content_type_config: {
                    create_single: data 
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
// update single content type config
// --------------------------------
export const updateSingleContentTypeConfig = async (data: data_cont_conf_updateSingleQuery["mutation"]["content_type_config"]["update_single"], success: (res: AxiosResponse<data_cont_conf_updateSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_cont_conf_updateSingleQuery = {
            mutation: {
                content_type_config: {
                    update_single: data
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
// Delete content type config
// --------------------------------
export const deleteContentTypeConfig = async (data: data_cont_conf_deleteQuery["mutation"]["content_type_config"]["delete_single"], success: (res: AxiosResponse<data_cont_conf_deleteQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_cont_conf_deleteQuery = {
            mutation: {
                content_type_config: {
                    delete_single: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}