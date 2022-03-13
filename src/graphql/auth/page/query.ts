import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { Page, MultiplePages, PageSearchRes, BasicPage, GetPageURLResType } from './type';
import { getSingle, getMultiple, pageSearch, getSinglePageViaPostId, getPathLiveURL } from './data';

// Get single pages
const getSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Get single page',
    args: {
        _id: { type: GraphQLString },
        slug: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return getSingle(args._id, args.slug);
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
        query: { type: GraphQLNonNull(GraphQLString) },
        full_slug: { type: GraphQLNonNull(GraphQLBoolean) },
        allow_home: { type: GraphQLNonNull(GraphQLBoolean) },
        type: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return pageSearch(args.query, args.full_slug, args.allow_home, args.type);
    }
}
// Search page by post id
const searchPagePostId: GraphQLFieldConfig<any, any, any> = {
    type: BasicPage,
    description: 'Get single page based on post type id',
    args: {
        post_id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSinglePageViaPostId(args.post_id);
    }
}

// get page live url
const getLiveURLQuery: GraphQLFieldConfig<any, any, any> = {
    type: GetPageURLResType,
    description: GetPageURLResType.description,
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return getPathLiveURL(args._id);
    }
}

export const PageQuery = new GraphQLObjectType({
    name: 'PageQuery',
    description: 'The page base query',
    fields: {
        get_single: getSinglePage,
        get_multiple: getMultiplePages,

        search_name: serachPageName,
        get_single_by_post_id: searchPagePostId,
        get_live_url: getLiveURLQuery
    }
})