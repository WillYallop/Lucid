import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { SignInType } from './type';
import { signIn } from './data';

// Ping
const signInQueryFunction: GraphQLFieldConfig<any, any, any> = {
    type: SignInType,
    description: SignInType.description,
    args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { res, jwt_decoded }) => {
        const signInRes = await signIn({
            username: args.username,
            password: args.password
        });

        // if the user has updated the details from first login, set httpOnly cookies for auth
        // else these will be set up in the firstSignInUpdate auth route
        if(!signInRes.defualt_details && signInRes.success) {
            // auth cookie
            res.cookie('authCookie', signInRes?.token, {
                maxAge: 86400000 * 7,
                httpOnly: true,
                signed: true
            });
            // signed in state cookie
            res.cookie('signedIn', signInRes?.success, {
                maxAge: 86400000 * 7, 
                httpOnly: false, 
                signed: false
            });
            res.cookie('userID', signInRes?._id, {
                maxAge: 86400000 * 7, 
                httpOnly: false, 
                signed: false
            });
        }

        return {
            success: signInRes.success,
            defualt_details: signInRes.defualt_details,
            _id: signInRes._id
        };
    }
}

export const AuthenticationQuery = new GraphQLObjectType({
    name: 'AuthenticationQuery',
    description: 'The authentication base query',
    fields: {
        sign_in: signInQueryFunction
    }
})