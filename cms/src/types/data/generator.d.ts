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