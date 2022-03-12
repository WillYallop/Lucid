// KEY: data_comp_

// -----------------------------------
// get single component
interface data_comp_getSingeleComponentQuery {
    query: {
        components: {
            get_single: {
                __args: data_comp_getSingeleComponentQueryArgs
                _id: boolean
                name: boolean
                file_name: boolean
                file_path: boolean
                description: boolean
                preview_url: boolean
                date_added: boolean
                date_modified: boolean
                content_types: {
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
}
interface data_comp_getSingeleComponentQueryArgs {
    _id: mod_componentModel["_id"]
}
interface data_comp_getSingleComponentQueryRes {
    data: {
        components: {
            get_single: mod_componentModel
        }
    }
    errors: Array<{
        message: string
    }>
}



// -----------------------------------
// deregister component
interface data_comp_deregisterComponentQuery {
    mutation: {
        components: {
            delete_single: {
                __args: data_comp_deregisterComponentQueryArgs
                deleted: boolean
            }
        }
    }
}
interface data_comp_deregisterComponentQueryArgs {
    _id: mod_componentModel["_id"]
}

interface data_comp_deregisterComponentQueryRes {
    data: {
        components: {
            delete_single: {
                deleted: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// deregister component
interface data_comp_updateComponentQuery {
    mutation: {
        components: {
            update_single: {
                __args: data_comp_updateComponentQueryArgs
                _id: boolean
                name: boolean
                description: boolean
            }
        }
    }
}
interface data_comp_updateComponentQueryArgs {
    _id: mod_componentModel["_id"]
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
}
interface data_comp_updateComponentQueryRes {
    data: {
        components: {
            update_single: {
                _id: mod_componentModel["_id"]
                name: mod_componentModel["name"]
                description: mod_componentModel["description"]
            }
        }
    }
    errors: Array<{
        message: string
    }>
}