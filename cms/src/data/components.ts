import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// Get single component
// --------------------------------
export const getSingleComponent = async (data: data_comp_getSingleComponentQuery["query"]["components"]["get_single"], success: (res: AxiosResponse<data_comp_getSingleComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_getSingleComponentQuery = {
            query: {
                components: {
                    get_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_getSingleComponentQueryRes>({
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
// Get multiple components
// --------------------------------
export const getMultipleComponents = async (data: data_comp_getMultipleComponentQuery["query"]["components"]["get_multiple"], success: (res: AxiosResponse<data_comp_getMultipleComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_getMultipleComponentQuery = {
            query: {
                components: {
                    get_multiple: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_getMultipleComponentQueryRes>({
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
// Save single component
// --------------------------------
export const saveSingleComponent = async (data: data_comp_saveSingleComponentQuery["mutation"]["components"]["save_single"], success: (res: AxiosResponse<data_comp_saveSingleComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_saveSingleComponentQuery = {
            mutation: {
                components: {
                    save_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_saveSingleComponentQueryRes>({
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
// Update single
// --------------------------------
export const updateSingleComponent = async (data: data_comp_updateComponentQuery["mutation"]["components"]["update_single"], success:(res: AxiosResponse<data_comp_updateComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_updateComponentQuery = {
            mutation: {
                components: {
                    update_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_updateComponentQueryRes>({
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
// Deregister component
// --------------------------------
export const degrigisterComponent = async (data: data_comp_deregisterComponentQuery["mutation"]["components"]["delete_single"], success: (res: AxiosResponse<data_comp_deregisterComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_deregisterComponentQuery = {
            mutation: {
                components: {
                    delete_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_deregisterComponentQueryRes>({
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
// Get unregistered components
// --------------------------------
export const getUnregisteredComponents = async (data: data_comp_ungregisteredComponentQuery["query"]["components"]["get_unregistered"], success:(res: AxiosResponse<data_comp_ungregisteredComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_ungregisteredComponentQuery = {
            query: {
                components: {
                    get_unregistered: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_comp_ungregisteredComponentQueryRes>({
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