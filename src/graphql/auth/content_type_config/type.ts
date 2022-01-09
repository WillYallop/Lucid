import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql';

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
        }
    })
});