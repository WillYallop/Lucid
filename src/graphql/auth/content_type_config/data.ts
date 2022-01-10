import db from '../../../db';
import { contentTypeController } from '../../../index';
import { deleteAllPageComponentContentTypes } from '../content_type/data';

// ------------------------------------ ------------------------------------
// Content Types
// ------------------------------------ ------------------------------------

// Delete single content type config
export const deleteSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    let res: any;
    
    // Remove all instances of this content type from page components in the database
    deleteAllPageComponentContentTypes(componentID, contentTypeID);

    res = await contentTypeController.deleteSingle(componentID, contentTypeID);

    if(res.deleted) {
        return {
            deleted: res.deleted
        }
    } else throw res.errors[0].message;
}

// Create single content type config
export const createSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentType: cont_cont_saveSingleInp) => {
    let res: any;
    res = await contentTypeController.saveSingle(componentID, contentType);
    if(res.saved) return res.content_type;
    else throw res.errors[0].message;
}

// Update single cotent type
export const updateSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp, repeaterField: boolean, repeaterID: mod_contentTypesConfigModel["_id"]) => {
    let res: any;
    
    // Remove all instances of this content type from page components in the database
    // If the user edits anything about a component content type we lose data for it on pages that have this component to avoid potional issues
    deleteAllPageComponentContentTypes(componentID, contentType._id);

    res = await contentTypeController.updateSingle(componentID, contentType, repeaterField, repeaterID);
    if(res.updated) return res.content_type;
    else throw res.errors[0].message;
}

// Get all content type config
export const getAllContentTypeConfig = async (componentID: mod_componentModel["_id"]) => {
    let res: any;
    res = await contentTypeController.getAll(componentID);
    if(res.updated) return res.content_type;
    else throw res.errors[0].message;
}