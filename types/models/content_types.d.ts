// Key: mod_


// Content Types Model
// This is the model for the content types that is stored in the themes/config/content_types directory
interface mod_contentTypesConfigModel {
    _id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: {
        max_length?: number
        min_length?: number
        max_range?: number
        min_range?: number
        default_num?: number
        max_repeats?: number
    }
    // Only type of repeater has this:
    fields?: Array<mod_contentTypesConfigModel>
}

interface mod_pageComponentsModel {
    _id: string
    page_id: mod_pageModel["_id"]
    component_id: mod_componentModel["_id"]
    position: number
}

// This is the model for the data base, this is what links the pageComponentModel component to its data
interface mod_contentTypesDatabaseModel {
    component_id: mod_pageComponentsModel["_id"] // component_id referes to the page_components tables _id - not the theme/config components ID
    config_id: mod_contentTypesConfigModel["_id"]
    value: any
}