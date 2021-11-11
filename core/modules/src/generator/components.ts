{

    // requite
    const path = require('path');
    const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
    const templateDir = path.resolve(__dirname, '../../../theme/components');
    const loader = new TwingLoaderFilesystem(templateDir);
    const twing = new TwingEnvironment(loader);

    const format = (html: string) => {
        return html.replace(/\r?\n|\rs/g, '');
        // return res.replace(/\s/g, ' ').trim()
    }

    const generateDataField = async (fields: Array<mod_compField>) => {
        let response:any = {}
        for (const field of fields) {
            response[field.name] = field.data
        }
        return response
    }

    const generateComponents = async (components: Array<mod_componentData>) => {
        const componentsMap = new Map();

        // Build templates out
        for (const component of components) {
            const data = await generateDataField(component.fields);
            await twing.render(component.file_name, data)
            .then((output: string) => {
                // console.log(output);
                componentsMap.set(component.name, {
                    id: component.id,
                    markup: format(output)
                })
            });
        }
        return componentsMap
    }

    module.exports = {
        generateComponents
    }
}