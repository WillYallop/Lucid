{

    const fse = require('fs-extra');
    const path = require('path');
    const distAppDirectory = path.resolve(__dirname, '../../../../dist/app');

    // Create and save sitemap
    const createSitemap = async () => {

    }

    // Save all pages
    type savePagesPageMap = Map<string, {
        slug: string
        path: string
        markup: string
    }>
    const savePages = async (pages: savePagesPageMap) => {
        try {
            for (const [key, value] of pages.entries()) {
                await fse.outputFile(`${distAppDirectory}${value.path}`, value.markup); 
                console.log(`Page "${value.slug}" has been created!`)
            }
            return true
        }
        catch(err) {
            console.log(err)
            return false
        }
    }

    module.exports = {
        savePages,
        createSitemap
    }
}