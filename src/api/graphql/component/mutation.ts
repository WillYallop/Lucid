import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { componentDelete, component } from './Type';
import { deleteSingle, saveSingle } from './data';

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

const saveSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: component,
    description: 'Save single component',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        file_path: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString }
    },
    resolve: (_, args) => {
        return saveSingle(args)
    }
}


export const componentMutation = new GraphQLObjectType({
    name: 'ComponentMutation',
    description: 'The components base query',
    fields: {
        deleteSingle: deleteSingleComponent,
        saveSingle: saveSingleComponent
    }
})