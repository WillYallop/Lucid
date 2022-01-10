import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Page } from './type';
import { DeleteResType } from '../shared/type';
import { deleteSingle, saveSingle, updateSingle } from './data';

// Get single component
const deleteSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteSingle(args._id);
    }
}

const saveSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Save single page',
    args: {
        template: { type: GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
        has_parent: { type: GraphQLNonNull(GraphQLBoolean) },
        parent_id: { type: GraphQLString },
        author: { type: GraphQLNonNull(GraphQLString) },
        is_homepage: { type: GraphQLNonNull(GraphQLBoolean) }
    },
    resolve: (_, args) => {
        return saveSingle(args);
    }
}

const updateSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Update single page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        template: { type: GraphQLString },
        slug: { type: GraphQLString },
        name: { type: GraphQLString },
        has_parent: { type: GraphQLBoolean },
        parent_id: { type: GraphQLString },
        is_homepage: { type: GraphQLBoolean }
    },
    resolve: (_, args) => {
        return updateSingle(args._id, {
            template: args.template,
            slug: args.slug,
            name: args.name,
            has_parent: args.has_parent,
            parent_id: args.parent_id,
            is_homepage: args.is_homepage
        });
    }
}

export const PageMutation = new GraphQLObjectType({
    name: 'PageMutation',
    description: 'The page base mutation',
    fields: {
        delete_single: deleteSinglePage,
        save_single: saveSinglePage,
        update_single: updateSinglePage
    }
})