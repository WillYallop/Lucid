{

    // requite
    const path = require('path');
    const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
    const templateDir = path.resolve(__dirname, '../../../../theme/templates');
    const loader = new TwingLoaderFilesystem(templateDir);
    const twing = new TwingEnvironment(loader);

    const generateTemplates = async () => {
        const templateMap = new Map();
        // GET GLOBAL DATA - THIS IS PASSED DOWN TO THE TEMPLATE
        const data = {
            global: {}
        }
        // GET ALL TEMPLATES
        const templates = [
            'page.twig'
        ]

        // Build templates out
        for (const template of templates) {
            await twing.render(template, data)
            .then((output: string) => {
                // console.log(output);
                templateMap.set(template, {
                    markup: output
                })
            });
        }
        return templateMap
    }

    module.exports = {
        generateTemplates
    }
}