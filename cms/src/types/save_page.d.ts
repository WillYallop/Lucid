interface sapa_queryGenRes {
    save: boolean
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