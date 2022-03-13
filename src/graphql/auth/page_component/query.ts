import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { PageComponent } from './type';
import { getSingle } from './data';

// Get single pages
const getSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: PageComponent,
    description: 'Get single page',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return getSingle(args._id);
    }
}


export const PageComponentQuery = new GraphQLObjectType({
    name: 'PageComponentQuery',
    description: 'The page component base query',
    fields: {
        get_single: getSinglePageComponent
    }
})