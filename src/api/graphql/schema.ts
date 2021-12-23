import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import { componentQuery } from './component/query';
import { componentMutation } from './component/mutation';

const BaseQuery = new GraphQLObjectType({
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

const BaseMutation = new GraphQLObjectType({
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
    query: BaseQuery,
    mutation: BaseMutation
});