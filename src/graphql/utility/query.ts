import { GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { PingType } from './type';
import { __generateErrorString } from '../../functions/shared';

// Ping
const ping: GraphQLFieldConfig<any, any, any> = {
    type: PingType,
    description: 'Ping',
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return {
                recieved: true
            }
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'ping'
        })
    }
}

export const UtilityQuery = new GraphQLObjectType({
    name: 'UtilityQuery',
    description: 'The utility base query',
    fields: {
        ping: ping
    }
})