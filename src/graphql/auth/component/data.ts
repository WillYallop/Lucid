import { componentController, contentTypeController } from '../../../index';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
export const getSingle = async (_id: mod_componentModel["_id"]) => {
    let res: any;
    res = await componentController.getSingleByID(_id);
    let { content_types } = await contentTypeController.getAll(_id);
    res.component['content_types'] = content_types;
    // Get content_types from res and add them to the response object.
    if(res.success) return res.component; 
    else throw res.errors[0].message;
}

// Get multiple components
export const getMultiple = async(limit: number, skip: number) => {
    let res: any;
    res = await componentController.getMultiple(limit, skip);
    for await (const component of res.components) {
        let  { content_types } = await contentTypeController.getAll(component._id);
        component['content_types'] = content_types;
    }
    // Get content_types from res and add them to the response object.
    if(res.success) return res.components;
    else throw res.errors[0].message;
}

// Delete single
export const deleteSingle = async(_id: mod_componentModel["_id"]) => {
    let res: any;
    res = await componentController.deleteSingle(_id);
    if(res.deleted) {
        return {
            deleted: res.deleted
        }
    } else throw res.errors[0].message;
}

// Save single
export const saveSingle = async(data: cont_comp_saveSingleInp) => {
    let res: any;
    res = await componentController.saveSingle(data);
    if(res.saved) return res.component;
    else throw res.errors[0].message;
}

// Update single
export const updateSingle = async (_id: mod_componentModel["_id"], data: cont_comp_updateSingleInp) => {
    let res: any;
    res = await componentController.updateSingle(_id, data);
    if(res.updated) return res.component;
    else throw res.errors[0].message;
}


// ------------------------------------ ------------------------------------
// Content Types
// ------------------------------------ ------------------------------------

// Delete single content type
export const deleteSingleContentType = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    let res: any;
    res = await contentTypeController.deleteSingle(componentID, contentTypeID);
    if(res.deleted) {
        return {
            deleted: res.deleted
        }
    } else throw res.errors[0].message;
}

// Create single content type
export const createSingleContentType = async (componentID: mod_componentModel["_id"], contentType: cont_cont_saveSingleInp) => {
    let res: any;
    res = await contentTypeController.saveSingle(componentID, contentType);
    if(res.saved) return res.content_type;
    else throw res.errors[0].message;
}

// Update single cotent type
export const updateSingleContentType = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp, repeaterField: boolean, repeaterID: mod_contentTypesConfigModel["_id"]) => {
    let res: any;
    res = await contentTypeController.updateSingle(componentID, contentType, repeaterField, repeaterID);
    if(res.updated) return res.content_type;
    else throw res.errors[0].message;
}