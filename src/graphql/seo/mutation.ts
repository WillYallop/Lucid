import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { SEOObjectType } from './type';
import { updateSingleSEO } from './data';
import { __generateErrorString } from '../../functions/shared';

// Update SEO
const updateSingleSEOMutation: GraphQLFieldConfig<any, any, any> = {
    type: SEOObjectType,
    description: 'Update single page SEO object',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },

        title: { type: GraphQLString },
        description: { type: GraphQLString },
        canonical: { type: GraphQLString },
        robots: { type: GraphQLString },

        og_type: { type: GraphQLString },
        og_title: { type: GraphQLString },
        og_description: { type: GraphQLString },
        og_image: { type: GraphQLString },

        twitter_card: { type: GraphQLString },
        twitter_title: { type: GraphQLString },
        twitter_description: { type: GraphQLString },
        twitter_image: { type: GraphQLString },
        twitter_creator: { type: GraphQLString },
        twitter_site: { type: GraphQLString },
        twitter_player: { type: GraphQLString }

    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateSingleSEO(args.page_id, {
                title: args.title,
                description: args.description,
                canonical: args.canonical,
                robots: args.robots,
        
                og_type: args.og_type,
                og_title: args.og_title,
                og_description: args.og_description,
                og_image: args.og_image,
        
                twitter_card: args.twitter_card,
                twitter_title: args.twitter_title,
                twitter_description: args.twitter_description,
                twitter_image: args.twitter_image,
                twitter_creator: args.twitter_creator,
                twitter_site: args.twitter_site,
                twitter_player: args.twitter_player
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateSingleSEOMutation'
        })
    }
}

export const SEOMutation = new GraphQLObjectType({
    name: 'SEOMutation',
    description: 'The SEO base mutation',
    fields: {
        update_single: updateSingleSEOMutation
    }
})