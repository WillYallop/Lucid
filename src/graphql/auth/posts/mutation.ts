import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { PostType } from './Type';
import { DeleteResType } from '../shared/type';
import { deleteSingle, saveSingle } from './data';

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
        template_name: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return saveSingle(args.name, args.template_name);
    }
}


export const PostMutation = new GraphQLObjectType({
    name: 'PostMutation',
    description: 'The post base mutation',
    fields: {
        deleteSingle: deleteSinglePost,
        saveSingle: saveSinglePost
    }
})