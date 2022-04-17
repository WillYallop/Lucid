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

// Get menu
// Temp limks array
interface cont_menu_getMenuLinkstemp {
    _id: string
    menu_id: mod_menuModel["_id"]
    page_id: mod_pageModel["_id"]
    text: string
    blank: boolean
    href?: mod_pageModel["slug"]
    slug?: mod_pageModel["slug"]
}