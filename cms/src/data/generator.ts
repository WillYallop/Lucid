import axios, { AxiosResponse } from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


// --------------------------------
// generate site
// --------------------------------
export const generateSite = async (data: data_generator_generateSiteQuery["query"]["generator"]["site"], success: (res: AxiosResponse<data_generator_generateSiteQueryRes, any>) => void, error: (err: any) => void) => {
    try {
        const queryObj: data_generator_generateSiteQuery = {
            query: {
                generator: {
                    site: data
                }
            }
        }
        const query = jsonToGraphQLQuery(queryObj, { pretty: true });
        axios.request<data_generator_generateSiteQueryRes>({
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