import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { MenusModel, MenuLinkModel } from './type';
import { DeleteResType } from '../shared/type';
import { deleteMenu, createMenu, updateMenu, deleteMenuItem, addMenuItem, updateMenuItem, getMenu} from './data';

// Menu
// Delete menu and all its items
const deleteMenuField: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete menu',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteMenu(args._id);
    }
}

// Create new menu
const createMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Delete menu',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return createMenu(args.name);
    }
}

// Update menu
const updateMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Delete menu',
    args: {

    },
    resolve: (_, args) => {
        return updateMenu(args);
    }
}


// Menu Items
// Delete menu item
const deleteMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete menu item',
    args: {

    },
    resolve: (_, args) => {
        return deleteMenuItem(args);
    }
}

// Add menu item
const addMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: MenuLinkModel,
    description: 'Add menu item',
    args: {

    },
    resolve: (_, args) => {
        return addMenuItem(args);
    }
}

// Update menu item
const updateMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: MenuLinkModel,
    description: 'Update menu item',
    args: {

    },
    resolve: (_, args) => {
        return updateMenuItem(args);
    }
}


export const MenuMutation = new GraphQLObjectType({
    name: 'MenuMutation',
    description: 'The menu base mutation',
    fields: {
        delete_menu: deleteMenuField,
        delete_menu_item: deleteMenuItemField,
        create_menu: createMenuField,
        add_menu_item: addMenuItemField,
        update_menu: updateMenuField,
        update_menu_item: updateMenuItemField
    }
})