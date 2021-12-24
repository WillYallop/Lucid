import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { Page } from './Type';
import { DeleteResType } from '../shared/types/type';
import { deleteSingle, saveSingle, updateSingle } from './data';

// Get single component
const deleteSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete page',
    args: {
        
    },
    resolve: (_, args) => {
        return deleteSingle();
    }
}

const saveSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Save single page',
    args: {

    },
    resolve: (_, args) => {
        return saveSingle();
    }
}

const updateSinglePage: GraphQLFieldConfig<any, any, any> = {
    type: Page,
    description: 'Update single page',
    args: {

    },
    resolve: (_, args) => {
        return updateSingle();
    }
}

export const PageMutation = new GraphQLObjectType({
    name: 'PageMutation',
    description: 'The page base mutation',
    fields: {
        deleteSingle: deleteSinglePage,
        saveSingle: saveSinglePage,
        updateSingle: updateSinglePage
    }
})