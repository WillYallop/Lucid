// Handles the generation of the site

// TEMP
// Build out all components for every page
// Build out the template pages
// Then
// Search the template page for a few custom tags ie: willpress, willpressHead, willpressFooter
// Replace willpress with all of the components for that page.

{
    // Modules
    const { getPageList, getPage } = require('./data');
    const { generateComponents } = require('./components');
    const { generateTemplates } = require('./templates');
    const { compilePage, unescapeMarkup } = require('./compiler/main');
    const { savePages, createSitemap } = require('./save');

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
                seo: templates.get(pageData.seo),
                components: components,

                // These are temp for testing
                head: `<title>${pageData.name}</title>`,
                footer: '<script> console.log("footer markdown") </script>'
            });
            pages.set(pageData.id, {
                slug: pageData.slug,
                path: pageData.path,
                markup: markup
            })
        }
        
        await savePages(pages) // Save pages
        await createSitemap(pages) // Create/Save sitemap

        return pages
    }

    module.exports = {
        generateApp
    }
}