import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { component } from './Type';
import { deleteResType } from '../shared/type';
import { deleteSingle, saveSingle, updateSingle } from './data';

// Get single component
const deleteSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: deleteResType,
    description: 'Delete component',
    args: {
        id: { type: GraphQLNonNull(GraphQLID) }
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

const updateSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: component,
    description: 'Update single component',
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        preview_url: { type: GraphQLString },
        fields: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args) => {
        let updateObj: cont_comp_updateSingleInp = {};
        // Build out the validate object
        for (const [key, value] of Object.entries(args)) {
            if(key != 'id') updateObj[key] = value;
        }
        return updateSingle(args.id, updateObj);
    }
}

export const componentMutation = new GraphQLObjectType({
    name: 'ComponentMutation',
    description: 'The components base mutation',
    fields: {
        deleteSingle: deleteSingleComponent,
        saveSingle: saveSingleComponent,
        updateSingle: updateSingleComponent
    }
})