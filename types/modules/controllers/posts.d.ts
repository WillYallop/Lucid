// Key: cont_post_

interface cont_post_postDeclaration {
    _id: string
    name: string
    template_path: string
}

// updateSingle
interface cont_post_updateSingleInp {
    name?: cont_post_postDeclaration["name"]
    template_path?: cont_post_postDeclaration["template_path"]
}
interface const_post_updateSingleGraphInp {
    name?: cont_post_postDeclaration["name"]
    old_name?: cont_post_postDeclaration["name"]
    template_path?: cont_post_postDeclaration["template_path"]
    page_id?: mod_pageModel["_id"]
}