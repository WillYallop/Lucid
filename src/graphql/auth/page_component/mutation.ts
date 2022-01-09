import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentModel } from './type';
import { addPageComponent, deletePageComponent, updatePageComponent } from './data';

const addSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: PageComponentModel,
    description: 'Add single page component',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },
        component_id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args) => {
        return addPageComponent(args.page_id, args.component_id, args.position);
    }
}

const updateSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: PageComponentModel,
    description: 'Update single page component data',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLInt }
    },
    resolve: (_, args) => {
        return updatePageComponent(args._id, {
            position: args.position
        })
    }
}

const deleteSinglePageComponent: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
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
        delete_page_component: deleteSinglePageComponent,
        update_page_component: updateSinglePageComponent
    }
})