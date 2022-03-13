// KEY: data_page_

// -----------------------------------
// get multiple pages
interface data_page_getMultipleQuery {
    query: {
        page: {
            get_multiple: {
                __args: {
                    type: mod_pageModel["type"]
                    post_name?: mod_pageModel["post_name"]
                    skip: number
                    limit: number
                }
                _id: boolean
                slug: boolean
                name: boolean
                has_parent: boolean
                parent_id: boolean
                is_homepage: boolean
            }
        }
    }
}
interface data_page_getMultipleQueryRes {
    data: {
        page: {
            get_multiple: Array<mod_pageModel>
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// get single page
interface data_page_getSingleQuery {
    query: {
        page: {
            get_single: {
                __args: {
                    slug: mod_pageModel["slug"]
                }
                _id: boolean
                template: boolean
                slug: boolean
                path: boolean
                name: boolean
                type: boolean
                post_name: boolean
                has_parent: boolean
                parent_id: boolean
                date_created: boolean
                last_edited: boolean
                author: boolean
                is_homepage: boolean
                post_type_id: boolean
                seo: {
                    page_id: boolean
                    title: boolean
                    description: boolean
                    canonical: boolean
                    robots: boolean
                    og_type: boolean
                    og_title: boolean
                    og_description: boolean
                    og_image: boolean
                    twitter_card: boolean
                    twitter_title: boolean
                    twitter_description: boolean
                    twitter_image: boolean
                    twitter_creator: boolean
                    twitter_site: boolean
                    twitter_player: boolean
                } | boolean
                page_components: {
                    _id: boolean
                    position: boolean
                    component: {
                        _id: boolean
                        preview_url: boolean
                        file_path: boolean
                        name: boolean
                    } | boolean
                } | boolean
            }
        }
    }
}
interface data_page_getSingleQueryRes {
    data: {
        page: {
            get_single: mod_pageModel
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// get single page by post id
interface data_page_getSingleByPostIDQuery {
    query: {
        page: {
            get_single_by_post_id: {
                __args: {
                    post_id: mod_postObject["_id"]
                }
                _id: boolean
                slug: boolean
                name: boolean
            }
        }
    }
}
interface data_page_getSingleByPostIDQueryRes {
    data: {
        page: {
            get_single_by_post_id: pageSearchRes
        }
    }
    errors: Array<{
        message: string
    }>
}



// -----------------------------------
// delete single page
interface data_page_deleteSingleQuery {
    query: {
        page: {
            delete_single: {
                __args: {
                    _id: mod_pageModel["_id"]
                }
                deleted: boolean
            }
        }
    }
}
interface data_page_deleteSingleQueryRes {
    data: {
        page: {
            delete_single: {
                deleted: boolean
            }
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// delete single page
interface data_page_searchNameQuery {
    query: {
        page: {
            search_name: {
                __args: {
                    query: string
                    full_slug: boolean
                    allow_home: boolean
                    type: "all" | "page" | "post"
                }
                slug: boolean
                name: boolean
                _id: boolean
            }
        }
    }
}
interface data_page_searchNameQueryRes {
    data: {
        page: {
            search_name: Array<pageSearchRes>
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// save single page
interface data_page_saveSingleQuery {
    query: {
        page: {
            save_single: {
                __args: {
                    template: mod_pageModel["template"]
                    slug: mod_pageModel["slug"]
                    name: mod_pageModel["name"]
                    type: mod_pageModel["type"]
                    has_parent: mod_pageModel["has_parent"]
                    author: mod_pageModel["author"]
                    is_homepage: mod_pageModel["is_homepage"]

                    post_name?: mod_pageModel["post_name"]
                    parent_id?: mod_pageModel["parent_id"]
                    post_type_id?: mod_pageModel["post_type_id"]
                }
                _id: boolean
                slug: boolean
            }
        }
    }
}
interface data_page_saveSingleQueryRes {
    data: {
        page: {
            save_single: {
                _id: mod_pageModel["_id"]
                slug: mod_pageModel["slug"]
            }
        }
    }
    errors: Array<{
        message: string
    }>
}


// -----------------------------------
// get live url
interface data_page_getLiveURLQuery {
    query: {
        page: {
            get_live_url: {
                __args: {
                    _id: mod_pageModel["_id"]
                }
                url: boolean
            }
        }
    }
}
interface data_page_getLiveURLQueryRes {
    data: {
        page: {
            get_live_url: {
                url: string
            }
        }
    }
    errors: Array<{
        message: string
    }>
}

