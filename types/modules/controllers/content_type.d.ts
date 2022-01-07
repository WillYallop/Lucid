// Key: cont_cont_

// saveSingle()
interface cont_cont_saveSingleInp {
    name: mod_contentTypesConfigModel["name"]
    type: mod_contentTypesConfigModel["type"]
    config: mod_contentTypesConfigModel["config"]
}
interface cont_cont_saveSingleRes {
    saved: boolean,
    content_type?: mod_contentTypesConfigModel
    errors?: Array<core_errorMsg>
}

// getAll()
interface cont_cont_getAllRes {
    success: boolean
    content_types?: Array<mod_contentTypesConfigModel>
    errors?: Array<core_errorMsg>
}

// getSingle()
interface cont_cont_getSingleRes {
    success: boolean
    content_type?: mod_contentTypesConfigModel
    errors?: Array<core_errorMsg>
}

// deleteSingle()
interface cont_cont_deleteSingleRes {
    deleted: boolean
    errors?: Array<core_errorMsg>
}

// updateSingle()
interface cont_cont_updateSingleInp {
    _id: mod_contentTypesConfigModel["_id"]
    name?: mod_contentTypesConfigModel["name"]
    type?: mod_contentTypesConfigModel["type"]
    config?: mod_contentTypesConfigModel["config"]
}
interface cont_cont_updateSingleRes {
    updated: boolean
    content_type?: mod_contentTypesConfigModel
    errors?: Array<core_errorMsg> 
}