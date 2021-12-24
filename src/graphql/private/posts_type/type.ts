
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'

// GraphQL object type
export const postTypeType = new GraphQLObjectType({
    name: 'PostTypeModel',
    description: 'The post type model',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The unique component id'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The name of the post type'
        },
        template_name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'the template file name'
        }
    })
});