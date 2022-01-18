// Key: cont_comp_

// saveSingle()
interface cont_comp_saveSingleInp {
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    file_path: mod_componentModel["file_path"]
    preview_url?: mod_componentModel["preview_url"]
}

// updateSingle()
interface cont_comp_updateSingleInp {
    name?: mod_componentModel["name"]
    description?: mod_componentModel["description"]
    preview_url?: mod_componentModel["preview_url"]
}

// Get unregistered
interface cont_comp_getUnregisteredRes {
    unregistered: Array<cont_the_listDirectoryFiles>
    totals: {
        unregistered: number
        registered: number
    }
}