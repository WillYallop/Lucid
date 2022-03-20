import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { MenusModel } from './type';
import { getMenu } from './data';
import { __generateErrorString } from '../../functions/shared';


// Get single pages
const getMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Get single menu',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await getMenu(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getMenuField'
        })
    }
}

export const MenuQuery = new GraphQLObjectType({
    name: 'MenuQuery',
    description: 'The menu base query',
    fields: {
        get_menu: getMenuField
    }
})