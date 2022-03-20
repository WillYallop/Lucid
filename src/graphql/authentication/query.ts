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
    resolve: (_, args, { jwt_decoded }) => {
        return signIn({
            username: args.username,
            password: args.password
        })
    }
}

export const AuthenticationQuery = new GraphQLObjectType({
    name: 'AuthenticationQuery',
    description: 'The authentication base query',
    fields: {
        sign_in: signInQueryFunction
    }
})