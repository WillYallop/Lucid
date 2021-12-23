import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import { componentQuery } from './component/query';
import { componentMutation } from './component/mutation';

const baseQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        components: {
            type: componentQuery,
            description: componentQuery.description,
            resolve: () => { return {} }
        }
    }
});

const baseMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The base mutation',
    fields: {
        components: {
            type: componentMutation,
            description: componentMutation.description,
            resolve: () => { return {} }
        }
    }
});


export const schema = new GraphQLSchema({
    query: baseQuery,
    mutation: baseMutation
});