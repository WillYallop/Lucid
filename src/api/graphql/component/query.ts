import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { component } from './Type';
import { getSingle } from './data';

const getSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: component,
    description: component.description,
    args: {
        id: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return getSingle(args.id)
    }
}

export const componentQuery = new GraphQLObjectType({
    name: 'ComponentQuery',
    description: 'The components base query',
    fields: {
        getSingle: getSingleComponent
    }
})