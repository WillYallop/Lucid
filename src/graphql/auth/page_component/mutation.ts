import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentModel } from './type';
import { addPageComponent, deletePageComponent } from './data';

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

const deleteSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    args: {
        page_components_id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deletePageComponent(args.page_components_id)
    }
}

export const PageComponentMutation = new GraphQLObjectType({
    name: 'PageComponentMutation',
    description: 'The page component base mutation',
    fields: {
        add_page_component: addSinglePageComponent,
        delete_page_component: deleteSinglePageComponent
    }
})