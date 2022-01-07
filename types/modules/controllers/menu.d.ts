// Key: cont_menu

// createMenu()
interface cont_menu_createMenuInp {
    name: mod_menuModel["name"],
    links?: Array<{
        text?: mod_menuModelLinks["text"]
        blank?: mod_menuModelLinks["blank"]
        page_id?: mod_menuModelLinks["page_id"]
        external?: mod_menuModelLinks["external"]
        external_url?: mod_menuModelLinks["external_url"]
    }>  
}
interface cont_menu_createMenuRes {
    saved: boolean
    menu?: mod_menuModel
    errors?: Array<core_errorMsg>
}

// updateMenu()
interface cont_menu_updateMenuInp {
    name?: mod_menuModel["name"],
    links?: Array<{
        _id: mod_menuModelLinks["_id"] 
        text?: mod_menuModelLinks["text"]
        blank?: mod_menuModelLinks["blank"]
        page_id?: mod_menuModelLinks["page_id"]
        external?: mod_menuModelLinks["external"]
        external_url?: mod_menuModelLinks["external_url"]
    }>  
}
interface cont_menu_updateMenuRes {
    updated: boolean
    menu?: mod_menuModel
    errors?: Array<core_errorMsg>
}

// Delete menu
interface cont_menu_deleteMenuRes {
    deleted: boolean
    errors?: Array<core_errorMsg>
}