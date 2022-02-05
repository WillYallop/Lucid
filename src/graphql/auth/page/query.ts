import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Page, MultiplePages, PageSearchRes } from './type';
import { getSingle, getMultiple, pageSearch } from './data';

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

// Search page by name
const serachPageName: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(PageSearchRes),
    description: 'Get a list of match pages',
    args: {
        query: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return pageSearch(args.name);
    }
}


export const PageQuery = new GraphQLObjectType({
    name: 'PageQuery',
    description: 'The page base query',
    fields: {
        get_single: getSinglePage,
        get_multiple: getMultiplePages,

        search_name: serachPageName
    }
})