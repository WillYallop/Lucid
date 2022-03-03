
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { SEOObjectType } from '../seo/type';
import { PageComponent } from '../page_component/type';

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
            type: SEOObjectType,
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
        post_type_id: {
            type: GraphQLID,
            description: 'Assigned if the page has a post type'
        },
        page_components: {
            type: GraphQLList(PageComponent),
            description: PageComponent.description
        }
    })
});




// Multiple Pages
export const MultiplePages = new GraphQLObjectType({
    name: 'MultiplePagesModel',
    description: 'The multiple pages model',
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
        post_type_id: {
            type: GraphQLID,
            description: 'Assigned if the page has a post type'
        }
    })
})

// Page Serach type
export const PageSearchRes = new GraphQLObjectType({
    name: 'PageSearchResModal',
    description: 'The page search res model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The unique page _id'
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The pages slug'
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The name of the page'
        }
    })
})

// Basic page type
export const BasicPage = new GraphQLObjectType({
    name: 'BasicPageModal',
    description: 'The basic page model',
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
        post_type_id: {
            type: GraphQLID,
            description: 'Assigned if the page has a post type'
        }
    })
});