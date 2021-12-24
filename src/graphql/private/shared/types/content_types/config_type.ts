import {GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType} from 'graphql';

// Text content type config 
export const ContentTypeConfigText = new GraphQLObjectType({
    name: 'ContentTypeConfigText',
    description: 'Config model for content type text',
    fields: () => ({
        max_length: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Max text length'
        },
        min_length: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Min text length'
        }
    })
});

// Range content type config
export const ContentTypeConfigRange = new GraphQLObjectType({
    name: 'ContentTypeConfigRange',
    description: 'Config model for content type range',
    fields: () => ({
        max_range: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Max range'
        },
        min_range: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Min range'
        }
    })
});

// Repeater content type config
export const ContentTypeConfigRepeater = new GraphQLObjectType({
    name: 'ContentTypeConfigRepeater',
    description: 'Config model for content type repeater',
    fields: () => ({
        max_repeats: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Max repeats'
        }
    })
});