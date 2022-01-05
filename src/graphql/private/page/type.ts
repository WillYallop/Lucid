
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ContentTypeConfig } from '../shared/type';
import { SEOObjectType } from '../seo/type';

// Page
export const Page = new GraphQLObjectType({
    name: 'PageModel',
    description: 'The page model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique page _id'
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
            type: GraphQLNonNull(SEOObjectType),
            description: SEOObjectType.description
        },
        type: {
            type: GraphQLNonNull(GraphQLString),
            description: 'Either page or post'
        },
        post_name: {
            type: GraphQLString,
            description: 'The name of the pages post type'
        },
        has_parent: {
            type: GraphQLBoolean,
            description: 'Whether the page has a parent or not'
        },
        parent_id: {
            type: GraphQLString,
            description: 'The ID its its parents page'
        },
        date_created: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The date the page was created'
        },
        last_edited: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The date the page was last edited'
        },
        author: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The author of the page'
        },
        is_homepage: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Whether this is the homepage'
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
        },
        content_types: {
            type: GraphQLList(ComponentContentType),
            description: 'A list of content types config and their corresponding page data'
        }
    })
})

// Page component content_type
export const ComponentContentType = new GraphQLObjectType({
    name: 'PageComponentContentTypeModel',
    description: 'The pages component content type model',
    fields: () => ({
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
            type: GraphQLNonNull(GraphQLString),
            description: 'Component content type data'
        }
    })
})