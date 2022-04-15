import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { PageComponent } from './type';
import { getSingle } from './data';
import { __generateErrorString } from '../../functions/shared';

// Get single pages
const getSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: PageComponent,
    description: 'Get single page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await getSingle(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getSinglePageComponent'
        })
    }
}


export const PageComponentQuery = new GraphQLObjectType({
    name: 'PageComponentQuery',
    description: 'The page component base query',
    fields: {
        get_single: getSinglePageComponent
    }
})