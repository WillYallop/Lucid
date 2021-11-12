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
    const { compilePage, unescapeMarkup } = require('./generator/compiler/main');

    // Handles generating the app
    const generateApp = async () => {
        const pageList: Array<gen_pageListRes> = await getPageList(); // grab all pages and posts along with their data
        const templates = await generateTemplates(); // Generate all templates 
        const pages = new Map(); // Create pages map
        // Generate pages
        for (const page of pageList) {
            let pageData = await getPage(page); // get single page data
            let components = await generateComponents(pageData.components); // generate components
            let markup = await compilePage({ // Generate final page markdown
                template: templates.get(pageData.template),
                components: components,

                // These are temp for testing
                head: `<title>${pageData.name}</title>`,
                footer: '<script> console.log("footer markdown") </script>'
            });
            let strippedMarkup = await unescapeMarkup(markup);

            pages.set(pageData.id, {
                slug: pageData.slug,
                markup: strippedMarkup
            })
        }
        return pages
    }

    module.exports = {
        generateApp
    }
}