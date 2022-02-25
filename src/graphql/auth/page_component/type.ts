
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

// Page Component
export const PageComponentModel = new GraphQLObjectType({
    name: 'PageComponentModel',
    description: 'The page_components table row model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page component id- refers to the page components table _id'
        },
        page_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique page id'
        },
        component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique component - refers to the theme config component _id'
        },
        position: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'The components position on the page'
        }
    })
});