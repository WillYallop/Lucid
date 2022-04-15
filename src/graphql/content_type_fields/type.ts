import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from 'graphql';

//  Component content_type
export const ContentTypeDatabaseModel = new GraphQLObjectType({
    name: 'ContentTypeDatabaseModel',
    description: 'Content type database model',
    fields: () => ({
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type id'
        },
        config_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type config id'
        },
        root: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Content type is root'
        },
        value: {
            type: GraphQLString,
            description: 'Content type value'
        },
        group_id: {
            type: GraphQLID,
            description: 'Content type group ID'
        }
    })
});

// Content type field group
export const ContentTypeFieldGroupModel = new GraphQLObjectType({
    name: 'ContentTypeFieldGroupModel',
    description: 'Content type groups database model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The group ID'
        },
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page component it belongs to'
        },
        parent_group: {
            type: GraphQLID,
            description: 'The parent group id, if it has one'
        },
        parent_config_id: {
            type: GraphQLID,
            description: 'The groups parent content type config id'
        },
        position: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'The groups position'
        }
    })
});



//  Component content_type input
export const ContentTypeDatabaseInputModel = new GraphQLInputObjectType({
    name: 'ContentTypeDatabaseInputModel',
    description: 'Content type database model',
    fields: () => ({
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type id'
        },
        config_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'Content type config id'
        },
        root: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Content type is root'
        },
        value: {
            type: GraphQLString,
            description: 'Content type value'
        },
        group_id: {
            type: GraphQLID,
            description: 'Content type group ID'
        }
    })
});

// Content type field group
export const ContentTypeFieldGroupInputModel = new GraphQLInputObjectType({
    name: 'ContentTypeFieldGrouInputpModel',
    description: 'Content type groups database model',
    fields: () => ({
        _id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The group ID'
        },
        page_component_id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The page component it belongs to'
        },
        parent_group: {
            type: GraphQLID,
            description: 'The parent group id, if it has one'
        },
        parent_config_id: {
            type: GraphQLID,
            description: 'The groups parent content type config id'
        },
        position: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'The groups position'
        }
    })
});