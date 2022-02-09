import { postsController } from '../../../index';
import db from '../../../db';
import { __generateErrorString } from '../../../controller/helper/shared';
import { pageResetHandler } from '../page/data';

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

// Get single by name
export const getSingleByName = async (name: cont_post_postDeclaration["name"]) => {
    try {
        let post_type = await postsController.getSinglePostTypeByName(name);
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
export const saveSingle = async (name: cont_post_postDeclaration["name"], template_path: cont_post_postDeclaration["template_path"], page_id: mod_pageModel["_id"]) => {
    try {
        if(page_id) {
            let checkPage = await db.one('SELECT * FROM pages WHERE _id=$1', page_id);
            if(checkPage.is_homepage) {
                throw __generateErrorString({
                    code: 409,
                    origin: 'postController.saveSingle',
                    message: `The page given is set to the homepage and therefore cannot have a page assigned to it!`
                });
            }
            else {
                let post_type = await postsController.addPostType(name, template_path);
                await db.none('UPDATE pages SET post_type_id=${post_type_id} WHERE _id=${page_id}', {
                    post_type_id: post_type._id,
                    page_id: page_id
                });
                return post_type;
            }
        } 
        else {
            let post_type = await postsController.addPostType(name, template_path);
            return post_type;
        }
    }
    catch(err) {
        throw err;
    }
}