// KEY: data_post_

// -----------------------------------
// get single component
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