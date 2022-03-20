import { GraphQLFieldConfig, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
// @ts-ignore: Unreachable code error
import { Component, UnregisteredComponentsFieldType } from './type';
import { getSingle, getMultiple, getUnregistered } from './data';
import { __generateErrorString } from '../../functions/shared';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
const getSingleComponent: GraphQLFieldConfig<any, any, any> = {
    type: Component,
    description: 'Get single component',
    args: {
        _id: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getSingle(args._id);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getSingleComponent'
        })
    }
}

// Get multiple components
const getMultipleComponents: GraphQLFieldConfig<any, any, any> = {
    type: GraphQLList(Component),
    description: 'Get mutliple components',
    args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
        skip: { type: GraphQLNonNull(GraphQLInt) }
    },
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getMultiple(args.limit, args.skip);
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getMultipleComponents'
        })
    }
}

// Get unregisterd components and meta data
const getUnregisteredComponentsField: GraphQLFieldConfig<any, any, any> = {
    type: UnregisteredComponentsFieldType,
    description: 'Get unregistered components',
    resolve: (_, args, { jwt_decoded }) => {
        if(jwt_decoded.authorised) {
            return getUnregistered();
        }
        else throw __generateErrorString({
            code: 401,
            message: 'you are not authorised to use this field',
            origin: 'getUnregisteredComponentsField'
        })
    }
}

export const ComponentQuery = new GraphQLObjectType({
    name: 'ComponentQuery',
    description: 'The components base query',
    fields: {
        get_single: getSingleComponent,
        get_multiple: getMultipleComponents,
        get_unregistered: getUnregisteredComponentsField
    }
})