import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { firstSignInUpdateType } from './type';
import { firstSignInUpdateDetails } from './data';

// sign in and update
const signInUpdateQueryFunction: GraphQLFieldConfig<any, any, any> = {
    type: firstSignInUpdateType,
    description: firstSignInUpdateType.description,
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { res, jwt_decoded }) => {
        const signInUpdateRes = await firstSignInUpdateDetails({
            _id: args._id,
            email: args.email,
            username: args.username,
            password: args.password
        });

        if(signInUpdateRes.success) {
            // auth cookie
            res.cookie('authCookie', signInUpdateRes?.token, {
                maxAge: 86400000 * 7,
                httpOnly: true,
                signed: true
            });
            // signed in state cookie
            res.cookie('signedIn', signInUpdateRes?.success, {
                maxAge: 86400000 * 7, 
                httpOnly: false, 
                signed: false
            });
            res.cookie('userID', signInUpdateRes?._id, {
                maxAge: 86400000 * 7, 
                httpOnly: false, 
                signed: false
            });
        }

        return {
            success: signInUpdateRes.success
        };
    }
}

export const AuthenticationMutation = new GraphQLObjectType({
    name: 'AuthenticationMutation',
    description: 'The authentication base mutation',
    fields: {
        sign_in_update: signInUpdateQueryFunction
    }
})