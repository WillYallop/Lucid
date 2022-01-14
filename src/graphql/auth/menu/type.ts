
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';

// Menu
export const MenusModel = new GraphQLObjectType({
    name: 'MenusModel',
    description: 'The menus model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The menus unique _id'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The menus unique name'
        },
        links: {
            type: GraphQLList(MenuLinkModel),
            description: 'All menu links'
        }
    })
})

export const MenuLinkModel = new GraphQLObjectType({
    name: 'MenuLinkModel',
    description: 'The menu link model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The menu links unique _id'
        },
        menu_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The menus unique _id'
        },
        page_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The pages unique _id'
        },
        blank: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'The links blank target state'
        },
        text: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The items inner text'
        },
        href: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The pages slug'
        }
    })
})