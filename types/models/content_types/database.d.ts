// Key: mod_ct_data_

// TYPES
// 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'

// Text content type database
interface mod_ct_data_text {
    value: string
}

// Email content type database
interface mod_ct_data_email {
    value: string
}

// Rich media content type database
interface mod_ct_data_rich_media {
    value: string
}

// Number content type database
interface mod_ct_data_number {
    value: number
}

// Range content type database
interface mod_ct_data_range {
    value: number
}

// Repeater content type database
interface mod_ct_data_repeater {
    value: Array<mod_ct_data_text | mod_ct_data_email | mod_ct_data_rich_media | mod_ct_data_number | mod_ct_data_range | mod_ct_data_repeater | mod_ct_data_select | mod_ct_data_date | mod_ct_data_media | mod_ct_data_boolean | mod_ct_data_json>
}

// Select content type database
interface mod_ct_data_select {
    value: Array<string>
}

// Date content type database
interface mod_ct_data_date {
    value: string
}

// Media content type database
interface mod_ct_data_media {
    value: string
}

// Boolean content type database
interface mod_ct_data_boolean {
    value: boolean
}

// JSON content type database
interface mod_ct_data_json {
    value: string // This will have to be stringified JSON as the point of this field is the user can enter any JSON
}