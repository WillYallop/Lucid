{

    // requite
    const path = require('path');
    const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
    const templateDir = path.resolve(__dirname, '../../../../theme/components');
    const loader = new TwingLoaderFilesystem(templateDir);
    const twing = new TwingEnvironment(loader);

    const generateDataField = async (fields: Array<mod_compField>) => {
        let response:any = {};
        for (const field of fields) {
            response[field.name] = field.data;
        }
        return response;
    }

    const generateComponents = async (components: Array<mod_componentData>) => {
        try {
            const componentsMap = new Map();
            // Build templates out
            for (const component of components) {
                const data = await generateDataField(component.fields);
                let output = await twing.render(component.file_name, data);
                componentsMap.set(component.name, {
                    id: component.id,
                    markup: output
                });
            }
            return componentsMap;
        }
        catch(err) {
            throw({
                exit: true,
                module: 'gen_generateComponents',
                code: '500',
                message: `Error while generating page components!`,
                error: err
            });
        }
    }

    module.exports = {
        generateComponents
    }
}