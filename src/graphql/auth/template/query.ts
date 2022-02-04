import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
// @ts-ignore: Unreachable code error
import { getAll } from './data';

// Get single post type
const getAllTemplates: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(GraphQLString),
    description: 'Get all templates post',
    resolve: () => {
        return getAll();
    }
}

export const TemplateQuery = new GraphQLObjectType({
    name: 'TemplateQuery',
    description: 'The tempalte base query',
    fields: {
        get_all: getAllTemplates
    }
})