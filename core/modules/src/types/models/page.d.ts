// KEY pag_

// Should match up with API pages model
interface pag_pageData {
    id: string,
    slug: string,
    path: string,
    template: string,
    name: string,
    seo: {
        title: string,
        description: string
    },
    components: Array<pag_componentData>
}

// TEMP
interface pag_componentData {
    id: string
    file_name: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string
    fields: Array<pag_compField>
}
interface pag_compField {
    name: string,
    data: any
}