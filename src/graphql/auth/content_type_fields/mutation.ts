import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { DeleteResType } from '../shared/type';
import { ContentTypeDatabaseModel, ContentTypeFieldGroupModel } from './type';
import { saveMultipleGroups, deleteMultipleGroups, saveMultipleFields } from './data';


const saveMultipleGroupFields: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(ContentTypeFieldGroupModel),
    description: 'Save multiple content type field groups',
    args: {
        groups: { 
            type: GraphQLList(
                new GraphQLInputObjectType({
                    name: 'ContentTypeFieldGroupModelInput',
                    description: 'Content type groups input model',
                    fields: () => ({
                        _id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'The group ID'
                        },
                        page_component_id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'The page component it belongs to'
                        },
                        parent_group: {
                            type: GraphQLID,
                            description: 'The parent group id, if it has one'
                        },
                        parent_config_id: {
                            type: GraphQLID,
                            description: 'The groups parent content type config id'
                        },
                        position: {
                            type: GraphQLNonNull(GraphQLInt),
                            description: 'The groups position'
                        }
                    })
                })
            )
        }
    },
    resolve: (_, args) => {
        return saveMultipleGroups(args.groups);
    }
}

const deleteMultipeGroupFields: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(DeleteResType),
    description: 'Delete multiple group fields',
    args: {
        page_component_id: { type: GraphQLNonNull(GraphQLID) },
        groups_ids: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteMultipleGroups(args.page_component_id, args.groups_ids);
    }
}

const saveMultipleFieldData: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(ContentTypeDatabaseModel),
    description: 'Save multiple content type fields data',
    args: {
        page_id: { type: GraphQLNonNull(GraphQLID) },
        fields_data: {
            type: GraphQLList(
                new GraphQLInputObjectType({
                    name: 'saveMultipleContentTypeFieldData',
                    description: 'Save multiple content type field data',
                    fields: () => ({
                        page_component_id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Content type field corresponding page component ID'
                        },
                        config_id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Content type field corresponding config ID'
                        },
                        type: {
                            type: GraphQLNonNull(GraphQLString),
                            description: 'Content type field data type'
                        },             
                        value: {
                            type: GraphQLNonNull(GraphQLString),
                            description: 'Content type field value'
                        },             
                        group_id: {
                            type: GraphQLID,
                            description: 'Content type field corresponding group ID'
                        }
                    })
                })
            )
        }
    },
    resolve: (_, args) => {
        return saveMultipleFields(args.page_id, args.fields_data);
    }
}


export const ContentTypeFieldsMutation = new GraphQLObjectType({
    name: 'ContentTypeFieldsMutation',
    description: 'The content type fields base mutation',
    fields: {
        save_multiple_groups: saveMultipleGroupFields,
        delete_multiple_groups: deleteMultipeGroupFields,
        save_multiple_fields: saveMultipleFieldData
    }
})