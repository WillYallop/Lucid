// Key: mod_


// Content Types Model
// This is the model for the content types that is stored in the themes/config/content_types directory
interface mod_contentTypesConfigModel {
    _id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: {
        max?: string
        min?: string
        default?: string
    }
    parent: 'root' | mod_contentTypesConfigModel["_id"]
}

interface mod_pageComponentsModel {
    _id: string
    page_id: mod_pageModel["_id"]
    component_id: mod_componentModel["_id"]
    position: number
    component?: mod_componentModel
    data: Array<mod_contentTypesDatabaseModel>
    groups: Array<mod_contentTypeFieldGroupModel>
}

// This is the model for the data base, this is what links the pageComponentModel component to its data
interface mod_contentTypesDatabaseModel {
    page_component_id: mod_pageComponentsModel["_id"] // component_id referes to the page_components tables _id - not the theme/config components ID
    config_id: mod_contentTypesConfigModel["_id"]
    group_id?: mod_contentTypeFieldGroupModel["_id"] | null
    value: any
    root: boolean
}

interface mod_contentTypeFieldGroupModel {
    _id: string
    page_component_id: mod_pageComponentsModel["_id"]
    parent_group?: mod_contentTypeFieldGroupModel["_id"] | null
    parent_config_id?: mod_contentTypesConfigModel["_id"]
    position: number
}