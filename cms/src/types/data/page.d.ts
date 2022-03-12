// KEY: data_page_

// -----------------------------------
// get multiple pages
interface data_page_getMultipleQuery {
    query: {
        page: {
            get_multiple: {
                __args: {
                    type: mod_pageModel["type"]
                    post_name?: mod_pageModel["post_name"]
                    skip: number
                    limit: number
                }
                _id: boolean
                slug: boolean
                name: boolean
                has_parent: boolean
                parent_id: boolean
                is_homepage: boolean
            }
        }
    }
}
interface data_page_getMultipleQueryRes {
    data: {
        page: {
            get_multiple: Array<mod_pageModel>
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// delete single page
interface data_page_deleteSingleQuery {
    query: {
        page: {
            delete_single: {
                __args: {
                    _id: mod_pageModel["_id"]
                }
                deleted: boolean
            }
        }
    }
}
interface data_page_deleteSingleQueryRes {
    data: {
        page: {
            delete_single: {
                deleted: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}