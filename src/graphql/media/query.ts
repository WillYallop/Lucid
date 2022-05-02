import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } from 'graphql';
import { MediaDatabaseModel } from './type';
import { getSingleMedia, getMultipleMediaDocs } from './data';
import { __generateErrorString } from '../../functions/shared';


const getSingleMediaDocRoute: GraphQLFieldConfig<any, any, any> = {
    type: MediaDatabaseModel,
    description: MediaDatabaseModel.description,
    args: {
        _id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await getSingleMedia(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getSingleMediaDocRoute'
        })
    }
}

const getMultipleMediaDocRoute: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(MediaDatabaseModel),
    description: MediaDatabaseModel.description,
    args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
        skip: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return await getMultipleMediaDocs(args.limit, args.skip);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getMultipleMediaDocRoute'
        })
    }
}

export const MediaQuery = new GraphQLObjectType({
    name: 'MediaQuery',
    description: 'The media base query',
    fields: {
        get_single: getSingleMediaDocRoute,
        get_multiple: getMultipleMediaDocRoute
    }
})