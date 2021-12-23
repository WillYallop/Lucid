
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'

// GraphQL object type
export const component = new GraphQLObjectType({
    name: 'Componet Model',
    description: 'The component model',
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
        file_path: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The path to the component'
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
        },
        fields: {
            type: GraphQLList(GraphQLString),
            description: 'A list of field IDs'
        }
    })
});

// Delete object type
export const componentDelete = new GraphQLObjectType({
    name: 'Delete Component Response',
    description: 'The delete component response',
    fields: () => ({
        deleted: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Returns the state of the delete action'
        },
    })
});