// Page Model 
interface mod_pageModel {
    _id: string
    template: string
    slug: string
    path: string
    name: string
    seo: {
        page_id: mod_pageModel["_id"]
        title: string
        description: string
        canonical: string
        robots: string
        og_type: string
        og_title: string
        og_description: string
        og_image: string
        twitter_card: 'summary' | 'summary large image' | 'app' | 'player'
        twitter_title: string
        twitter_description: string
        twitter_image: string
        twitter_creator: string
        twitter_site: string
        twitter_player: string
    }
    type: 'page' | 'post'
    post_name: string
    has_parent: boolean
    parent_id: string | null
    date_created: string
    last_edited: string
    author: string
    is_homepage: boolean
    post_type_id: cont_post_postDeclaration["_id"]
    
    page_components: Array<mod_page_componentModel>
}
interface mod_page_componentModel {
    _id: string
    page_id: string
    component_id: string
    position: number
    component: mod_componentModel
    content_types: Array<mod_contentTypesConfigModel>
    data: Array<mod_contentTypesDatabaseModel>
    groups: Array<mod_contentTypeFieldGroupModel>
}



interface updateDataObjInterface {
    template: boolean
    componentPositions: boolean
    addComponents: Array<string>
    seoFields: {
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
    }
    modifiedComponents: Array<string>
    deleteComponents: Array<string>
    deleteGroups: Array<string>
    pageComponentDownloaded: Array<string>
}

interface pageSearchRes {
    slug: mod_pageModel["slug"]
    name: mod_pageModel["name"]
    _id: mod_pageModel["_id"]
}