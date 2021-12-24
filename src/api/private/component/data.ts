import { componentController } from 'lucid-core';

// Get single component
export const getSingle = async (id: mod_componentModel["id"]) => {
    let res = await componentController.getSingleByID(id);

    if(res.success) return res.component; 
    else throw res.errors[0].message;
}

// Get multiple components
export const getMultiple = async(limit: number, skip: number) => {
    let res = await componentController.getMultiple(limit, skip);
    if(res.success) return res.components;
    else throw res.errors[0].message;
}

// Delete single
export const deleteSingle = async(id: mod_componentModel["id"]) => {
    let res = await componentController.deleteSingle(id);
    if(res.deleted) {
        return {
            deleted: res.deleted
        }
    } else throw res.errors[0].message;
}

// Save single
export const saveSingle = async(data: cont_comp_saveSingleInp) => {
    let res = await componentController.saveSingle(data);
    if(res.saved) return res.component;
    else throw res.errors[0].message;
}

// Update single
export const updateSingle = async (id: mod_componentModel["id"], data: cont_comp_updateSingleInp) => {
    let res = await componentController.updateSingle(id, data);
    if(res.updated) return res.component;
    else throw res.errors[0].message;
}