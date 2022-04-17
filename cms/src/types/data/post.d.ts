// KEY: data_post_

// -----------------------------------
// get multiple posts
interface data_post_getMultipleQuery {
    query: {
        post: {
            get_multiple: {
                __args: {
                    all: boolean
                }
                _id: boolean
                name: boolean
                template_path: boolean
            }
        }
    }
}
interface data_post_getMultipleQueryRes {
    data: {
        post: {
            get_multiple: Array<mod_postObject>
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// get single by name
interface data_post_getSingleViaNameQuery {
    query: {
        post: {
            get_single_by_name: {
                __args: {
                    name: mod_postObject["name"]
                }
                _id: boolean
                name: boolean
                template_path: boolean
            }
        }
    }
}
interface data_post_getSingleViaNameQueryRes {
    data: {
        post: {
            get_single_by_name: mod_postObject
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// update single
interface data_post_updateSingleQuery {
    query: {
        post: {
            update_single: {
                __args: {
                    _id: mod_postObject["_id"]
                    name: mod_postObject["name"]
                    old_name: mod_postObject["name"]
                    template_path: mod_postObject["template_path"]
                    page_id?: mod_pageModel["_id"]
                }
                _id: boolean
                name: boolean
                template_path: boolean
            }
        }
    }
}
interface data_post_updateSingleQueryRes {
    data: {
        post: {
            update_single: mod_postObject
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// get single by name
interface data_post_saveSingleQuery {
    query: {
        post: {
            save_single: {
                __args: {
                    name: mod_postObject["name"]
                    template_path: mod_postObject["template_path"]
                    page_id?: mod_pageModel["_id"]
                }
                _id: boolean
                name: boolean
                template_path: boolean
            }
        }
    }
}
interface data_post_saveSingleQueryRes {
    data: {
        post: {
            save_single: mod_postObject
        }
    }
    errors: Array<{
        message: string
    }>
}