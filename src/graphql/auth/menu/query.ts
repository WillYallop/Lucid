import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { MenusModel } from './type';
import { getMenu } from './data';

// Get single pages
const getMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Get single menu',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getMenu(args._id);
    }
}


export const MenuQuery = new GraphQLObjectType({
    name: 'MenuQuery',
    description: 'The menu base query',
    fields: {
        get_menu: getMenuField
    }
})