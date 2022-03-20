import {GraphQLObjectType, GraphQLSchema} from 'graphql';

// Authentication
import { AuthenticationQuery } from './authentication/query';
// Components
import { ComponentQuery } from './component/query';
import { ComponentMutation } from './component/mutation';
// Post Types
import { PostQuery } from './posts/query';
import { PostMutation } from './posts/mutation';
// Page
import { PageQuery } from './page/query';
import { PageMutation } from './page/mutation';
// Page SEO
import { SEOMutation } from './seo/mutation';
// Menu 
import { MenuQuery } from './menu/query';
import { MenuMutation } from './menu/mutation';
// Content Type Config
import { ContentTypeConfigMutation } from './content_type_config/mutation';
import { ContentTypeConfigQuery } from './content_type_config/query';
// Content Type Fields
import { ContentTypeFieldsMutation } from './content_type_fields/mutation';
// Page Component
import { PageComponentMutation } from './page_component/mutation';
import { PageComponentQuery } from './page_component/query';
// Utility
import { UtilityQuery } from './utility/query';
// Templates
import { TemplateQuery } from './template/query';
// Generator
import { GeneratorQuery } from './generator/query';


const baseQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        authentication: {
            type: AuthenticationQuery,
            description: AuthenticationQuery.description,
            resolve: () => { return {} }
        },
        components: {
            type: ComponentQuery,
            description: ComponentQuery.description,
            resolve: () => { return {} }
        },
        post: {
            type: PostQuery,
            description: PostQuery.description,
            resolve: () => { return {} }
        },
        page: {
            type: PageQuery,
            description: PageQuery.description,
            resolve: () => { return {} }
        },
        menu: {
            type: MenuQuery,
            description: MenuQuery.description,
            resolve: () => { return {} }
        },
        utility: {
            type: UtilityQuery,
            description: UtilityQuery.description,
            resolve: () => { return {} }
        },
        content_type_config: {
            type: ContentTypeConfigQuery,
            description: ContentTypeConfigQuery.description,
            resolve: () => { return {} }
        },
        template: {
            type: TemplateQuery,
            description: TemplateQuery.description,
            resolve: () => { return {} }
        },
        page_components: {
            type: PageComponentQuery,
            description: PageComponentQuery.description,
            resolve: () => { return {} }
        },
        generator: {
            type: GeneratorQuery,
            description: GeneratorQuery.description,
            resolve: () => { return {} }
        }
    }
});

const baseMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The base mutation',
    fields: {
        components: {
            type: ComponentMutation,
            description: ComponentMutation.description,
            resolve: () => { return {} }
        },
        post: {
            type: PostMutation, 
            description: PostMutation.description,
            resolve: () => { return {} }
        },
        page: {
            type: PageMutation,
            description: PageMutation.description,
            resolve: () => { return {} }
        },
        seo: {
            type: SEOMutation,
            description: SEOMutation.description,
            resolve: () => { return {} }
        },
        content_type_config: {
            type: ContentTypeConfigMutation,
            description: ContentTypeConfigMutation.description,
            resolve: () => { return {} }
        },
        content_type_field: {
            type: ContentTypeFieldsMutation,
            description: ContentTypeFieldsMutation.description,
            resolve: () => { return {} }
        },
        page_components: {
            type: PageComponentMutation,
            description: PageComponentMutation.description,
            resolve: () => { return {} }
        },
        menu: {
            type: MenuMutation,
            description: MenuMutation.description,
            resolve: () => { return {} }
        }
    }
});


export const lucidSchema = new GraphQLSchema({
    query: baseQuery,
    mutation: baseMutation
});