import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { MenusModel, MenuLinkModel } from './type';
import { DeleteResType } from '../shared/type';
import { deleteMenu, createMenu, updateMenu, deleteMenuItem, addMenuItem, updateMenuItem, getMenu} from './data';
import { __generateErrorString } from '../../functions/shared';


// Menu
// Delete menu and all its items
const deleteMenuField: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete menu',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteMenu(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteMenuField'
        })
    }
}

// Create new menu
const createMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Delete menu',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await createMenu(args.name);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'createMenuField'
        })
    }
}

// Update menu
const updateMenuField: GraphQLFieldConfig<any, any, any> = {
    type: MenusModel,
    description: 'Delete menu',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateMenu(args._id, args.name);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateMenuField'
        })
    }
}

// Menu Items
// Delete menu item
const deleteMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete menu item',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteMenuItem(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteMenuItemField'
        })
    }
}

// Add menu item
const addMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: MenuLinkModel,
    description: 'Add menu item',
    args: {
        menu_id: { type: GraphQLNonNull(GraphQLID) },
        page_id: { type: GraphQLNonNull(GraphQLID) },
        blank: { type: GraphQLNonNull(GraphQLBoolean) },
        text: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await addMenuItem({
                menu_id: args.menu_id,
                page_id: args.page_id,
                blank: args.blank,
                text: args.text
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'addMenuItemField'
        })
    }
}

// Update menu item
const updateMenuItemField: GraphQLFieldConfig<any, any, any> = {
    type: MenuLinkModel,
    description: 'Update menu item',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        page_id: { type: GraphQLID },
        blank: { type: GraphQLBoolean },
        text: { type: GraphQLString }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateMenuItem(args._id, {
                page_id: args.page_id,
                blank: args.blank,
                text: args.text
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateMenuItemField'
        })
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