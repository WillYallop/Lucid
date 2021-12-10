
import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'

// Typescript definiton to keep everything inline
export type componentType = {
    id: string
    file_name: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string
}

// GraphQL object type
export const component = new GraphQLObjectType({
    name: 'User',
    description: 'The user',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The unique component id'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component name'
        },
        file_name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component file_name'
        },
        description: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component description'
        },
        preview_url: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component preview_url'
        },
        date_added: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component date_added'
        },
        date_modified: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component date_modified'
        }
    })
})