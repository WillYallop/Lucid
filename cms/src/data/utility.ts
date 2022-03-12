import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// Ping API
// --------------------------------
export const utilityPing = async (data: data_utility_pingQuery["query"]["utility"]["ping"], success: (res: AxiosResponse<data_utility_pingQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_utility_pingQuery = {
            query: {
                utility: {
                    ping: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_utility_pingQueryRes>({
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