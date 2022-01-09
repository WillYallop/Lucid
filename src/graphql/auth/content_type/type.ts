import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

//  Component content_type
export const ContentTypeDatabaseModel = new GraphQLObjectType({
    name: 'ContentTypeDatabaseModel',
    description: 'Content type database model',
    fields: () => ({
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type id'
        },
        config_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type config id'
        },
        value: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Content type value'
        }
    })
});