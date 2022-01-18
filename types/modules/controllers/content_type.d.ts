// Key: cont_cont_

// saveSingle()
interface cont_cont_saveSingleInp {
    name: mod_contentTypesConfigModel["name"]
    type: mod_contentTypesConfigModel["type"]
    config: mod_contentTypesConfigModel["config"]
    fields?: Array<cont_cont_saveSingleInp>
}

// updateSingle()
interface cont_cont_updateSingleInp {
    _id: mod_contentTypesConfigModel["_id"]
    name?: mod_contentTypesConfigModel["name"]
    type?: mod_contentTypesConfigModel["type"]
    config?: mod_contentTypesConfigModel["config"]
}

// updateSingleContentType()
interface cont_cont_updateSingleContentTypeInp {
    page_component_id: mod_pageComponentsModel["_id"]
    config_id: mod_contentTypesConfigModel["_id"]
    type: mod_contentTypesConfigModel["type"]
    value?: any
}
interface cont_cont_updateSingleContentTypeObj {
    value?: mod_contentTypesDatabaseModel["value"]
    // more may be added
}

// deleteSingleContentType()
interface cont_cont_deleteSingleContentTypeInp {
    page_component_id: mod_pageComponentsModel["_id"]
    config_id: mod_contentTypesConfigModel["_id"]
    type: mod_contentTypesConfigModel["type"]
}