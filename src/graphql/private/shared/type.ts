import {GraphQLBoolean, GraphQLNonNull, GraphQLObjectType} from 'graphql';

// Delete object type
export const DeleteResType = new GraphQLObjectType({
    name: 'DeleteRes',
    description: 'Delete entry resposne',
    fields: () => ({
        deleted: {
            type: GraphQLNonNull(GraphQLBoolean),
            description: 'Returns the state of the delete action'
        },
    })
});