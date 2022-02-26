interface sapa_queryGenRes {
    send: boolean
    query: string
}

// Save Page query object
interface sapa_gen_pageQueryObj {
    mutation: {
        page: {
            update_single: {
                __args: {
                    _id: string
                    template?: string
                }
                _id: boolean
                template: boolean
            }
        }
    }
}

// Save page components query object
interface sapa_gen_pageComponentsQueryObj {
    mutation: {
        page_components: {
            update_multiple: {
                __args: {
                    data: Array<{
                        _id: string
                        page_id?: string
                        component_id?: string
                        position?: number
                    }>
                }
                _id: boolean
                page_id: boolean
                component_id: boolean
                position: boolean
            }
        }
    }
}

// Delete multiple page components
interface sapa_gen_deletePageComponentQueryObj {
    mutation: {
        page_components: {
            delete_multiple: {
                __args: {
                    data: Array<string>
                }
                deleted: boolean
            }
        }
    }
}

// Save content type field groups 
interface sapa_gen_groupQueryObj {
    mutation: {
        content_type_field: {
            update_multiple_groups: {
                __args: {
                    data: Array<mod_contentTypeFieldGroupModel>
                }
                _id: boolean
            }
        }
    }
}

// Save content type field data
interface sapa_gen_fieldDataQueryObj {
    mutation: {
        content_type_field: {
            update_multiple_fields: {
                __args: {
                    data: Array<{
                        page_component_id: mod_contentTypesDatabaseModel["page_component_id"]
                        config_id: mod_contentTypesDatabaseModel["config_id"]
                        type: mod_contentTypesConfigModel["type"]
                        value: mod_contentTypesDatabaseModel["value"]
                        group_id?: mod_contentTypesDatabaseModel["group_id"]
                    }>
                }
                _id: boolean
            }
        }
    }
}