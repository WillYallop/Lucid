import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { postType } from './Type';
import { deleteResType } from '../shared/type';
import { deleteSingle, saveSingle } from './data';

// Get single component
const deleteSinglePost: GraphQLFieldConfig<any, any, any> = {
    type: deleteResType,
    description: 'Delete post',
    args: {
        id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteSingle(args.id);
    }
}

const saveSinglePost: GraphQLFieldConfig<any, any, any> = {
    type: postType,
    description: 'Save single post',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        template_name: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return saveSingle(args.name, args.template_name);
    }
}


export const postMutation = new GraphQLObjectType({
    name: 'PostMutation',
    description: 'The post base mutation',
    fields: {
        deleteSingle: deleteSinglePost,
        saveSingle: saveSinglePost
    }
})