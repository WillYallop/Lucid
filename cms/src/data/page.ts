import axios, { AxiosResponse } from 'axios';
import { queryFunction } from './index';


// --------------------------------
// Save single page
// --------------------------------
export const saveSinglePage = async (data: data_page_saveSingleQuery["mutation"]["page"]["save_single"], success: (res: AxiosResponse<data_page_saveSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_saveSingleQuery = {
            mutation: {
                page: {
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
        queryFunction(queryObj, success, error);
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
        queryFunction(queryObj, success, error);
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
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}

// --------------------------------
// Delete single pages
// --------------------------------
export const deleteSinglePage = async (data: data_page_deleteSingleQuery["mutation"]["page"]["delete_single"], success: (res: AxiosResponse<data_page_deleteSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_deleteSingleQuery = {
            mutation: {
                page: {
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
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}

// --------------------------------
// Get page live url
// --------------------------------
export const getPageLiveURL = async (data: data_page_getLiveURLQuery["query"]["page"]["get_live_url"], success: (res: AxiosResponse<data_page_getLiveURLQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_page_getLiveURLQuery = {
            query: {
                page: {
                    get_live_url: data
                }
            }
        }
        queryFunction(queryObj, success, error);
    }
    catch(err) {
        throw err;
    }
}