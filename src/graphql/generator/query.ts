import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { GeneratePreviewPageComponentsInputModel, GeneratorPreviewMarkupOutputModel, GeneratorSiteOutputModel } from './type';
// Generator
import generator from '../../generator';
import { __generateErrorString } from '../../functions/shared';


// Get multiple pages
const genPreview: GraphQLFieldConfig<any, any, any> = {
    type: GeneratorPreviewMarkupOutputModel,
    description: 'Get multiple pages',
    args: {
        data_mode: { type: GraphQLNonNull(GraphQLString) },
        template: { type: GraphQLString },
        page_id: { type: GraphQLNonNull(GraphQLID) },
        page_components: { type: GraphQLNonNull(GraphQLList(GeneratePreviewPageComponentsInputModel)) },
        location: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args, { jwt_decoded })  => {
        if(jwt_decoded.authorised) {
            return await generator('preview', {
                data_mode: args.data_mode,
                template: args.template,
                page_id: args.page_id,
                page_components: args.page_components,
                location: args.location
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'genPreview'
        })
    }
}

const genSite: GraphQLFieldConfig<any, any, any> = {
    type: GeneratorSiteOutputModel,
    description: GeneratorSiteOutputModel.description,
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await generator('site');
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'genSite'
        })
    }
}

export const GeneratorQuery = new GraphQLObjectType({
    name: 'GeneratorQuery',
    description: 'The generator base query',
    fields: {
        preview: genPreview,
        site: genSite
    }
})