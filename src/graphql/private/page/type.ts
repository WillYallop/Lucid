
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// GraphQL object type
export const Page = new GraphQLObjectType({
    name: 'PageModel',
    description: 'The page model',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The unique page id'
        },
        template: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component name'
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component file_name'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The path to the component'
        },
        seo: {
            type: PageSeoObject,
            description: 'The component description'
        },
        components: {
            type: GraphQLList(GraphQLID),
            description: 'List of component IDs'
        }
    })
});

export const PageSeoObject = new GraphQLObjectType({
    name:'PageSEOModel',
    description: 'The page SEO model',
    fields: () => ({
        title: { 
            type: GraphQLString,
            description: 'Page SEO title'
        },
        description: { 
            type: GraphQLString,
            description: 'Page SEO description'
        }
    })
})