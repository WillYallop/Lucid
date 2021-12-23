import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { componentDelete } from './Type';
import { deleteSingle } from './data';

// Get single component
const deleteSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: componentDelete,
    description: componentDelete.description,
    args: {
        id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args) => {
        return deleteSingle(args.id);
    }
}

export const componentMutation = new GraphQLObjectType({
    name: 'ComponentMutation',
    description: 'The components base query',
    fields: {
        deleteSingle: deleteSingleComponent
    }
})