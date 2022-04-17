import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// Page SEO
export const SEOObjectType = new GraphQLObjectType({
    name:'SEOObjectType',
    description: 'The SEO model',
    fields: () => ({
        page_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The corresponding pages ID'
        },
        title: { 
            type: GraphQLString,
            description: 'The page meta title'
        },
        description: { 
            type: GraphQLString,
            description: 'The page meta description'
        },
        canonical: { 
            type: GraphQLString,
            description: 'The page meta canonical'
        },
        robots: { 
            type: GraphQLString,
            description: 'The page meta robots'
        },

        og_type: { 
            type: GraphQLString,
            description: 'The page meta og_type'
        },
        og_title: { 
            type: GraphQLString,
            description: 'The page meta og_title'
        },
        og_description: { 
            type: GraphQLString,
            description: 'The page meta og_description'
        },
        og_image: { 
            type: GraphQLString,
            description: 'The page meta og_image'
        },

        twitter_card: { 
            type: GraphQLString,
            description: 'The page meta twitter_card'
        },
        twitter_title: { 
            type: GraphQLString,
            description: 'The page meta twitter_title'
        },
        twitter_description: { 
            type: GraphQLString,
            description: 'The page meta twitter_description'
        },
        twitter_image: { 
            type: GraphQLString,
            description: 'The page meta twitter_image'
        },
        twitter_creator: { 
            type: GraphQLString,
            description: 'The page meta twitter_creator'
        },
        twitter_site: { 
            type: GraphQLString,
            description: 'The page meta twitter_site'
        },
        twitter_player: { 
            type: GraphQLString,
            description: 'The page meta twitter_player'
        }
    })
});