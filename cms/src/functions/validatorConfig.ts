export default {
    // Components
    comp_name: {
        string: `[A-Za-z \-\!,?._'"@]{2,60}`,
        regex: /^[A-Za-z \-\!,?._'"@]{2,60}$/
    },
    comp_description: {
        string: `[A-Za-z \-\!,?._'@]{0,400}`,
        regex: /^[A-Za-z \-\!,?._'@]{0,400}$/
    },
    // Posts
    post_name: {
        string:  `[A-Z_a-z]{2,100}`,
        regex: /^[A-Z_a-z]{2,100}$/
    },
    cont_name: {
        string: `[A-Z_a-z]{2,100}`,
        regex: /^[A-Z_a-z]{2,100}$/
    },
    menu_name: {
        string: `[A-Z_a-z]{2,100}`,
        regex: /^[A-Z_a-z]{2,100}$/
    },
    menu_linkText: {
        string: `[A-Za-z \-\!,?._'"@]{0,200}`,
        regex: /^[A-Za-z \-\!,?._'"@]{0,200}$/
    }
}