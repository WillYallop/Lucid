// KEY mod_



interface mod_pageData {
    id: string,
    template: string,
    seo: {
        title: string,
        description: string
    },
    components: Array<mod_componentData>
}

// TEMP
interface mod_componentData {
    id: string
    file_name: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string
    fields: Array<mod_compField>
}
interface mod_compField {
    name: string,
    data: any
}