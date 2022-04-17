import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';


// --------------------------------
// Save single post
// --------------------------------
export const saveSinglePost = async (data: data_post_saveSingleQuery["query"]["post"]["save_single"], success: (res: AxiosResponse<data_post_saveSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_post_saveSingleQuery = {
            query: {
                post: {
                    save_single: data
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
// Update single post
// --------------------------------
export const updateSinglePost = async (data: data_post_updateSingleQuery["query"]["post"]["update_single"], success: (res: AxiosResponse<data_post_updateSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_post_updateSingleQuery = {
            query: {
                post: {
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
// Get multiple posts
// --------------------------------
export const getMultiplePosts = async (data: data_post_getMultipleQuery["query"]["post"]["get_multiple"], success: (res: AxiosResponse<data_post_getMultipleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_post_getMultipleQuery = {
            query: {
                post: {
                    get_multiple: data
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
// Get single by name
// --------------------------------
export const getSinglePostViaName = async (data: data_post_getSingleViaNameQuery["query"]["post"]["get_single_by_name"], success: (res: AxiosResponse<data_post_getSingleViaNameQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_post_getSingleViaNameQuery = {
            query: {
                post: {
                    get_single_by_name: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}