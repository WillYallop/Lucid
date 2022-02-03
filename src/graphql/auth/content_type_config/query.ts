import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import {ComponentContentTypeConfig } from './type';
import { 
    // Content types
    getSingleContentTypeConfig
} from './data';


// ------------------------------------ ------------------------------------
// Content Types
// ------------------------------------ ------------------------------------

// Delete single content type
const getSingleContentType: GraphQLFieldConfig<any, any, any> = {
    type: ComponentContentTypeConfig,
    description: 'Get single content type config',
    args: {
        component_id: { type: GraphQLNonNull(GraphQLID) },
        content_type_id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return getSingleContentTypeConfig(args.component_id, args.content_type_id);
    }
}

// Query handler
export const ContentTypeConfigQuery = new GraphQLObjectType({
    name: 'ContentTypeConfigQuery',
    description: 'The content type config base query',
    fields: {
        get_single: getSingleContentType
    }
})