// KEY: data_template_

// -----------------------------------
// get multiple pages
interface data_template_getAllQuery {
    query: {
        template: {
            get_all: {
                __args: {}
            }
        }
    }
}
interface data_template_getAllQueryRes {
    data: {
        template: {
            get_all: Array<string>
        }
    }
    errors: Array<{
        message: string
    }>
}