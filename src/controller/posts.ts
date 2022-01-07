/*

This controller is in charge of handling the theme/config/posts.json file.

This file is responsible for adding custom post types such as blogs, or projects for example.
These are similar to a standard page, but they all share the same template file, and are also queryable through the API.
 
Example posts.json file:

[
    {
        "name": "blogs",
        "template_name": "page.liquid"
    },
    {
        "name": "jobs",
        "template_name": "page.liquid"
    }
]

*/

import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray, __convertStringLowerUnderscore } from './helper/shared';


// ------------------------------------ ------------------------------------
// add new post type entry
// ------------------------------------ ------------------------------------
const addPostType = async (name: cont_post_postDeclaration["name"], template_name: cont_post_postDeclaration["template_name"]): Promise<cont_post_addPostTypeRes> => {
    // Make sure entry doesnt already exist with same name
    // Verify the template_name exists in the theme/templates directory will always end in a .liquid
    let verifyData = await validate([
        {
            method: 'post_name',
            value: __convertStringLowerUnderscore(name)
        },
        {
            method: 'temp_verifyFileExists',
            value: template_name
        },
        {
            method: 'file_isLiquidExtension',
            value: template_name
        }
    ]);
    if(verifyData.valid) {
        // Get theme/config/posts.json file
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check to see if the post wanting to be added exists:
        let findPost = postsData.findIndex( x => x.name === __convertStringLowerUnderscore(name) && x.template_name === template_name);
        if(findPost === -1) {
            // If there is no entry add one
            let postObj: cont_post_postDeclaration = {
                _id: uuidv1(),
                name: __convertStringLowerUnderscore(name),
                template_name: template_name
            };
            postsData.push(postObj);
            let response = await writeSingleFile('/config/posts.json', 'json', postsData);
            return {
                saved: response,
                post_type: postObj
            }
        }
        else {
            // Throw
            return {
                saved: false,
                errors: [
                    {
                        code: 403,
                        origin: 'postsController.addPostType',
                        title: 'Post Already Registered',
                        message: `Post with the name: "${__convertStringLowerUnderscore(name)}" and template_name: "${template_name}" already exist!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            saved: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// remove single post type entry
// ------------------------------------ ------------------------------------
const removePostType = async (_id: cont_post_postDeclaration["_id"]): Promise<cont_post_removePostTypeRes> => {
    // Validate the ID
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: _id
        }
    ]);
    if(verifyData.valid) {
        // Get post data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check if it exists and get index
        let postIndex = postsData.findIndex( x => x._id === _id );
        if(postIndex != -1) {
            // Remove from array and write
            postsData.splice(postIndex, 1);
            let response = await writeSingleFile('/config/posts.json', 'json', postsData);
            return {
                deleted: response
            }
        }
        else {
            return {
                deleted: false,
                errors: [
                    {
                        code: 404,
                        origin: 'postsController.removePostType',
                        title: 'Post Type Not Found',
                        message: `Cannot delete post with ID: "${_id}" because it cannot be found!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            deleted: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// get single post type entry
// ------------------------------------ ------------------------------------
const getSinglePostType = async (_id: cont_post_postDeclaration["_id"]): Promise<cont_post_getSinglePostTypeRes> => {
    // Validate the ID
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: _id
        }
    ]);
    if(verifyData.valid) {
        // Get post data
        let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');
        // Check if it exists and get it
        let post = postsData.find( x => x._id === _id );
        if(post != undefined) {
            return {
                found: true,
                post_type: post
            }
        }
        else {
            return {
                found: false,
                errors: [
                    {
                        code: 404,
                        origin: 'postsController.getSinglePostType',
                        title: 'Post Type Not Found',
                        message: `Cannot get post with ID: "${_id}" because it cannot be found!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            found: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// get multiple post types entries
// ------------------------------------ ------------------------------------
const getMultiplePostTypes = async (limit?: number, skip?: number, all?: boolean): Promise<cont_post_getMultiplePostTypeRes> => {
    // Get component data
    let postsData: Array<cont_post_postDeclaration> = await getSingleFileContent('/config/posts.json', 'json');

    if(all) {
        return {
            success: true,
            post_types: postsData
        }
    } 
    else {
        if(typeof limit != 'number' && typeof skip != 'number') {
            return {
                success: false,
                errors: [
                    {
                        code: 400,
                        origin: 'postsController.getMultiplePostTypes',
                        title: 'Type Error',
                        message: `Type of limit and skip paramater must be "number"! Not "${typeof limit}" and "${typeof skip}"!`
                    }
                ]
            }
        }
        // Process
        else {
            postsData.splice(0, skip);
            if(limit != undefined) postsData.splice(limit);
            return {
                success: true,
                post_types: postsData
            }
        }
    }
}

export {
    addPostType,
    removePostType,
    getSinglePostType,
    getMultiplePostTypes
}