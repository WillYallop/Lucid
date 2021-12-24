import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { postTypeType } from './Type';
import { getSingle, getMultiple } from './data';

// Get single post type
const singlePostType: GraphQLFieldConfig<any, any, any> = {
    type: postTypeType,
    description: postTypeType.description,
    args: {
        id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args.id);
    }
}

// Get multiple post types
const getMultiplePostTypes: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(postTypeType),
    description: postTypeType.description,
    args: {
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        all: { type: GraphQLBoolean }
    },
    resolve: (_, args) => {
        return getMultiple(args.limit, args.skip, args.all);
    }
}


export const postTypeQuery = new GraphQLObjectType({
    name: 'PostTypeQuery',
    description: 'The post type base query',
    fields: {
        getSingle: singlePostType,
        getMultiple: getMultiplePostTypes
    }
})