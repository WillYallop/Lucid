import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { Page } from './Type';
import { DeleteResType } from '../shared/type';
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
        template: { type: GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLString) },
        post_name: { type: GraphQLString },
        has_parent: { type: GraphQLNonNull(GraphQLBoolean) },
        parent_id: { type: GraphQLString },
        author: { type: GraphQLNonNull(GraphQLString) },
        is_homepage: { type: GraphQLNonNull(GraphQLBoolean) }
    },
    resolve: (_, args) => {
        return saveSingle(args);
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