import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLBoolean, GraphQLString, GraphQLList } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentModel } from './type';
import { deletePageComponent, addAndUpdatePageComponent } from './data';

const addUpdateSingle: GraphQLFieldConfig<any, any, any> = {
    type: PageComponentModel,
    description: 'Add or update a page component and its content types',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        page_id: { type: GraphQLNonNull(GraphQLID) },
        component_id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args) => {
        return addAndUpdatePageComponent({
            _id: args._id,
            page_id: args.page_id,
            component_id: args.component_id,
            position: args.position
        });
    }
}

const deleteSingle: GraphQLFieldConfig<any, any, any> = {
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
        add_update: addUpdateSingle,
        delete: deleteSingle
    }
})