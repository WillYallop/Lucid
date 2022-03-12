// KEY: data_cont_conf_

// -----------------------------------
// get single content type config
interface data_cont_conf_getSingleQuery {
    query: {
        content_type_config: {
            get_single: {
                __args: {
                    component_id: mod_componentModel["_id"]
                    content_type_id: mod_contentTypesConfigModel["_id"]
                }
                _id: boolean
                name: boolean
                type: boolean
                parent: boolean
                config: {
                    min: boolean
                    max: boolean
                    default: boolean
                }
            }
        }
    }
}
interface data_cont_conf_getSingleQueryRes {
    data: {
        content_type_config: {
            get_single: mod_contentTypesConfigModel
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// create single content type config
interface data_cont_conf_createSingleQuery {
    mutation: {
        content_type_config: {
            create_single: {
                __args: {
                    component_id: mod_componentModel["_id"]
                    content_type: {
                        name: mod_contentTypesConfigModel["name"]
                        type: mod_contentTypesConfigModel["type"]
                        parent: mod_contentTypesConfigModel["parent"]
                        config: mod_contentTypesConfigModel["config"]
                    }
                }
                _id: boolean
                name: boolean
                type: boolean
                parent: boolean
                config: {
                    max: boolean
                    min: boolean
                    default: boolean
                }
            } 
        }
    }
}
interface data_cont_conf_createSingleQueryRes {
    data: {
        content_type_config: {
            create_single: mod_contentTypesConfigModel
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// update single content type config
interface data_cont_conf_updateSingleQuery {
    mutation: {
        content_type_config: {
            update_single: {
                __args: {
                    component_id: mod_componentModel["_id"]
                    content_type: mod_contentTypesConfigModel
                }
                _id: boolean
                name: boolean
                type: boolean
                parent: boolean
                config: {
                    max: boolean
                    min: boolean
                    default: boolean
                }
            }
        }
    }
}
interface data_cont_conf_updateSingleQueryRes {
    data: {
        content_type_config: {
            update_single: mod_contentTypesConfigModel
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// delete content type config
interface data_cont_conf_deleteQuery {
    mutation: {
        content_type_config: {
            delete_single: {
                __args: {
                    component_id: mod_componentModel["_id"]
                    content_type_id: mod_contentTypesConfigModel["_id"]
                }
                deleted: boolean
            }
        }
    }
}
interface data_cont_conf_deleteQueryRes {
    data: {
        content_type_config: {
            delete_single: {
                deleted: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}
