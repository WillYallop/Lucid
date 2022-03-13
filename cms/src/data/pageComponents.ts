import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// Get single page component
// --------------------------------
export const getSinglePageComponent = async (data: data_pagecomp_getSingleQuery["query"]["page_components"]["get_single"], success: (res: AxiosResponse<data_pagecomp_getSingleQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_pagecomp_getSingleQuery = {
            query: {
                page_components: {
                    get_single: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_pagecomp_getSingleQueryRes>({
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