import {GraphQLObjectType, GraphQLSchema} from 'graphql';

// Components
import { componentQuery } from './component/query';
import { componentMutation } from './component/mutation';
// Post Types
import { postTypeQuery } from './posts_type/query';


const baseQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        components: {
            type: componentQuery,
            description: componentQuery.description,
            resolve: () => { return {} }
        },
        post_type: {
            type: postTypeQuery,
            description:postTypeQuery.description,
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


export const privateSchema = new GraphQLSchema({
    query: baseQuery,
    mutation: baseMutation
});