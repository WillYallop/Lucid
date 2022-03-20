
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// GraphQL object type
export const PostType = new GraphQLObjectType({
    name: 'PostModel',
    description: 'The post model',
    fields: () => ({
        _id: {
            type: GraphQLID,
            description: 'The unique component _id'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The name of the post type'
        },
        template_path: {
            type: GraphQLNonNull(GraphQLString),
            description: 'the template file name'
        }
    })
});