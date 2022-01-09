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
            type: GraphQLNonNull(GraphQLString),
            description: 'The SEO title'
        },
        description: { 
            type: GraphQLNonNull(GraphQLString),
            description: 'The SEO description'
        },
        og_title: { 
            type: GraphQLNonNull(GraphQLString),
            description: 'The OG title'
        },
        og_description: { 
            type: GraphQLNonNull(GraphQLString),
            description: 'The OG description'
        },
        og_image: { 
            type: GraphQLNonNull(GraphQLString),
            description: 'The OG image'
        }
    })
});