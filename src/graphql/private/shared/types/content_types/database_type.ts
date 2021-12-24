import {GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';

// Text content type database
export const ContentTypeDatabaseText = new GraphQLObjectType({
    name: 'ContentTypeDatabaseText',
    description: 'Database model for content type text',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Text value'
        }
    })
});

// Email content type database
export const ContentTypeDatabaseEmail = new GraphQLObjectType({
    name: 'ContentTypeDatabaseEmail',
    description: 'Database model for content type email',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Email value'
        }
    })
});

// Rich media content type database
export const ContentTypeDatabaseRichMedia = new GraphQLObjectType({
    name: 'ContentTypeDatabaseRichMedia',
    description: 'Database model for content type rich media',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Rich media value'
        }
    })
});


// Number content type database
export const ContentTypeDatabaseNumber = new GraphQLObjectType({
    name: 'ContentTypeDatabaseNumber',
    description: 'Database model for content type number',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Number value'
        }
    })
});

// Range content type database
export const ContentTypeDatabaseRange = new GraphQLObjectType({
    name: 'ContentTypeDatabaseRange',
    description: 'Database model for content type range',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'Range value'
        }
    })
});

// Repeater content type database
export const ContentTypeDatabaseRepeater = new GraphQLObjectType({
    name: 'ContentTypeDatabaseRepeater',
    description: 'Database model for content type repeater',
    fields: () => ({
        value: {
            type: GraphQLList(ContentTypeDatabaseText || ContentTypeDatabaseEmail || ContentTypeDatabaseRichMedia || ContentTypeDatabaseNumber || ContentTypeDatabaseRange || ContentTypeDatabaseRepeater || ContentTypeDatabaseSelect || ContentTypeDatabaseDate || ContentTypeDatabaseMedia || ContentTypeDatabaseBoolean || ContentTypeDatabaseJSON),
            description: 'Repeater value'
        }
    })
});

// Select content type database
export const ContentTypeDatabaseSelect = new GraphQLObjectType({
    name: 'ContentTypeDatabaseSelect',
    description: 'Database model for content type select',
    fields: () => ({
        value: {
            type: GraphQLList(GraphQLInt || GraphQLString),
            description: 'Select value'
        }
    })
});

// Date content type database
export const ContentTypeDatabaseDate = new GraphQLObjectType({
    name: 'ContentTypeDatabaseDate',
    description: 'Database model for content type date',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Date value'
        }
    })
});

// Media content type database
export const ContentTypeDatabaseMedia = new GraphQLObjectType({
    name: 'ContentTypeDatabaseMedia',
    description: 'Database model for content type media',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Media value'
        }
    })
});

// Boolean content type database
export const ContentTypeDatabaseBoolean = new GraphQLObjectType({
    name: 'ContentTypeDatabaseBoolean',
    description: 'Database model for content type boolean',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Boolean value'
        }
    })
});

// JSON content type database
export const ContentTypeDatabaseJSON = new GraphQLObjectType({
    name: 'ContentTypeDatabaseJSON',
    description: 'Database model for content type JSON',
    fields: () => ({
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'JSON value'
        }
    })
});