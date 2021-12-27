import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

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

// Content Type Database
export const ContentTypeDatabase = new GraphQLObjectType({
    name: 'ContentTypeDatabase',
    description: 'Database model for content type fields',
    fields: () => ({
        text_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Text value'
        },
        emaiL_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Email value'
        },
        rich_media_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Rich media value'
        },
        number_value: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Number value'
        },
        range_value: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Range value'
        },
        repeater_value: {
            type: GraphQLList(ContentTypeDatabase),
            description: 'Repeater value'
        },
        select_value: {
            type: GraphQLList(GraphQLString),
            description: 'Select value'
        },
        date_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Date value'
        },
        media_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Media value'
        },
        boolean_value: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Boolean value'
        },
        json_value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'JSON value'
        }
    })
});