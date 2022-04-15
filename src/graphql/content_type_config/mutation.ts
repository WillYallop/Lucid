import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import {ComponentContentTypeConfig, ContentTypeConfigArgs } from './type';
import { DeleteResType } from '../shared/type';
import { 
    // Content types
    deleteSingleContentTypeConfig,
    createSingleContentTypeConfig,
    updateSingleContentTypeConfig
} from './data';
import { __generateErrorString } from '../../functions/shared';


// ------------------------------------ ------------------------------------
// Content Types
// ------------------------------------ ------------------------------------

// Delete single content type
const deleteContentType: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete single content type',
    args: {
        component_id: { type: GraphQLNonNull(GraphQLID) },
        content_type_id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteSingleContentTypeConfig(args.component_id, args.content_type_id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteContentType'
        })
    }
}


// Create single content type
const createContentType: GraphQLFieldConfig<any, any, any> = {
    type: ComponentContentTypeConfig,
    description: 'Create single content type',
    args: {
        component_id: { type: GraphQLNonNull(GraphQLID) },
        content_type: { 
            type: GraphQLNonNull(
                new GraphQLInputObjectType({
                    name: 'CreateContentTypeArgs',
                    description: 'Component create content type args model',
                    fields: () => ({
                        name: {
                            type: GraphQLNonNull(GraphQLString),
                            description: 'Component content type name'
                        },
                        type: {
                            type: GraphQLNonNull(GraphQLString),
                            description: 'Component content type type'
                        },
                        config: {
                            type: GraphQLNonNull(ContentTypeConfigArgs), 
                            description: 'Component content type config'
                        },
                        parent: {
                            type: GraphQLString,
                            description: 'Components content type parent'
                        }
                    })
                })
            )
        }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await createSingleContentTypeConfig(args.component_id, args.content_type);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'createContentType'
        })
    }
}

// Update single content type
const updateContentType: GraphQLFieldConfig<any, any, any> = {
    type: ComponentContentTypeConfig,
    description: 'Update single content type',
    args: {
        component_id: { type: GraphQLNonNull(GraphQLID) },
        content_type: {
            type: GraphQLNonNull(
                new GraphQLInputObjectType({
                    name: 'UpdateContentTypeArgs',
                    description: 'Component update content type args model',
                    fields: () => ({
                        _id: {
                            type: GraphQLNonNull(GraphQLID),
                            description: 'Component content type ID'
                        },
                        name: {
                            type: GraphQLString,
                            description: 'Component content type name'
                        },
                        type: {
                            type: GraphQLString,
                            description: 'Component content type type'
                        },
                        config: {
                            type: ContentTypeConfigArgs, 
                            description: 'Component content type config'
                        },
                        parent: {
                            type: GraphQLString,
                            description: 'Components content type parent'
                        }
                    })
                })
            )
        }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateSingleContentTypeConfig(args.component_id, args.content_type);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateContentType'
        })
    }
}



// Mutation handler
export const ContentTypeConfigMutation = new GraphQLObjectType({
    name: 'ContentTypeConfigMutation',
    description: 'The content type config base mutation',
    fields: {
        delete_single: deleteContentType,
        create_single: createContentType,
        update_single: updateContentType
    }
})