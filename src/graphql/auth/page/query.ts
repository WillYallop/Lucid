import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Page, MultiplePages } from './type';
import { getSingle, getMultiple } from './data';

// Get single pages
const getSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Get single page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args._id);
    }
}

// Get multiple pages
const getMultiplePages: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(MultiplePages),
    description: 'Get multiple pages',
    args: {
        type: { type: GraphQLNonNull(GraphQLString) },
        post_name: { type: GraphQLString },
        limit: { type: GraphQLNonNull(GraphQLInt) },
        skip: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args)  => {
        return getMultiple(args.type, args.post_name, args.limit, args.skip);
    }
}


export const PageQuery = new GraphQLObjectType({
    name: 'PageQuery',
    description: 'The page base query',
    fields: {
        getSingle: getSinglePage,
        getMultiple: getMultiplePages
    }
})