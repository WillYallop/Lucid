import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } from 'graphql';

// Delete object type
export const DeleteResType = new GraphQLObjectType({
    name: 'DeleteRes',
    description: 'Delete entry resposne',
    fields: () => ({
        deleted: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Returns the state of the delete action'
        },
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
        }
    })
});