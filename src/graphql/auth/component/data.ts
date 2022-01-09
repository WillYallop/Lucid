import { componentController } from '../../../index';

import { getAllContentTypeConfig } from '../content_type_config/data';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
export const getSingle = async (_id: mod_componentModel["_id"]) => {
    let res: any;
    res = await componentController.getSingleByID(_id);
    let { content_types } = await getAllContentTypeConfig(_id);
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
        let  { content_types } = await getAllContentTypeConfig(component._id);
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