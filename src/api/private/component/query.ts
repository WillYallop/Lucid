import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { component } from './Type';
import { getSingle, getMultiple } from './data';

// Get single component
const getSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: component,
    description: component.description,
    args: {
        id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return getSingle(args.id);
    }
}

// Get multiple components
const getMultipleComponents: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(component),
    description: component.description,
    args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
        skip: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args) => {
        return getMultiple(args.limit, args.skip);
    }
}

export const componentQuery = new GraphQLObjectType({
    name: 'ComponentQuery',
    description: 'The components base query',
    fields: {
        getSingle: getSingleComponent,
        getMultiple: getMultipleComponents
    }
})