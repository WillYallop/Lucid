import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType } from 'graphql';
import { component } from './Type';
import { getComponents } from './data';

const listComponents: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(component),
    description: component.description,
    resolve: () => {
        return getComponents()
    }
}

export const componentQuery = new GraphQLObjectType({
    name: 'ComponentQuery',
    description: 'The components base query',
    fields: {
        list: listComponents
    }
})