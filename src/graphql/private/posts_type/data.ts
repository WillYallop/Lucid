import { postsController } from 'lucid-core';

export const getSingle = async (id: cont_post_postDeclaration["id"]) => {
    let res = await postsController.getSinglePostType(id);
    if(res.found) return res.post_type;
    else throw res.errors[0].message;
}

export const getMultiple = async (limit?: number, skip?: number, all?: boolean) => {
    let res = await postsController.getMultiplePostTypes(limit, skip, all);
    if(res.success) return res.post_types;
    else throw res.errors[0].message;
}