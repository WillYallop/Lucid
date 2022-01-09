// Key: cont_page

// saveSingle()
interface cont_page_saveSingleInp {
    template: mod_pageModel["template"]
    slug: mod_pageModel["slug"]
    name: mod_pageModel["name"]
    type: mod_pageModel["type"]
    post_name: mod_pageModel["post_name"]
    has_parent: mod_pageModel["has_parent"]
    parent_id: mod_pageModel["parent_id"]
    author: mod_pageModel["author"]
    is_homepage: mod_pageModel["is_homepage"]
}
interface const_page_saveSinglePageObj {
    template: mod_pageModel["template"]
    slug: mod_pageModel["slug"]
    name: mod_pageModel["name"]
    type: mod_pageModel["type"]
    post_name?: mod_pageModel["post_name"]
    has_parent: mod_pageModel["has_parent"]
    parent_id?: mod_pageModel["parent_id"]
    author: mod_pageModel["author"]
    is_homepage: mod_pageModel["is_homepage"],
    date_created: mod_pageModel["date_created"]
    last_edited: mod_pageModel["last_edited"]
}

// updateSingle()
interface cont_page_updateSingleInp {
    template?: mod_pageModel["template"]
    slug?: mod_pageModel["slug"]
    name?: mod_pageModel["name"]
    has_parent?: mod_pageModel["has_parent"]
    parent_id?: mod_pageModel["parent_id"]
    is_homepage?: mod_pageModel["is_homepage"]
}
interface const_page_updatePageObj {
    last_edited: mod_pageModel["last_edited"]
    template?: mod_pageModel["template"]
    slug?: mod_pageModel["slug"]
    name?: mod_pageModel["name"]
    has_parent?: mod_pageModel["has_parent"]
    parent_id?: mod_pageModel["parent_id"]
    is_homepage?: mod_pageModel["is_homepage"]
}

// updatePageComponent
interface const_page_updatePageComponentInp {
    position?: mod_pageComponentsModel["position"]
}
interface const_page_updatePageComponentUpdateObj {
    position?: mod_pageComponentsModel["position"]
}