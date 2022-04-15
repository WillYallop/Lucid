import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Page } from './type';
import { DeleteResType } from '../shared/type';
import { deleteSingle, saveSingle, updateSingle } from './data';
import { __generateErrorString } from '../../functions/shared';


// Get single component
const deleteSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteSingle(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteSinglePage'
        })
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
        post_name: { type: GraphQLString },
        author: { type: GraphQLNonNull(GraphQLString) },
        is_homepage: { type: GraphQLNonNull(GraphQLBoolean) },
        post_type_id: { type: GraphQLID }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await saveSingle(args);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'saveSinglePage'
        })
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
        is_homepage: { type: GraphQLBoolean },
        post_type_id: { type: GraphQLID }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateSingle(args._id, {
                template: args.template,
                slug: args.slug,
                name: args.name,
                has_parent: args.has_parent,
                parent_id: args.parent_id,
                is_homepage: args.is_homepage,
                post_type_id: args.post_type_id
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateSinglePage'
        })
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