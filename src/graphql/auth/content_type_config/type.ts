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
        max_repeats: {
            type: GraphQLInt,
            description: 'Max repeats'
        },
        max_range: {
            type: GraphQLInt,
            description: 'Max range'
        },
        min_range: {
            type: GraphQLInt,
            description: 'Min range'
        },
        max_length: {
            type: GraphQLInt,
            description: 'Max text length'
        },
        min_length: {
            type: GraphQLInt,
            description: 'Min text length'
        },
        default_num: {
            type: GraphQLInt,
            description: 'Default number'
        },
        default_str: {
            type: GraphQLString,
            description: 'Default string'
        }
    })
});

// Content Type Config
export const ContentTypeConfig = new GraphQLObjectType({
    name: 'ContentTypeConfig',
    description: 'Config model for content type fields',
    fields: () => ({
        max_repeats: {
            type: GraphQLInt,
            description: 'Max repeats'
        },
        max_range: {
            type: GraphQLInt,
            description: 'Max range'
        },
        min_range: {
            type: GraphQLInt,
            description: 'Min range'
        },
        max_length: {
            type: GraphQLInt,
            description: 'Max text length'
        },
        min_length: {
            type: GraphQLInt,
            description: 'Min text length'
        },
        default_num: {
            type: GraphQLInt,
            description: 'Default number'
        },
        default_str: {
            type: GraphQLString,
            description: 'Default string'
        }
    })
});