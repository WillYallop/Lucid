{
    // Modules
    const { getPageList, getPage } = require('./data');
    const { generateComponents } = require('./components');
    const { generateTemplates } = require('./templates');
    const { compilePage } = require('./compiler/main');
    const { savePages, createSitemap } = require('./save');

    // Handles generating the app
    const generateApp = async () => {
        try {
            const start = Date.now();
            const pages: gen_pagseMap = new Map(); // Create pages map
            const pageList: Array<gen_pageListRes> = await getPageList(); // grab all pages and posts along with their data

            // If we have pages
            if(pageList.length) {
                const templates: gen_templatesMap = await generateTemplates(); // Generate all templates 
                // Generate pages
                for (const page of pageList) {
                    let pageData: pag_pageData = await getPage(page); // get single page data
                    let components: gen_componentsMap = await generateComponents(pageData.components); // generate components
                    let pageTemplate = templates.get(pageData.template);

                    // Error handling
                    if(pageTemplate === undefined || typeof pageTemplate.markup !== 'string') {
                        throw({
                            exit: true,
                            module: 'gen_generateApp',
                            code: pageTemplate === undefined ? '404' : '500',
                            message: pageTemplate === undefined ? `Template "${pageData.template}"" for page ID "${pageData.id}" was not found!` : `Template "${pageData.template}"" for page ID "${pageData.id}", markup is not typeof string!`
                        });
                    }

                    // 
                    let markup: string = await compilePage({ // Generate final page markdown
                        template: pageTemplate,
                        seo: pageData.seo,
                        components: components,
        
                        // These are temp for testing
                        head: `<title>${pageData.name}</title>`,
                        footer: '<script> console.log("footer markdown") </script>'
                    });
                    pages.set(pageData.id, {
                        slug: pageData.slug,
                        path: pageData.path,
                        markup: markup
                    });
                }
                
                await savePages(pages) // Save pages
                await createSitemap(pages) // Create/Save sitemap
            }
            
            const stop = Date.now();

            return {
                build_time: (stop - start)/1000,
                pages_built: pages.size
            }
        }
        catch(err) {
            return err
        }
    }

    module.exports = {
        generateApp
    }
}