
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType,GraphQLList, GraphQLString  } from 'graphql';
import { ContentTypeConfig } from '../content_type_config/type';
import { ContentTypeFieldGroupModel, ContentTypeDatabaseModel } from '../content_type_fields/type';

// Page Component
export const PageComponentBaseModel = new GraphQLObjectType({
    name: 'PageComponentBaseModel',
    description: 'The page_components table row model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page component id- refers to the page components table _id'
        },
        page_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique page id'
        },
        component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique component - refers to the theme config component _id'
        },
        position: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'The components position on the page'
        }
    })
});

export const PageComponent = new GraphQLObjectType({
    name: 'PageComponentsModel',
    description: 'The pages component model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page_components schema ID'
        },
        page_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page schema ID'
        },
        component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The component schema ID'
        },
        position: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'The page_component postion'
        },
        component: {
            type: GraphQLNonNull(PageComponentType),
            description: PageComponentType.description
        },
        content_types: {
            type: GraphQLList(ComponentContentType),
            description: ComponentContentType.description
        },
        data: {
            type: GraphQLList(ContentTypeDatabaseModel), 
            description: ContentTypeDatabaseModel.description
        },
        groups: {
            type: GraphQLList(ContentTypeFieldGroupModel),
            description: ContentTypeFieldGroupModel.description
        }
    })
})

export const PageComponentType = new GraphQLObjectType({
    name: 'PageComponentType',
    description: 'The component model for page',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique component _id'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component name'
        },
        file_name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component file_name'
        },
        file_path: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The path to the component'
        },
        description: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component description'
        },
        preview_url: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component preview_url'
        },
        date_added: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component date_added'
        },
        date_modified: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The component date_modified'
        }
    })
});

// Page component content_type
export const ComponentContentType = new GraphQLObjectType({
    name: 'PageComponentContentTypeModel',
    description: 'The pages component content type model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Component content type config ID'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type name'
        },
        type: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type type'
        },
        config: {
            type: GraphQLNonNull(ContentTypeConfig),
            description: 'Component content type config'
        },
        parent: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type parent'
        }
    })
})