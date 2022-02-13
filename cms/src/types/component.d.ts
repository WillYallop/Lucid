interface mod_pageModelComponent {
    _id: mod_componentModel["_id"]
    page_components_id: mod_pageComponentsModel["_id"] 
    file_name: mod_componentModel["file_name"]
    file_path: mod_componentModel["file_path"]
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    preview_url: mod_componentModel["preview_url"]
    date_added: mod_componentModel["date_added"]
    date_modified: mod_componentModel["date_modified"]
    content_types: Array<mod_pageModelComponentContentType>
}