import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Component, ComponentContentTypeConfig } from './type';
import { DeleteResType, ContentTypeConfigArgs } from '../shared/type';
import { 
    // Components
    deleteSingle, 
    saveSingle, 
    updateSingle,
    // Content types
    deleteSingleContentType,
    createSingleContentType,
    updateSingleContentType
} from './data';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
const deleteSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteSingle(args._id);
    }
}

const saveSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: Component,
    description: 'Save single component',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        file_path: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return saveSingle(args)
    }
}

const updateSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: Component,
    description: 'Update single component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        preview_url: { type: GraphQLString },
        fields: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args) => {
        let updateObj: cont_comp_updateSingleInp = {};
        // Build out the validate object
        for (const [key, value] of Object.entries(args)) {
            // @ts-ignore: Unreachable code error
            if(key != '_id') updateObj[key] = value;
        }
        return updateSingle(args._id, updateObj);
    }
}

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
    resolve: (_, args) => {
        return deleteSingleContentType(args.component_id, args.content_type_id);
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
                        }
                    })
                })
            )
        }
    },
    resolve: (_, args) => {
        return createSingleContentType(args.component_id, args.content_type);
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
                        }
                    })
                })
            )
        },
        repeaterField: { type: GraphQLNonNull(GraphQLBoolean) },
        repeaterID: { type: GraphQLID }
    },
    resolve: (_, args) => {
        return updateSingleContentType(args.component_id, args.content_type, args.repeaterField, args.repeaterID);
    }
}



// Mutation handler
export const ComponentMutation = new GraphQLObjectType({
    name: 'ComponentMutation',
    description: 'The components base mutation',
    fields: {
        deleteSingle: deleteSingleComponent,
        saveSingle: saveSingleComponent,
        updateSingle: updateSingleComponent,

        deleteContentType: deleteContentType,
        createContentType: createContentType,
        updateContentType: updateContentType
    }
})