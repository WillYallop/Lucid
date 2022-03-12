import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";

// --------------------------------
// get single content type config
// --------------------------------
export const getSingleContentTypeConfig = async (data: data_cont_conf_getSingleQueryArgs, success: (res: AxiosResponse<data_cont_conf_getSingleQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_cont_conf_getSingleQuery = {
            query: {
                content_type_config: {
                    get_single: {
                        __args: data,
                        _id: true,
                        name: true,
                        type: true,
                        parent: true,
                        config: {
                            min: true,
                            max: true,
                            default: true
                        }
                    }
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_cont_conf_getSingleQueryRes>({
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
// create single content type config
// --------------------------------
export const createSingleContentTypeConfig = async (data: data_cont_conf_createSingleQueryArgs, success: (res: AxiosResponse<data_cont_conf_createSingleQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_cont_conf_createSingleQuery = {
            mutation: {
                content_type_config: {
                    create_single: {
                        __args: data,
                        _id: true,
                        name: true,
                        type: true,
                        parent: true,
                        config: {
                            max: true,
                            min: true,
                            default: true,
                        }
                    }
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_cont_conf_createSingleQueryRes>({
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
// update single content type config
// --------------------------------
export const updateSingleContentTypeConfig = async (data: data_cont_conf_updateSingleQueryArgs, success: (res: AxiosResponse<data_cont_conf_updateSingleQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_cont_conf_updateSingleQuery = {
            mutation: {
                content_type_config: {
                    update_single: {
                        __args: data,
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
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_cont_conf_updateSingleQueryRes>({
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
// Delete content type config
// --------------------------------
export const deleteContentTypeConfig = async (data: data_cont_conf_deleteQueryArgs, success: (res: AxiosResponse<data_cont_conf_deleteQueryRes, any>) => void, error: any) => {
    try {
        const queryObj: data_cont_conf_deleteQuery = {
            mutation: {
                content_type_config: {
                    delete_single: {
                        __args: data,
                        deleted: true
                    }
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_cont_conf_deleteQueryRes>({
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