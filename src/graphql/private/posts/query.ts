import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { postType } from './Type';
import { getSingle, getMultiple } from './data';

// Get single post type
const singlePost: GraphQLFieldConfig<any, any, any> = {
    type: postType,
    description: 'Get single post',
    args: {
        id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args.id);
    }
}

// Get multiple post types
const getMultiplePost: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(postType),
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


export const postQuery = new GraphQLObjectType({
    name: 'PostQuery',
    description: 'The post base query',
    fields: {
        getSingle: singlePost,
        getMultiple: getMultiplePost
    }
})