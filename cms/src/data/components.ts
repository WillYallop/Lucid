import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// Get single component
// --------------------------------
export const getSingleComponent = async (data: data_comp_getSingeleComponentQueryArgs, success: (res: AxiosResponse<data_comp_getSingleComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_getSingeleComponentQuery = {
            query: {
                components: {
                    get_single: {
                        __args: data,
                        _id: true,
                        name: true,
                        file_name: true,
                        file_path: true,
                        description: true,
                        preview_url: true,
                        date_added: true,
                        date_modified: true,
                        content_types: {
                            _id: true,
                            name: true,
                            type: true,
                            parent: true,
                            config: {
                                max: true,
                                min: true,
                                default: true
                            }
                        }
                    }
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
// Update single
// --------------------------------
export const updateSingleComponent = async (data: data_comp_updateComponentQueryArgs, success:(res: AxiosResponse<data_comp_updateComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_updateComponentQuery = {
            mutation: {
                components: {
                    update_single: {
                        __args: data,
                        _id: true,
                        name: true,
                        description: true
                    }
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
export const degrigisterComponent = async (data: data_comp_deregisterComponentQueryArgs, success: (res: AxiosResponse<data_comp_deregisterComponentQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_comp_deregisterComponentQuery = {
            mutation: {
                components: {
                    delete_single: {
                        __args: data,
                        deleted: true
                    }
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