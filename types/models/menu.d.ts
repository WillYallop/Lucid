// Key: mod_

interface mod_menuModel {
    _id: string
    name: string
    links: Array<mod_menuModelLinks>
}

interface mod_menuModelLinks {
    _id: string
    text: string
    blank: boolean
    page_id?: string
    external: boolean
    external_url?: string
}