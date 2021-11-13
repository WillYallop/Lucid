{

    const fse = require('fs-extra');
    const path = require('path');
    const distAppDirectory = path.resolve(__dirname, '../../../../dist/app');

    // Create and save sitemap
    const createSitemap = async () => {
        try {

        }
        catch(err) {
            throw({
                exit: true,
                module: 'gen_createSitemap',
                code: '500',
                message: `Error generating a sitemap`,
                error: err
            });
        }
    }

    const savePages = async (pages: gen_pagseMap) => {
        try {
            for (const [key, value] of pages.entries()) {
                await fse.outputFile(`${distAppDirectory}${value.path}`, value.markup); 
                console.log(`Page "${value.slug}" has been created!`)
            }
            return true
        }
        catch(err) {
            throw({
                exit: true,
                module: 'gen_savePages',
                code: '500',
                message: `Error while writing pages to app dist!`,
                error: err
            });
        }
    }

    module.exports = {
        savePages,
        createSitemap
    }
}