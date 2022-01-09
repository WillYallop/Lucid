import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentModel } from './type';
import { addPageComponent } from './data';

const addSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: PageComponentModel,
    description: 'Update single page',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },
        component_id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args) => {
        return addPageComponent(args.page_id, args.component_id, args.position);
    }
}

export const PageComponentMutation = new GraphQLObjectType({
    name: 'PageComponentMutation',
    description: 'The page component base mutation',
    fields: {
        addPageComponent: addSinglePageComponent
    }
})