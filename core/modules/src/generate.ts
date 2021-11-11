// Handles the generation of the site

// TEMP
// Build out all components for every page
// Build out the template pages
// Then
// Search the template page for a few custom tags ie: willpress, willpressHead, willpressFooter
// Replace willpress with all of the components for that page.

{
    // Modules
    const { getPageList, getPage } = require('./generator/data');
    const { generateComponents } = require('./generator/components');
    const { generateTemplates } = require('./generator/templates');

    // Handles generating the app
    const generateApp = async () => {
        // grab all pages and posts along with their data
        const pageList: Array<gen_pageListRes> = await getPageList();
        // Generate all templates 
        const templates = await generateTemplates();
        // Create pages map
        const pages = new Map();
        // Generate pages
        for (const page of pageList) {
            let pageData = await getPage(page);
            // generate components
            let components = await generateComponents(pageData.components)
            console.log(components)
        }
        return templates
    }

    module.exports = {
        generateApp
    }
}