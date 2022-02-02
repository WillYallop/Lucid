import { contentTypeController } from '../../../index';
import { deleteAllPageComponentContentTypes } from '../content_type/data';

// ------------------------------------ ------------------------------------
// Content Types
// ------------------------------------ ------------------------------------

// Delete single content type config
export const deleteSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    try {
        // Remove all instances of this content type from page components in the database
        deleteAllPageComponentContentTypes(componentID, contentTypeID);
        await contentTypeController.deleteSingle(componentID, contentTypeID);
        return {
            deleted: true
        };
    }
    catch(err) {
        throw err;
    }
}

// Create single content type config
export const createSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentType: mod_contentTypesConfigModel) => {
    try {
        if(!contentType.parent) contentType.parent = 'root';
        let content_type = await contentTypeController.saveSingle(componentID, contentType);
        return content_type;
    }
    catch(err) {
        throw err;
    }
}

// Update single cotent type
export const updateSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp) => {
    try {
        // Remove all instances of this content type from page components in the database
        // If the user edits anything about a component content type we lose data for it on pages that have this component to avoid potional issues
        deleteAllPageComponentContentTypes(componentID, contentType._id);
        let content_type = await contentTypeController.updateSingle(componentID, contentType);
        return content_type;
    }
    catch(err) {
        throw err;
    }
}

// Get all content type config
export const getAllContentTypeConfig = async (componentID: mod_componentModel["_id"]) => {
    try {
        let content_types = await contentTypeController.getAll(componentID);
        return content_types;
    }
    catch(err) {
        throw err;
    }
}

// Get single content type config
export const getSingleContentTypeConfig = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    try {
        let content_type = await contentTypeController.getSingle(componentID, contentTypeID);
        return content_type;
    }
    catch(err) {
        throw err;
    }
}