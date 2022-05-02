import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
import { DeleteResType } from '../shared/type';
import { MediaDatabaseModel } from './type';
import { updateSingleMedia, deleteSingleMedia } from './data';
import { __generateErrorString } from '../../functions/shared';


const updateSingleMediaRoute: GraphQLFieldConfig<any, any, any> = {
    type: MediaDatabaseModel,
    description: 'Update single media doc',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        alt: { type: GraphQLString }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await updateSingleMedia(args._id, {
                alt: args.alt,
                title: args.title
            });
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'updateSingleMediaRoute'
        })
    }
}

const deleteSingleMediaRoute: GraphQLFieldConfig<any, any, any> = {
    type: DeleteResType,
    description: 'Delete single media doc',
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await deleteSingleMedia(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'deleteSingleMediaRoute'
        })
    }
}

export const MediaMutations = new GraphQLObjectType({
    name: 'MediaMutations',
    description: 'The media fields base mutation',
    fields: {
        update_single: updateSingleMediaRoute,
        delete_single: deleteSingleMediaRoute
    }
})