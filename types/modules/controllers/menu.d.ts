// Key: cont_menu

// Add menu item
interface cont_menu_addMenuItemInp {
    menu_id: mod_menuModel["_id"]
    page_id: mod_pageModel["_id"]
    blank: boolean
    text: string
}

// Update menu item
interface cont_menu_updateMenuItemInp {
    page_id?: mod_pageModel["_id"]
    blank?: boolean
    text?: string
}