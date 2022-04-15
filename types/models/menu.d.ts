// Key: mod_

interface mod_menuModel {
    _id: string
    name: string
    links?: Array<mod_menuModelLinks>
}

interface mod_menuModelLinks {
    _id: string
    menu_id: mod_menuModel["_id"]
    page_id: mod_pageModel["_id"]
    text: string
    blank: boolean
    href?: mod_pageModel["slug"]
}