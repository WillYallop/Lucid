// Key: mod_ct_conf_

// TYPES
// 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'

// Text content type config
interface mod_ct_conf_text {
    max_length: number
    min_length: number
}

// Email content type config
interface mod_ct_conf_email {

}

// Rich media content type config
interface mod_ct_conf_rich_media {

}

// Number content type config
interface mod_ct_conf_number {

}

// Range content type config
interface mod_ct_conf_range {
    max_range: number
    min_range: number
}

// Repeater content type config
interface mod_ct_conf_repeater {
    max_repeats: number
}

// Select content type config
interface mod_ct_conf_select {

}

// Date content type config
interface mod_ct_conf_date {

}

// Media content type config
interface mod_ct_conf_media {

}

// Boolean content type config
interface mod_ct_conf_boolean {

}

// JSON content type config
interface mod_ct_conf_json {

}