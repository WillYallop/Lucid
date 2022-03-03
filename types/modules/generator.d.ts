// Key: gen_


interface gen_generateAppInp {
    _id: mod_pageModel["_id"]
    template: mod_pageModel["template"]
    slug: mod_pageModel["slug"]
    name: mod_pageModel["name"]
    seo: {
        title: mod_pageModel["seo"]["title"]
        description: mod_pageModel["seo"]["description"]
        og_title: mod_pageModel["seo"]["og_title"]
        og_description: mod_pageModel["seo"]["og_description"]
        og_image: mod_pageModel["seo"]["og_image"]
    }
    components: Array<gen_generateAppInpComponentModel>
}

interface gen_generateAppInpComponentModel {
    _id: mod_componentModel["_id"]
    file_name: mod_componentModel["file_name"]
    file_path: mod_componentModel["file_path"]
    name: mod_componentModel["name"]
    content_types: Array<gen_generateAppInpComponentFieldModel>
}
interface gen_generateAppInpComponentFieldModel {
    name: string
    data: any
}


// Template Compiler Res Map
type gene_templatesMap = Map<string, {
    markup: string
}>
// Component Compiler Res Map
// generateComponents 
type gene_componentsMap = Map<string, {
    _id: string
    markup: string
}>

// Page Compiler Res Map
type gene_pagseMap = Map<string, {
    slug: mod_pageModel["slug"]
    markup: string
}>
// Page Compiler Input 
interface gene_compilePage {
    template: mod_pageModel["template"],
    seo: {
        title: mod_pageModel["seo"]["title"]
        description: mod_pageModel["seo"]["description"]
        og_title: mod_pageModel["seo"]["og_title"]
        og_description: mod_pageModel["seo"]["og_description"]
        og_image: mod_pageModel["seo"]["og_image"]
    }
    components: gene_componentsMap

    // Undecided!
    head: string
    footer: string
}

interface gene_generateAppRes {
    build_time: number,
    pages_built: number
}



// ---------------------
// -- NEW
// ---------------------
interface gen_generatePreviewConfig {
    data_mode: 'live' | 'provided'
    page_id: mod_pageModel["_id"]
    page_components: Array<{
        _id: mod_pageComponentsModel["_id"]
        component_id: mod_componentModel["_id"]
        groups?: Array<mod_contentTypeFieldGroupModel>
        data?: Array<mod_contentTypesDatabaseModel>
    }>
}