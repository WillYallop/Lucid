// Key: mod_


// Content Types Model
// This is the model for the content types that is stored in the themes/config/content_types directory
interface mod_contentTypesConfigModel {
    _id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: mod_ct_conf_text | mod_ct_conf_email | mod_ct_conf_rich_media | mod_ct_conf_number | mod_ct_conf_range | mod_ct_conf_repeater | mod_ct_conf_select | mod_ct_conf_date | mod_ct_conf_media | mod_ct_conf_boolean | mod_ct_conf_json
}
// This is the model for the data base, this is what links the pageComponentModel component to its data
interface mod_contentTypesDatabaseModel {
    config_id: mod_contentTypesConfigModel["_id"]
    data:  string
}