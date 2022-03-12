import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


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