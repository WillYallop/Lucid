// KEY: data_comp_

// -----------------------------------
// get single component
interface data_comp_getSingleComponentQuery {
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
interface data_comp_getSingleComponentQueryArgs {
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
// get multiple components
interface data_comp_getMultipleComponentQuery {
    query: {
        components: {
            get_multiple: {
                __args: data_comp_getMultipleComponentQueryArgs
                _id: boolean
                name: boolean
                description: boolean
                preview_url: boolean
                date_added: boolean
                file_path: boolean
            }
        }
    }
}
interface data_comp_getMultipleComponentQueryArgs {
    skip: number
    limit: number
}
interface data_comp_getMultipleComponentQueryRes {
    data: {
        components: {
            get_multiple: Array<{
                _id: mod_componentModel["_id"]
                name: mod_componentModel["name"]
                description: mod_componentModel["description"]
                preview_url: mod_componentModel["preview_url"]
                date_added: mod_componentModel["date_added"]
                file_path: mod_componentModel["file_path"]
            }>
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
// update component
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


// -----------------------------------
// unregistered component
interface data_comp_ungregisteredComponentQuery {
    query: {
        components: {
            get_unregistered: {
                __args: data_comp_ungregisteredComponentQueryArgs
                unregistered: {
                    file_name: boolean
                    file_path: boolean
                }
                totals: {
                    unregistered: boolean
                    registered: boolean
                }
            }
        }
    }
}
interface data_comp_ungregisteredComponentQueryArgs {}
interface data_comp_ungregisteredComponentQueryRes {
    data: {
        components: {
            get_unregistered: {
                totals: {
                    unregistered: number
                    registered: number
                }
                unregistered: Array<{
                    file_name: string
                    path_name: string
                }>
            }
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// save single component
interface data_comp_saveSingleComponentQuery {
    mutation: {
        components: {
            save_single: {
                __args: data_comp_saveSingleComponentQueryArgs
                _id: boolean
            }
        }
    }
}
interface data_comp_saveSingleComponentQueryArgs {
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    file_path: mod_componentModel["file_path"]
    image: mod_componentModel["preview_url"]
}
interface data_comp_saveSingleComponentQueryRes {
    data: {
        components: {
            save_single: {
                _id: mod_componentModel["_id"]
            }
        }
    }
    errors: Array<{
        message: string
    }>
}