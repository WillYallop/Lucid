
import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const SignInType = new GraphQLObjectType({
    name: 'SignInType',
    description: 'The sign in type',
    fields: () => ({
        success: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'If we should sign in or not'
        },
        defualt_details: {
            type: GraphQLBoolean,
            description: 'Has the user update the default details yet'
        },
        _id: {
            type: GraphQLID,
            description: 'The users ID'
        }
    })
});

export const firstSignInUpdateType = new GraphQLObjectType({
    name: 'firstSignInUpdateType',
    description: 'The sign in update details type',
    fields: () => ({
        success: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'If we should sign in or not'
        }
    })
});

export const SignOutType = new GraphQLObjectType({
    name: 'SignOutType',
    description: 'The sign out type',
    fields: () => ({
        success: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'If we should sign in or not'
        }
    })
});