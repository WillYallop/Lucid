import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType, GraphQLBoolean } from 'graphql';
import { DeleteResType } from '../shared/type';
import { ContentTypeDatabaseModel } from './type';
import { deleteSingleContentTypeField, saveSingleContentTypeField } from './data';

// updatePageComponentField
const addUpdateContentType: GraphQLFieldConfig<any, any, any> = {
    type: ContentTypeDatabaseModel,
    description: 'A list of page component content types',
    args: {
        update: { type: GraphQLNonNull(GraphQLBoolean) },
        page_component_id: { type: GraphQLNonNull(GraphQLID) },
        config_id: { type: GraphQLNonNull(GraphQLID) },
        type: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLNonNull(GraphQLString) },
        group_id: { type: GraphQLID },
        parent_config_id: { type: GraphQLID },
        parent_group_id: { type: GraphQLID }
    },
    resolve: (_, args) => {
        return saveSingleContentTypeField({
            update: args.update,
            page_component_id: args.page_component_id,
            config_id: args.config_id,
            value: args.value,
            group_id: args.group_id,
            parent_config_id: args.parent_config_id,
            parent_group_id: args.parent_group_id,
            type: args.type
        })
    }
}

const deleteContentType: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete a content type field',
    args: {
        page_component_id: { type: GraphQLNonNull(GraphQLID) },
        config_id: { type: GraphQLNonNull(GraphQLID) },
        type: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return deleteSingleContentTypeField({
            page_component_id: args.page_component_id,
            config_id: args.config_id,
            type: args.type
        })
    }
}

export const ContentTypeFieldsMutation = new GraphQLObjectType({
    name: 'ContentTypeFieldsMutation',
    description: 'The content type fields base mutation',
    fields: {
        add_update: addUpdateContentType,
        delete: deleteContentType
    }
})