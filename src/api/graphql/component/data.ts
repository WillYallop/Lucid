import { componentController } from 'lucid-core';

// Get single component
export const getSingle = async (id: mod_componentModel["id"]) => {
    let res = await componentController.getSingleByID(id);

    if(res.success) return res.component; 
    else console.log(res.errors);
}

// Get multiple components
export const getMultiple = async(limit: number, skip: number) => {
    let res = await componentController.getMultiple(limit, skip);
    if(res.success) return res.components;
    else console.log(res.errors);
}