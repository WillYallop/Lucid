// KEY: data_pagecomp_

// -----------------------------------
// get single page component
interface data_pagecomp_getSingleQuery {
    query: {
        page_components: {
            get_single: {
                __args: {
                    _id: mod_pageComponentsModel["_id"]
                }
                _id: boolean
                component_id: boolean
                position: boolean
                component: {
                    _id: boolean
                    name: boolean
                    preview_url: boolean
                    file_path: boolean
                    file_name: boolean
                    date_added: boolean
                    description: boolean
                    date_modified: boolean
                }
                content_types: {
                    _id: boolean
                    name: boolean
                    type: boolean
                    parent: boolean
                    config: {
                        min: boolean
                        max: boolean
                        default: boolean
                    }
                }
                groups: {
                    _id: boolean
                    page_component_id: boolean
                    parent_group: boolean
                    parent_config_id: boolean
                    position: boolean
                }
                data: {
                    page_component_id: boolean
                    config_id: boolean
                    value: boolean
                    group_id: boolean
                    root: boolean
                }
            }
        }
    }
}
interface data_pagecomp_getSingleQueryRes {
    data: {
        page_components: {
            get_single: mod_page_componentModel
        }
    }
    errors: Array<{
        message: string
    }>
}
