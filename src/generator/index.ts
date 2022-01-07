import { componentCompiler, pageCompiler } from './compiler';
import { savePages, createSitemap, buildDefaultApp, copyStatic } from '../controller/dist';


// Handle statically generate the app
const generateApp = async (pages: Array<gen_generateAppInp>): Promise<gene_generateAppRes> => {
    try {
        // Start timer
        const start = Date.now();
        const builtPages: gene_pagseMap = new Map();
        
        // If we have pages passed down generate them,
        // Else only copy over static files and create a default get started page for the index.
        if(pages.length) {
            // Generate pages
            for (const page of pages) {

                // Compile page components
                const components = await componentCompiler(page.components); // generate components

                // Compile page - replaces all custom element tags with component data, seo etc.
                const markup = await pageCompiler({
                    template: page.template,
                    seo: page.seo,
                    components: components,

                    // These are temp for testing
                    head: `<link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">`,
                    script: '<script> console.log("footer markdown") </script>'
                });
                
                // Add new built page entry in builtPages map!
                builtPages.set(page._id, {
                    slug: page.slug,
                    markup: markup
                });
            }
            // Post Build If we have pages
            await savePages(builtPages) // Save pages
            await createSitemap(builtPages) // Create/Save sitemap
        }
        else await buildDefaultApp();

        // Copy static files over
        await copyStatic();

        // Stop Timer
        const stop = Date.now();

        return {
            build_time: (stop - start)/1000,
            pages_built: builtPages.size
        }
    }
    catch(err) {
        throw err
    }
}

// Handle generating single component, this returns the markup and does not save to file system
const generateComponents = async (components: Array<gen_generateAppInpComponentModel>): Promise<gene_componentsMap> => {
    try {
        const componentsMap = await componentCompiler(components); // generate components
        return componentsMap;
    }
    catch(err) {
        throw err;
    }
}

export {
    generateApp,
    generateComponents
};