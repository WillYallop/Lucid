import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { DeleteResType } from '../shared/type';
import { PageComponentBaseModel } from './type';
import { deletePageComponent, updateMultiplePageComponents, addMultiplePageComponents, deleteMultiplePageComponenets } from './data';
import { __generateErrorString } from '../../functions/shared';

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
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await addMultiplePageComponents(args.page_components, args.page_id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'addMultiple'
        })
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
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateMultiplePageComponents(args.page_components, args.page_id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateMultiple'
        })
    }
};

const deleteMultiple: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(DeleteResType),
    description: 'Delete multiple page components',
    args: {
        page_component_ids: { type: GraphQLList(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteMultiplePageComponenets(args.page_component_ids);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteMultiple'
        })
    }
} 

const deleteSingle: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deletePageComponent(args.page_components_id)
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteSingle'
        })
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