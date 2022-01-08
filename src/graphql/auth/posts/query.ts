import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { PostType } from './type';
import { getSingle, getMultiple } from './data';

// Get single post type
const singlePost: GraphQLFieldConfig<any, any, any> = {
    type: PostType,
    description: 'Get single post',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args._id);
    }
}

// Get multiple post types
const getMultiplePost: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(PostType),
    description: 'Get multiple posts',
    args: {
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        all: { type: GraphQLBoolean }
    },
    resolve: (_, args) => {
        return getMultiple(args.limit, args.skip, args.all);
    }
}


export const PostQuery = new GraphQLObjectType({
    name: 'PostQuery',
    description: 'The post base query',
    fields: {
        getSingle: singlePost,
        getMultiple: getMultiplePost
    }
})