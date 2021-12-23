import { componentController } from 'lucid-core';

export const getSingle = async (id: mod_componentModel["id"]) => {
    let res = await componentController.getSingleByID(id);

    if(res.success) return res.component; 
    else console.log(res.errors);
}