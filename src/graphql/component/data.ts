import db from '../../db';
import * as componentController from '../../controller/component';
import { getAllContentTypeConfig } from '../content_type_config/data';

// ------------------------------------ ------------------------------------
// Components
// ------------------------------------ ------------------------------------

// Get single component
export const getSingle = async (_id: mod_componentModel["_id"]) => {
    try {
        let component = await componentController.getSingleByID(_id);
        let content_types = await getAllContentTypeConfig(_id);
        component['content_types'] = content_types;
        return component;
    }
    catch(err) {
        throw err;
    }
}

// Get multiple components
export const getMultiple = async(limit: number, skip: number) => {
    try {
        let components = await componentController.getMultiple(limit, skip);
        for await (const component of components) {
            let content_types = await getAllContentTypeConfig(component._id);
            component['content_types'] = content_types;
        }
        // Get content_types from res and add them to the response object.
        return components;
    }
    catch(err) {
        throw err;
    }
}

// Delete single
export const deleteSingle = async(_id: mod_componentModel["_id"]) => {
    try {
        // delete component registered config
        await componentController.deleteSingle(_id);
        // delete all page components that use this component
        await db.none('DELETE FROM page_components WHERE component_id=$1', _id);
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}

// Save single
export const saveSingle = async(data: cont_comp_saveSingleInp) => {
    try {
        const component = await componentController.saveSingle(data);
        return component;
    }
    catch(err) {
        throw err;
    }
}

// Update single
export const updateSingle = async (_id: mod_componentModel["_id"], data: cont_comp_updateSingleInp) => {
    try {
        const component = await componentController.updateSingle(_id, data);
        return component
    }
    catch(err) {
        throw err;
    }
}

// Get unregistered components
export const getUnregistered = async () => {
    try {
        let unregistered = await componentController.getUnregistered();
        return unregistered;
    }
    catch(err) {
        throw err;
    }
}