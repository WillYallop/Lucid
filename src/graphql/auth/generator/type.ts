
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql';
import { ContentTypeFieldGroupInputModel, ContentTypeDatabaseInputModel } from '../content_type_fields/type';

// ---------------
// -- Outputs ----
// ---------------
export const GeneratorPreviewMarkupOutputModel = new GraphQLObjectType({
    name: 'GeneratorPreviewMarkupOutputModel',
    description: 'Generator preview markup output model',
    fields: () => ({
        template: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The page template markup'
        },
        components: {
            type: GraphQLList(GeneratorPreviewMarkupOutputComponentsModel),
            description: GeneratorPreviewMarkupOutputComponentsModel.description
        }
    })
});
export const GeneratorPreviewMarkupOutputComponentsModel = new GraphQLObjectType({
    name: 'GeneratorPreviewMarkupOutputComponentsModel',
    description: 'Generator preview markup output components model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The components _id'
        },
        markup: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The components markup'
        },
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The components corresponding page ID'
        }
    })
});




// ---------------
// -- Inputs -----
// ---------------

export const GeneratePreviewPageComponentsInputModel = new GraphQLInputObjectType({
    name: 'GeneratePreviewPageComponentsInputModel',
    description: 'Generate preview page components input',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Page component ID'
        },
        component: {
            type: GraphQLNonNull(GeneratePreviewPageComponentsComponentInputModel),
            description: GeneratePreviewPageComponentsComponentInputModel.description
        },
        groups: {
            type: GraphQLList(ContentTypeFieldGroupInputModel),
            description: ContentTypeFieldGroupInputModel.description
        },
        data: {
            type: GraphQLList(ContentTypeDatabaseInputModel),
            description: ContentTypeDatabaseInputModel.description
        }
    })
});


export const GeneratePreviewPageComponentsComponentInputModel = new GraphQLInputObjectType({
    name: 'GeneratePreviewPageComponentsComponentInputModel',
    description: 'Generate preview page components, component input',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The components id'
        },
        file_path: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The components file path'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The components name'
        }
    })
});
