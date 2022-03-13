interface sapa_queryGenRes {
    send: boolean
    query: string
    data?: any
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

// Save seo query object
interface sapa_gen_seoQueryObj {
    mutation: {
        seo: {
            update_single: {
                __args: {
                    page_id: string
                    title?: string
                    description?: string
                    canonical?: string
                    robots?: string
                    og_type?: string
                    og_title?: string
                    og_description?: string
                    og_image?: string
                    twitter_card?: string
                    twitter_title?: string
                    twitter_description?: string
                    twitter_image?: string
                    twitter_creator?: string
                    twitter_site?: string
                    twitter_player?: string
                }
                page_id: boolean
                title: boolean
                description: boolean
                canonical: boolean
                robots: boolean
                og_type: boolean
                og_title: boolean
                og_description: boolean
                og_image: boolean
                twitter_card: boolean
                twitter_title: boolean
                twitter_description: boolean
                twitter_image: boolean
                twitter_creator: boolean
                twitter_site: boolean
                twitter_player: boolean
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
                    page_id: string
                    page_components: Array<{
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
            add_multiple: {
                __args: {
                    page_id: string
                    page_components: Array<{
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
                    page_component_ids: Array<string>
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
            save_multiple_groups: {
                __args: {
                    groups: Array<mod_contentTypeFieldGroupModel>
                }
                _id: boolean
            }
        }
    }
}

// Delete content type field groups
interface sapa_gen_deleteGroupQueryObj {
    mutation: {
        content_type_field: {
            delete_multiple_groups: {
                __args: {
                    groups_ids: Array<string>
                }
                deleted: boolean
            }
        }
    }
}

// Save content type field data
interface sapa_gen_fieldDataQueryObj {
    mutation: {
        content_type_field: {
            save_multiple_fields: {
                __args: {
                    page_id: string
                    fields_data: Array<sapa_gen_fieldDataQueryFieldDataObj>
                }
                page_component_id: boolean
                config_id: boolean
                value: boolean
                group_id: boolean
            }
        }
    }
}

interface sapa_gen_fieldDataQueryFieldDataObj {
    page_component_id: mod_contentTypesDatabaseModel["page_component_id"]
    config_id: mod_contentTypesDatabaseModel["config_id"]
    type: mod_contentTypesConfigModel["type"]
    value: mod_contentTypesDatabaseModel["value"]
    group_id?: mod_contentTypesDatabaseModel["group_id"]
    root: mod_contentTypesDatabaseModel["root"]
}