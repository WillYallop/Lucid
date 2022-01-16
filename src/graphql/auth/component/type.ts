
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from 'graphql';
import { ComponentContentTypeConfig } from '../content_type_config/type';

// GraphQL object type
export const Component = new GraphQLObjectType({
    name: 'ComponetModel',
    description: 'The component model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique component _id'
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
        content_types: {
            type: GraphQLList(ComponentContentTypeConfig),
            description: 'A list of the content_types'
        }
    })
});