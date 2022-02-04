import { postsController } from '../../../index';

// Get single post
export const getSingle = async (_id: cont_post_postDeclaration["_id"]) => {
    try {
        let post_type = await postsController.getSinglePostType(_id);
        return post_type;
    }
    catch(err) {
        throw err;
    }
}

// Get multiple posts
export const getMultiple = async (limit?: number, skip?: number, all?: boolean) => {
    try {
        let post_types = await postsController.getMultiplePostTypes(limit, skip, all);
        return post_types;
    }
    catch(err) {
        throw err;
    }
}

// Delete single post
export const deleteSingle = async (_id: cont_post_postDeclaration["_id"]) => {
    try {
        await postsController.removePostType(_id);
        return true;
    }
    catch(err) {
        throw err;
    }

}

// Save single post
export const saveSingle = async (name: cont_post_postDeclaration["name"], template_path: cont_post_postDeclaration["template_path"]) => {
    try {
        let post_type = await postsController.addPostType(name, template_path);
        return post_type;
    }
    catch(err) {
        throw err;
    }
}