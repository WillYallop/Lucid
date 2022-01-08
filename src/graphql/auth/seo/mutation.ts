import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { SEOObjectType } from './type';
import { updateSingleSEO } from './data';

// Update SEO
const updateSingleSEOMutation: GraphQLFieldConfig<any, any, any> = {
    type: SEOObjectType,
    description: 'Update single page SEO object',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },

        title: { type: GraphQLString },
        description: { type: GraphQLString },
        og_title: { type: GraphQLString },
        og_description: { type: GraphQLString },
        og_image: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return updateSingleSEO(args.page_id, {
            title: args.title,
            description: args.description,
            og_title: args.og_title,
            og_description: args.og_description,
            og_image: args.og_image
        });
    }
}

export const SEOMutation = new GraphQLObjectType({
    name: 'SEOMutation',
    description: 'The SEO base mutation',
    fields: {
        updateSingle: updateSingleSEOMutation
    }
})