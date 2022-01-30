import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLList } from 'graphql';

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
            type: GraphQLList(ComponentContentTypeModelFields),
            description: 'Only used for the repeater content type'
        }
    })
});

export const ComponentContentTypeModelFields = new GraphQLObjectType({
    name: 'ComponentContentTypeModelFields',
    description: 'Component content type model fields',
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