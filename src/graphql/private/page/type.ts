
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ContentTypeDatabase, ContentTypeConfig } from '../shared/type';

// Page
export const Page = new GraphQLObjectType({
    name: 'PageModel',
    description: 'The page model',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The unique page id'
        },
        template: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The pages corresponding template'
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The pages slug'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The name of the page'
        },
        seo: {
            type: PageSeoObject,
            description: PageSeoObject.description
        },
        components: {
            type: GraphQLList(PageComponent),
            description: 'List of component data'
        }
    })
});

// Page Component
export const PageComponent = new GraphQLObjectType({
    name: 'PageComponentsModel',
    description: 'The pages component model',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique component id'
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
        },
        content_types: {
            type: GraphQLList(ComponentContentType),
            description: 'A list of field IDs'
        }
    })
})

// Page component content_type
export const ComponentContentType = new GraphQLObjectType({
    name: 'PageComponentContentTypeModel',
    description: 'The pages component content type model',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Component content type database ID'
        },
        config_id: {
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
        data: {
            type: GraphQLNonNull(ContentTypeDatabase),
            description: 'Component content type data'
        }
    })
})



// Page SEO
export const PageSeoObject = new GraphQLObjectType({
    name:'PageSEOModel',
    description: 'The page SEO model',
    fields: () => ({
        title: { 
            type: GraphQLString,
            description: 'Page SEO title'
        },
        description: { 
            type: GraphQLString,
            description: 'Page SEO description'
        }
    })
})