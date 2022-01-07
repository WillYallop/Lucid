// Key: mod_


// Page Model 
interface mod_pageModel {
    _id: string
    template: string
    slug: string
    name: string
    seo: {
        _id: string
        page_id: mod_pageModel["_id"]
        title: string
        description: string
        og_title: string
        og_description: string
        og_image: string
    }
    components: Array<mod_pageModelComponent>,
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string
    date_created: string
    last_edited: string
    author: string
    is_homepage: boolean
}
interface mod_pageModelComponent {
    _id: mod_componentModel["_id"]
    file_name: mod_componentModel["file_name"]
    file_path: mod_componentModel["file_path"]
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    preview_url: mod_componentModel["preview_url"]
    date_added: mod_componentModel["date_added"]
    date_modified: mod_componentModel["date_modified"]
    content_types: Array<mod_pageModelComponentContentType>
}
interface mod_pageModelComponentContentType {
    config_id: mod_contentTypesConfigModel["_id"]
    name: mod_contentTypesConfigModel["name"]
    type: mod_contentTypesConfigModel["type"]
    config: mod_contentTypesConfigModel["config"]
    data: string
}