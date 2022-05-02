import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';

//  Media database model
export const MediaDatabaseModel = new GraphQLObjectType({
    name: 'MediaDatabaseModel',
    description: 'Media database model',
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: 'Media id'
        },
        location: {
            type: GraphQLString,
            description: 'The medias storage location'
        },
        key: {
            type: GraphQLID,
            description: 'The medias key'
        },
        alt: {
            type: GraphQLString,
            description: 'The medias alt'
        },
        width: {
            type: GraphQLInt,
            description: 'The medias width if its an image'
        },
        height: {
            type: GraphQLInt,
            description: 'The medias height if its an image'
        },
        uploaded: {
            type: GraphQLString,
            description: 'The medias uploaded date/time'
        },
        modified: {
            type: GraphQLString,
            description: 'The medias modified date/time'
        },
        types: {
            type: GraphQLList(GraphQLString),
            description: 'The medias types array'
        },
        title: {
            type: GraphQLString,
            description: 'The medias title'
        }
    })
});