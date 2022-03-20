import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
import { DeleteResType } from '../shared/type';
import { ContentTypeDatabaseModel, ContentTypeFieldGroupModel } from './type';
import { saveMultipleGroups, deleteMultipleGroups, saveMultipleFields } from './data';
import { __generateErrorString } from '../../functions/shared';


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
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return saveMultipleGroups(args.groups);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'saveMultipleGroupFields'
        })
    }
}

const deleteMultipeGroupFields: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(DeleteResType),
    description: 'Delete multiple group fields',
    args: {
        groups_ids: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return deleteMultipleGroups(args.groups_ids);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteMultipeGroupFields'
        })
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
                            type: GraphQLString,
                            description: 'Content type field value'
                        },             
                        group_id: {
                            type: GraphQLID,
                            description: 'Content type field corresponding group ID'
                        },
                        root: {
                            type: GraphQLNonNull(GraphQLBoolean),
                            description: 'Content type is root'
                        }
                    })
                })
            )
        }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return saveMultipleFields(args.page_id, args.fields_data);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'saveMultipleFieldData'
        })
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