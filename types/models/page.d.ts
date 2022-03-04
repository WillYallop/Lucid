// Key: mod_


// Page Model 
interface mod_pageModel {
    _id: string
    template: string
    slug: string
    name: string
    seo: {
        page_id: mod_pageModel["_id"]
        title: string
        description: string
        og_title: string
        og_description: string
        og_image: string
    }
    page_components: Array<mod_pageComponentsModel>,
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string
    date_created: string
    last_edited: string
    author: string
    is_homepage: boolean
    post_type_id: cont_post_postDeclaration["_id"]
}