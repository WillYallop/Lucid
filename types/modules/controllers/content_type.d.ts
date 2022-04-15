// Key: cont_cont_


// updateSingle()
interface cont_cont_updateSingleInp {
    _id: mod_contentTypesConfigModel["_id"]
    name?: mod_contentTypesConfigModel["name"]
    type?: mod_contentTypesConfigModel["type"]
    config?: mod_contentTypesConfigModel["config"]
    parent?: mod_contentTypesConfigModel["parent"]
}


// Save multiple content type fields data
interface cont_cont_saveMultipleFieldsInp {
    page_component_id: mod_contentTypesDatabaseModel["page_component_id"]
    config_id: mod_contentTypesDatabaseModel["config_id"]
    type?: mod_contentTypesConfigModel["type"]
    value: mod_contentTypesDatabaseModel["value"]
    group_id?: mod_contentTypesDatabaseModel["group_id"]
    root: boolean
}