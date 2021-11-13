{

    const fse = require('fs-extra');
    const path = require('path');
    const distAppTempDirectory = path.resolve(__dirname, '../../../../temp/generate');
    const distAppDirectory = path.resolve(__dirname, '../../../../dist/app');
    const themeDirectory = path.resolve(__dirname, '../../../../theme');

    // Copy over the static theme directory files to app dist
    const copyStatic = async () => {
        try {
            await fse.copy(`${themeDirectory}/static`, distAppDirectory); // Copy temp to app dist
            return true
        }
        catch(err) {
            throw({
                exit: true,
                module: 'gen_copyStatic',
                code: '500',
                message: `Error while copying static theme directory to app dist!`,
                error: err
            });
        }
    }

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

    // Save site pages
    const savePages = async (pages: gen_pagseMap) => {
        try {
            // Save new site to a temp directory
            for (const [key, value] of pages.entries()) {
                await fse.outputFile(`${distAppTempDirectory}${value.path}`, value.markup); 
                console.log(`Page "${value.slug}" has been created!`)
            }
            await fse.rmdirSync(distAppDirectory, { recursive: true }); // Wipe app dist
            await fse.copy(distAppTempDirectory, distAppDirectory); // Copy temp to app dist
            await fse.rmdirSync(distAppTempDirectory, { recursive: true }); // Wipe temp directory
            return true
        }
        catch(err) {
            await fse.rmdirSync(distAppTempDirectory, { recursive: true }); // Wipe temp directory
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
        createSitemap,
        copyStatic
    }
}