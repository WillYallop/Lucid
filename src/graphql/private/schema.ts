import {GraphQLObjectType, GraphQLSchema} from 'graphql';

// Components
import { ComponentQuery } from './component/query';
import { ComponentMutation } from './component/mutation';
// Post Types
import { PostQuery } from './posts/query';
import { PostMutation } from './posts/mutation';
// Page
import { PageQuery } from './page/query';
import { PageMutation } from './page/mutation';


const baseQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        components: {
            type: ComponentQuery,
            description: ComponentQuery.description,
            resolve: () => { return {} }
        },
        post: {
            type: PostQuery,
            description: PostQuery.description,
            resolve: () => { return {} }
        },
        page: {
            type: PageQuery,
            description: PageQuery.description,
            resolve: () => { return {} }
        }
    }
});

const baseMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The base mutation',
    fields: {
        components: {
            type: ComponentMutation,
            description: ComponentMutation.description,
            resolve: () => { return {} }
        },
        post: {
            type: PostMutation, 
            description: PostMutation.description,
            resolve: () => { return {} }
        },
        page: {
            type: PageMutation,
            description: PageMutation.description,
            resolve: () => { return {} }
        }
    }
});


export const privateSchema = new GraphQLSchema({
    query: baseQuery,
    mutation: baseMutation
});