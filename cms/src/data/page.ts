import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// Save single page
// --------------------------------
export const saveSinglePage = async (data: data_page_saveSingleQuery["query"]["page"]["save_single"], success: (res: AxiosResponse<data_page_saveSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_saveSingleQuery = {
            query: {
                page: {
                    save_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_saveSingleQueryRes>({
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
// Get multiple pages
// --------------------------------
export const getMultiplePages = async (data: data_page_getMultipleQuery["query"]["page"]["get_multiple"], success: (res: AxiosResponse<data_page_getMultipleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_getMultipleQuery = {
            query: {
                page: {
                    get_multiple: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_getMultipleQueryRes>({
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
// Get single page
// --------------------------------
export const getSinglePage = async (data: data_page_getSingleQuery["query"]["page"]["get_single"], success: (res: AxiosResponse<data_page_getSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_getSingleQuery = {
            query: {
                page: {
                    get_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_getSingleQueryRes>({
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
// Get single page by post id
// --------------------------------
export const getSinglePageByPostID = async (data: data_page_getSingleByPostIDQuery["query"]["page"]["get_single_by_post_id"], success: (res: AxiosResponse<data_page_getSingleByPostIDQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_getSingleByPostIDQuery = {
            query: {
                page: {
                    get_single_by_post_id: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_getSingleByPostIDQueryRes>({
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
// Delete single pages
// --------------------------------
export const deleteSinglePage = async (data: data_page_deleteSingleQuery["query"]["page"]["delete_single"], success: (res: AxiosResponse<data_page_deleteSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_deleteSingleQuery = {
            query: {
                page: {
                    delete_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_deleteSingleQueryRes>({
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
// Search page by name
// --------------------------------
export const searchPageName = async (data: data_page_searchNameQuery["query"]["page"]["search_name"], success: (res: AxiosResponse<data_page_searchNameQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_searchNameQuery = {
            query: {
                page: {
                    search_name: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_page_searchNameQueryRes>({
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