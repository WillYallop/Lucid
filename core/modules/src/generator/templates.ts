{

    // require
    const path = require('path');
    const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
    const templateDir = path.resolve(__dirname, '../../../../theme/templates');
    const loader = new TwingLoaderFilesystem(templateDir);
    const twing = new TwingEnvironment(loader);
    const { getTemplateFileNames } = require('../theme');

    const generateTemplates = async () => {
        try {
            const templateMap: gen_templatesMap = new Map();
            // GET GLOBAL DATA - THIS IS PASSED DOWN TO THE TEMPLATE
            const data = {
                global: {}
            }
            const templates: Array<string> = await getTemplateFileNames(); // GET ALL TEMPLATES
            // Build templates out
            for (const template of templates) {
                let output = await twing.render(template, data)
                templateMap.set(template, {
                    markup: output
                })
            }
            return templateMap
        }
        catch(err) {
            throw({
                exit: true,
                module: 'gen_generateTemplates',
                code: '500',
                message: `Error while building templates markup!`,
                error: err
            });
        }
    }

    module.exports = {
        generateTemplates
    }
}