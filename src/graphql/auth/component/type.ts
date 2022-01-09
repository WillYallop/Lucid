
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from 'graphql';
import { ContentTypeConfig, ContentTypeConfigArgs } from '../shared/type';

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
            type: GraphQLNonNull(GraphQLList(ComponentContentTypeConfig)),
            description: 'A list of the content_types'
        }
    })
});

//  Component content_type
export const ComponentContentTypeConfig = new GraphQLObjectType({
    name: 'ComponentContentTypeConfigModel',
    description: 'Component content type model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Component content type database ID'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type name'
        },
        type: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type type'
        },
        config: {
            type: GraphQLNonNull(ContentTypeConfig), 
            description: 'Component content type config'
        },
        fields: {
            type: new GraphQLObjectType({
                name: 'ComponentContentTypeModel',
                description: 'Component content type model',
                fields: () => ({
                    _id: {
                        type: GraphQLNonNull(GraphQLID),
                        description: 'Component content type database ID'
                    },
                    name: {
                        type: GraphQLNonNull(GraphQLString),
                        description: 'Component content type name'
                    },
                    type: {
                        type: GraphQLNonNull(GraphQLString),
                        description: 'Component content type type'
                    },
                    config: {
                        type: GraphQLNonNull(ContentTypeConfig), 
                        description: 'Component content type config'
                    }
                })
            }),
            description: 'Only used for the repeater content type'
        }
    })
})