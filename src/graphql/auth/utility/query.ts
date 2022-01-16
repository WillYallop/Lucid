import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { PingType } from './type';

// Ping
const ping: GraphQLFieldConfig<any, any, any> = {
    type: PingType,
    description: 'Ping',
    resolve: () => {
        return {
            recieved: true
        }
    }
}

export const UtilityQuery = new GraphQLObjectType({
    name: 'UtilityQuery',
    description: 'The utility base query',
    fields: {
        ping: ping
    }
})