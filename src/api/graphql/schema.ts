import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import { componentQuery } from './component/query'

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        component: {
            type: componentQuery,
            description: componentQuery.description,
            resolve: () => { return {} }
        }
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     description: 'The base mutation',
//     fields: {

//     }
// });


export const schema = new GraphQLSchema({
    query: query
})