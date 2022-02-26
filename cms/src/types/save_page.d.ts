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