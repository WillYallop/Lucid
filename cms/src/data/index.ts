import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
// Functions
import getApiUrl from "../functions/getApiUrl";


export const queryFunction = (queryObj: any, success: (result: any) => void, error: (err: any) => void) => {
    const query = jsonToGraphQLQuery(queryObj, { pretty: true });
    axios.request<data_auth_signInQueryRes>({
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