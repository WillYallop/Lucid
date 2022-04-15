import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
// @ts-ignore: Unreachable code error
import { getAll } from './data';
import { __generateErrorString } from '../../functions/shared';

// Get single post type
const getAllTemplates: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(GraphQLString),
    description: 'Get all templates post',
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await getAll();
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getAllTemplates'
        })
    }
}

export const TemplateQuery = new GraphQLObjectType({
    name: 'TemplateQuery',
    description: 'The tempalte base query',
    fields: {
        get_all: getAllTemplates
    }
})