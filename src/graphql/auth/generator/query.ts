import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } from 'graphql';
// @ts-ignore: Unreachable code error
import { GeneratePreviewPageComponentsInputModel, GeneratorPreviewMarkupOutputModel, GeneratorSiteOutputModel } from './type';
// Generator
import generator from '../../../generator';


// Get multiple pages
const genPreview: GraphQLFieldConfig<any, any, any> = {
    type: GeneratorPreviewMarkupOutputModel,
    description: 'Get multiple pages',
    args: {
        data_mode: { type: GraphQLNonNull(GraphQLString) },
        template: { type: GraphQLString },
        page_id: { type: GraphQLNonNull(GraphQLID) },
        page_components: { type: GraphQLNonNull(GraphQLList(GeneratePreviewPageComponentsInputModel)) }
    },
    resolve: (_, args)  => {
        return generator('preview', {
            data_mode: args.data_mode,
            template: args.template,
            page_id: args.page_id,
            page_components: args.page_components
        });
    }
}

const genSite: GraphQLFieldConfig<any, any, any> = {
    type: GeneratorSiteOutputModel,
    description: GeneratorSiteOutputModel.description,
    resolve: () => {
        return generator('site');
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