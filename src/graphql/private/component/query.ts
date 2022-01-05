import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { Component, ComponentContentType } from './Type';
import { getSingle, getMultiple } from './data';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
const getSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: Component,
    description: 'Get single component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args._id);
    }
}

// Get multiple components
const getMultipleComponents: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(Component),
    description: 'Get mutliple components',
    args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
        skip: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args) => {
        return getMultiple(args.limit, args.skip);
    }
}

export const ComponentQuery = new GraphQLObjectType({
    name: 'ComponentQuery',
    description: 'The components base query',
    fields: {
        getSingle: getSingleComponent,
        getMultiple: getMultipleComponents
    }
})