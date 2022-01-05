import { postsController } from 'lucid-core';

// Get single post
export const getSingle = async (_id: cont_post_postDeclaration["_id"]) => {
    let res = await postsController.getSinglePostType(_id);
    if(res.found) return res.post_type;
    else throw res.errors[0].message;
}

// Get multiple posts
export const getMultiple = async (limit?: number, skip?: number, all?: boolean) => {
    let res = await postsController.getMultiplePostTypes(limit, skip, all);
    if(res.success) return res.post_types;
    else throw res.errors[0].message;
}

// Delete single post
export const deleteSingle = async (_id: cont_post_postDeclaration["_id"]) => {
    let res = await postsController.removePostType(_id);
    if(res.deleted) {
        return {
            deleted: res.deleted
        }
    } else throw res.errors[0].message;
}

// Save single post
export const saveSingle = async (name: cont_post_postDeclaration["name"], template_name: cont_post_postDeclaration["template_name"]) => {
    let res = await postsController.addPostType(name, template_name);
    if(res.saved) return res.post_type;
    else throw res.errors[0].message;
}