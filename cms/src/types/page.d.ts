// Page Model 
interface mod_pageModel {
    _id: string
    template: string
    slug: string
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
    parent_id: string
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
    modifiedComponents: Array<string>
    deleteComponents: Array<string>
    deleteGroups: Array<string>
    pageComponentDownloaded: Array<string>
}