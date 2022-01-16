
import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

// GraphQL object type
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