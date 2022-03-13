import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentBaseModel } from './type';
import { deletePageComponent, updateMultiplePageComponents, addMultiplePageComponents, deleteMultiplePageComponenets } from './data';

const addMultiple: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(PageComponentBaseModel),
    description: 'Add multiple page components',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },
        page_components: {
            type: GraphQLList(
                new GraphQLInputObjectType({
                    name: 'addMultiplePageComponentsInput',
                    description: 'Add multiple page component input',
                    fields: () => ({
                        _id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Page component ID'
                        },
                        component_id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Page component assigned component ID'
                        },
                        page_id: {
                            type: GraphQLID,
                            description: 'Page components assigned page ID'
                        },
                        position: {
                            type: GraphQLNonNull(GraphQLInt),
                            description: 'Page component position'
                        }
                    })
                })
            )
        }
    },
    resolve: (_, args) => {
        return addMultiplePageComponents(args.page_components, args.page_id);
    }
};

const updateMultiple: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(PageComponentBaseModel),
    description: 'Update multiple page components',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },
        page_components: {
            type: GraphQLList(
                new GraphQLInputObjectType({
                    name: 'updateMultiplePageComponentsInput',
                    description: 'Update multiple page component input',
                    fields: () => ({
                        _id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Page component ID'
                        },
                        position: {
                            type: GraphQLInt,
                            description: 'Page component position'
                        },
                    })
                })
            )
        }
    },
    resolve: (_, args) => {
        return updateMultiplePageComponents(args.page_components, args.page_id);
    }
};

const deleteMultiple: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(DeleteResType),
    description: 'Delete multiple page components',
    args: {
        page_component_ids: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteMultiplePageComponenets(args.page_component_ids);
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
        add_multiple: addMultiple,
        update_multiple: updateMultiple,
        delete_multiple: deleteMultiple,
        delete: deleteSingle
    }
})