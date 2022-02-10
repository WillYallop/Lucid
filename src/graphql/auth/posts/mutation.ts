import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { PostType } from './type';
import { DeleteResType } from '../shared/type';
import { deleteSingle, saveSingle, updateSingle } from './data';

// Get single component
const deleteSinglePost: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete post',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteSingle(args._id);
    }
}

const saveSinglePost: GraphQLFieldConfig<any, any, any> = {
    type: PostType,
    description: 'Save single post',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        template_path: { type: GraphQLNonNull(GraphQLString) },
        page_id: { type: GraphQLID }
    },
    resolve: (_, args) => {
        return saveSingle(args.name, args.template_path, args.page_id);
    }
}

const updateSinglePost: GraphQLFieldConfig<any, any, any> = {
    type: PostType,
    description: 'Update single post',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type:GraphQLString },
        template_path: { type: GraphQLString },
        page_id: { type: GraphQLID }
    },
    resolve: (_, args) => {
        return updateSingle(args._id, {
            name: args.name,
            template_path: args.template_path,
            page_id: args.page_id
        });
    }
}

export const PostMutation = new GraphQLObjectType({
    name: 'PostMutation',
    description: 'The post base mutation',
    fields: {
        delete_single: deleteSinglePost,
        save_single: saveSinglePost,
        update_single: updateSinglePost
    }
})