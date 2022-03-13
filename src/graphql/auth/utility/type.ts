
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

export const PingType = new GraphQLObjectType({
    name: 'PingType',
    description: 'The ping type',
    fields: () => ({
        recieved: {
            type: GraphQLBoolean,
            description: 'State'
        }
    })
});