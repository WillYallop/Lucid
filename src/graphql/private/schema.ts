import {GraphQLObjectType, GraphQLSchema} from 'graphql';

// Components
import { componentQuery } from './component/query';
import { componentMutation } from './component/mutation';
// Post Types
import { postQuery } from './posts/query';
import { postMutation } from './posts/mutation';


const baseQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        components: {
            type: componentQuery,
            description: componentQuery.description,
            resolve: () => { return {} }
        },
        post: {
            type: postQuery,
            description: postQuery.description,
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
        },
        post: {
            type: postMutation, 
            description: postMutation.description,
            resolve: () => { return {} }
        }
    }
});


export const privateSchema = new GraphQLSchema({
    query: baseQuery,
    mutation: baseMutation
});