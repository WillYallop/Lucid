// Key: cont_post_

interface cont_post_postDeclaration {
    _id: string
    name: string
    template_name: string
}

// addPostType()
interface cont_post_addPostTypeRes {
    saved: boolean,
    post_type?: cont_post_postDeclaration
    errors?: Array<core_errorMsg>
}

// removePostType()
interface cont_post_removePostTypeRes {
    deleted: boolean
    errors?: Array<core_errorMsg>
}

// getSinglePostType
interface cont_post_getSinglePostTypeRes {
    found: boolean
    post_type?: cont_post_postDeclaration
    errors?: Array<core_errorMsg>
}

// getMultiplePostTypes
interface cont_post_getMultiplePostTypeRes {
    success: boolean
    post_types?: Array<cont_post_postDeclaration>
    errors?: Array<core_errorMsg>
}