/*

This controller is in charge of handling the theme/config/posts.json file.

This file is responsible for adding custom post types such as blogs, or projects for example.
These are similar to a standard page, but they all share the same template file, and are also queryable through the API.
 
Example posts.json file:

[
    {
        "name": "blogs",
        "template_path": "page.liquid"
    },
    {
        "name": "jobs",
        "template_path": "page.liquid"
    }
]

*/

import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __convertStringLowerUnderscore, __generateErrorString } from './helper/shared';


// ------------------------------------ ------------------------------------
// add new post type entry
// ------------------------------------ ------------------------------------
const addPostType = async (name: cont_post_postDeclaration["name"], template_path: cont_post_postDeclaration["template_path"]): Promise<cont_post_postDeclaration> => {
    try {
        const origin = 'postsController.addPostType';
        // Make sure entry doesnt already exist with same name
        // Verify the template_path exists in the theme/templates directory will always end in a .liquid
        await validate([
            {
                method: 'post_name',
                value: __convertStringLowerUnderscore(name)
            },
            {
                method: 'temp_verifyFileExists',
                value: template_path
            },
            {
                method: 'file_isLiquidExtension',
                value: template_path
            }
        ]);
        // Get theme/config/posts.json file
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check to see if the post wanting to be added exists:
        let findPost = postsData.findIndex( x => x.name === __convertStringLowerUnderscore(name));
        if(findPost === -1) {
            // If there is no entry add one
            let postObj: cont_post_postDeclaration = {
                _id: uuidv1(),
                name: __convertStringLowerUnderscore(name),
                template_path: template_path
            };
            postsData.push(postObj);
            await writeSingleFile('/config/posts.json', 'json', postsData);
            return postObj
        }
        else {
            throw __generateErrorString({
                code: 403,
                origin: origin,
                message: `Post with the name: "${__convertStringLowerUnderscore(name)}" already exists!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// remove single post type entry
// ------------------------------------ ------------------------------------
const removePostType = async (_id: cont_post_postDeclaration["_id"]) => {
    try {
        const origin = 'postsController.removePostType';
        // Validate the ID
        await validate([
            {
                method: 'uuidVerify',
                value: _id
            }
        ]);
        // Get post data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check if it exists and get index
        let postIndex = postsData.findIndex( x => x._id === _id );
        if(postIndex != -1) {
            // Remove from array and write
            postsData.splice(postIndex, 1);
            await writeSingleFile('/config/posts.json', 'json', postsData);
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot delete post with ID: "${_id}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get single post type entry
// ------------------------------------ ------------------------------------
const getSinglePostType = async (_id: cont_post_postDeclaration["_id"]): Promise<cont_post_postDeclaration> => {
    try {
        const origin = 'postsController.getSinglePostType';
        // Validate the ID
        await validate([
            {
                method: 'uuidVerify',
                value: _id
            }
        ]);
        // Get post data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check if it exists and get it
        let post = postsData.find( x => x._id === _id );
        if(post != undefined) {
            return post
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot get post with ID: "${_id}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get single post type entry by its name
// ------------------------------------ ------------------------------------
const getSinglePostTypeByName = async (name: cont_post_postDeclaration["name"]): Promise<cont_post_postDeclaration> => {
    try {
        const origin = 'postsController.getSinglePostTypeByName';
        // Get post data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check if it exists and get it
        let post = postsData.find( x => x.name === name );
        if(post != undefined) {
            return post
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot get post with name: "${name}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}


// ------------------------------------ ------------------------------------
// get multiple post types entries
// ------------------------------------ ------------------------------------
const getMultiplePostTypes = async (limit?: number, skip?: number, all?: boolean): Promise<Array<cont_post_postDeclaration>> => {
    try {
        const origin = 'postsController.getMultiplePostTypes';
        // Get component data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        if(all) {
            return postsData;
        } 
        else {
            if(typeof limit != 'number' && typeof skip != 'number') {
                throw __generateErrorString({
                    code: 400,
                    origin: origin,
                    message: `Type of limit and skip paramater must be "number"! Not "${typeof limit}" and "${typeof skip}"!`
                });
            }
            // Process
            else {
                postsData.splice(0, skip);
                if(limit != undefined) postsData.splice(limit);
                return postsData;
            }
        }
    }
    catch(err) {
        throw err;
    }
}

export {
    addPostType,
    removePostType,
    getSinglePostType,
    getMultiplePostTypes,
    getSinglePostTypeByName
}