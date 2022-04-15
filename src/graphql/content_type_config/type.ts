import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from 'graphql';

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
        parent: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Components content type parent'
        }
    })
});


export const ContentTypeConfigArgs = new GraphQLInputObjectType({
    name: 'ContentTypeConfigArgs',
    description: 'Config model for content type fields',
    fields: () => ({
        max: {
            type: GraphQLString,
            description: 'Max value/value'
        },
        min: {
            type: GraphQLString,
            description: 'Min value/value'
        },
        default: {
            type: GraphQLString,
            description: 'Default value'
        },
    })
});

// Content Type Config
export const ContentTypeConfig = new GraphQLObjectType({
    name: 'ContentTypeConfig',
    description: 'Config model for content type fields',
    fields: () => ({
        max: {
            type: GraphQLString,
            description: 'Max value/value'
        },
        min: {
            type: GraphQLString,
            description: 'Min value/value'
        },
        default: {
            type: GraphQLString,
            description: 'Default value'
        }
    })
});