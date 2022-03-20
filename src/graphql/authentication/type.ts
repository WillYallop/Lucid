
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const SignInType = new GraphQLObjectType({
    name: 'SignInType',
    description: 'The sign in type',
    fields: () => ({
        success: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'If we should sign in or not'
        },
        token: {
            type: GraphQLString,
            description: 'The JWT'
        }
    })
});