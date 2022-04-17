export default {
    // Components
    comp_name: /^[A-Za-z \-\!,?._'"@]{2,60}$/,
    comp_description: /^[A-Za-z \-\!,?._'@]{0,400}$/,
    // Posts
    post_name: /^[A-Z_a-z]{2,100}$/,
    cont_name: /^[A-Z_a-z ]{2,100}$/,
    // Menu
    menu_name: /^[A-Z_a-z]{2,100}$/,
    menu_linkText: /^[A-Za-z \-\!,?._'"@]{0,200}$/,
    // Page
    page_name: /^[A-Za-z \-\!?_@]{2,255}$/,
    page_slug: /^[a-z\-\/]{1,255}$/
}