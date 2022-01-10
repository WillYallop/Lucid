import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType } from 'graphql';
import { DeleteResType } from '../shared/type';
import { ContentTypeDatabaseModel } from './type';
import { updateSingleContentType, deleteSingleContentType } from './data';

// updatePageComponentField
const updateContentType: GraphQLFieldConfig<any, any, any> = {
    type: ContentTypeDatabaseModel,
    description: 'A list of page component content types',
    args: {
        page_component_id: { type: GraphQLNonNull(GraphQLID) },
        config_id: { type: GraphQLNonNull(GraphQLID) },
        type: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return updateSingleContentType({
            page_component_id: args.page_component_id,
            config_id: args.config_id,
            value: args.value,
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
        return deleteSingleContentType({
            page_component_id: args.page_component_id,
            config_id: args.config_id,
            type: args.type
        })
    }
}

export const ContentTypeMutation = new GraphQLObjectType({
    name: 'ContentTypeMutation',
    description: 'The content type base mutation',
    fields: {
        update_content_type: updateContentType,
        delete_content_type: deleteContentType
    }
})