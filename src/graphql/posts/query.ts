import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { PostType } from './type';
import { getSingle, getMultiple, getSingleByName } from './data';
import { __generateErrorString } from '../../functions/shared';


// Get single post type
const singlePost: GraphQLFieldConfig<any, any, any> = {
    type: PostType,
    description: 'Get single post',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getSingle(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'singlePost'
        })
    }
}

// Get single post type by name
const singlePostByName: GraphQLFieldConfig<any, any, any> = {
    type: PostType,
    description: 'Get single post by name',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getSingleByName(args.name);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'singlePostByName'
        })
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
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getMultiple(args.limit, args.skip, args.all);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getMultiplePost'
        })
    }
}


export const PostQuery = new GraphQLObjectType({
    name: 'PostQuery',
    description: 'The post base query',
    fields: {
        get_single: singlePost,
        get_single_by_name: singlePostByName,
        get_multiple: getMultiplePost
    }
})