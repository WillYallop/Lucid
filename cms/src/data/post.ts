import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


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
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_post_saveSingleQueryRes>({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            success(result);
        })
        .catch((err) => {
            error(err);
        })
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
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_post_updateSingleQueryRes>({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            success(result);
        })
        .catch((err) => {
            error(err);
        })
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
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_post_getMultipleQueryRes>({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            success(result);
        })
        .catch((err) => {
            error(err);
        })
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
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_post_getSingleViaNameQueryRes>({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        })
        .then((result) => {
            success(result);
        })
        .catch((err) => {
            error(err);
        })
    }
    catch(err) {
        throw err;
    }
}