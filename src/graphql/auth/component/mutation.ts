import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
// @ts-ignore: Unreachable code error
import { Component } from './type';
import { DeleteResType } from '../shared/type';
import { 
    // Components
    deleteSingle, 
    saveSingle, 
    updateSingle
} from './data';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
const deleteSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
        return deleteSingle(args._id);
    }
}

const saveSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: Component,
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
    type: Component,
    description: 'Update single component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        preview_url: { type: GraphQLString },
        fields: { type: GraphQLList(GraphQLID) }
    },
    resolve: (_, args) => {
        let updateObj: cont_comp_updateSingleInp = {};
        // Build out the validate object
        for (const [key, value] of Object.entries(args)) {
            // @ts-ignore: Unreachable code error
            if(key != '_id') updateObj[key] = value;
        }
        return updateSingle(args._id, updateObj);
    }
}



// Mutation handler
export const ComponentMutation = new GraphQLObjectType({
    name: 'ComponentMutation',
    description: 'The components base mutation',
    fields: {
        delete_single: deleteSingleComponent,
        save_single: saveSingleComponent,
        update_single: updateSingleComponent
    }
})