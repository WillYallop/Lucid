// Key: cont_comp_

// deleteSingle()
interface cont_comp_deleteSingleRes {
    deleted: boolean
}

// saveSingle()
interface cont_comp_saveSingleInp {
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    file_path: mod_componentModel["file_path"]
    preview_url?: mod_componentModel["preview_url"]
}
interface cont_comp_saveSingleRes {
    saved: boolean,
    component?: mod_componentModel
}

// updateSingle()
interface cont_comp_updateSingleInp {
    name?: mod_componentModel["name"]
    description?: mod_componentModel["description"]
    preview_url?: mod_componentModel["preview_url"]
}
interface cont_comp_updateSingleRes {
    updated: boolean
    component?: mod_componentModel
}

// getSingleByID()
interface cont_comp_getSingleByIDRes {
    success: boolean
    component?: mod_componentModel
}

// getMultiple() 
interface cont_comp_getMultipleRes {
    success: boolean
    components?: Array<mod_componentModel>
}

// Internal
interface cont_comp_saveComponentHandlerRes {
    saved: boolean
    component: mod_componentModel
}

// Get unregistered
interface cont_comp_getUnregisteredRes {
    unregistered: Array<cont_the_listDirectoryFiles>
    totals: {
        unregistered: number
        registered: number
    }
}