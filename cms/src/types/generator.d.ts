
interface mod_generateSite {
    build_time: number
    pages_built: number
}

// Generate preview
interface mod_generatePreviewPageComponents {
    _id: mod_pageComponentsModel["_id"]
    component: {
        _id: mod_componentModel["_id"]
        file_path: mod_componentModel["file_path"]
        name: mod_componentModel["name"]
    },
    groups?: mod_pageComponentsModel["groups"]
    data?: mod_pageComponentsModel["data"]
}