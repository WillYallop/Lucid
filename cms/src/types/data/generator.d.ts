// KEY: data_generator_

// -----------------------------------
// Generate site
interface data_generator_generateSiteQuery {
    query: {
        generator: {
            site: {
                __args: {}
                build_time: boolean
                pages_built: boolean
            }
        }
    }
}
interface data_generator_generateSiteQueryRes {
    data: {
        generator: {
            site: mod_generateSite
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// Generate preview
interface data_generator_generatePreviewQuery {
    query: {
        generator: {
            preview: {
                __args: {
                    data_mode: 'live' | 'provided'
                    template: mod_pageModel["template"] | null
                    page_id: mod_pageModel["_id"]
                    page_components: Array<mod_generatePreviewPageComponents>
                    location: string
                }
                template: boolean
                components: {
                    _id: boolean
                    page_component_id: boolean
                    markup: boolean
                }
            }
        }
    }
}
interface data_generator_generatePreviewQueryRes {
    data: {
        generator: {
            preview: {
                template: string
                components: Array<{
                    _id: mod_componentModel["_id"]
                    page_component_id: mod_pageComponentsModel["_id"]
                    markup: string
                }>
            }
        }
    }
    errors: Array<{
        message: string
    }>
}