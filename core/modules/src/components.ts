{
    const fs = require('fs');
    const path = require('path');
    const { v4: uuidv4 } = require('uuid');

    const themeDirectory = path.resolve(__dirname, '../../../theme');

    // Modules
    const { validateFields } = require('./validate')

    const verifyFileExists = require('./verify-file')

    // Data
    const errorCodeKey = 'component_';

    // Types


    // Functions

    // ------------------------------------ ------------------------------------
    // return an array of all components within the theme directory
    // ------------------------------------ ------------------------------------
    async function getComponentNames() {
        const fileType = '.twig';
        let files = await fs.readdirSync(`${themeDirectory}/components`);
        var fileNames: Array<string> = [];
        files.forEach((file: string) => {
            if(path.extname(file).toLowerCase() === fileType) fileNames.push(file);
        });
        return fileNames;
    }

    // ------------------------------------ ------------------------------------
    // return unregistered components
    // ------------------------------------ ------------------------------------
    async function getUnregisteredComponents() {
        let components = await getComponentNames();
        if(components.length) {
            var response: com_unregisterComponentRes = {
                has_components: true,
                unregistered: []
            };
            let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
            let componentsConfig: Array<com_componentObj> = JSON.parse(componentsConfigRaw);
            components.forEach((filename) => {
                let findComponent = componentsConfig.find( x => x.file_name === filename);
                if(!findComponent) response.unregistered.push(filename);
            });
            return response;
        }
        else {
            return {
                has_components: false,
                unregistered: []
            }
        }
    }

    // ------------------------------------ ------------------------------------
    // return registered components
    // ------------------------------------ ------------------------------------
    async function getRegisteredComponents(mode: 'names' | 'data') {
        // Mode: names | data
        let components = await getComponentNames();
        if(components.length) {
            var componentsResponse: com_registeredComponentRes = {
                has_components: true,
                unregistered: [],
                registered: []
            };
            let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
            let componentsConfig: Array<com_componentObj> = JSON.parse(componentsConfigRaw);

            components.forEach((filename: string) => {
                let findComponent = componentsConfig.find( x => x.file_name === filename);
                if(findComponent) {
                    if(mode === 'names') componentsResponse.registered.push(filename);
                    else if(mode === 'data') componentsResponse.registered.push(findComponent);
                    else {}
                }
                else componentsResponse.unregistered.push(filename);
            });
            return componentsResponse;
        }
        else return {
            has_components: false,
            unregistered: [],
            registered: []
        }
    }

    // ------------------------------------ ------------------------------------
    // register a new component
    // ------------------------------------ ------------------------------------
    async function registerNewComponent(data: com_registerCompInp) {
        // includes: 
        // name: String, description: String, file_name: String

        const file_name = data.file_name;

        // Get components.json
        let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
        var componentsConfig: Array<com_componentObj> = JSON.parse(componentsConfigRaw);

        // Res obj
        var response: com_registerComponentRes = {
            valid: true,
            errors: []
        }

        // Verify name and description data
        let verifyData = await validateFields([
            {
                method: 'com_name',
                value: data.name
            },
            {
                method: 'com_description',
                value: data.description
            }
        ]);

        // Verify file_name exists in theme directory, and doesnt have an entry in the components.json
        if(file_name) {
            let verifyFileRes = await verifyFileExists(`${themeDirectory}/components/${file_name}`);
            if(!verifyFileRes) response.errors.push({ code: `${errorCodeKey}not_found`, msg: `Cannot find component with file_name of ${file_name} in the theme directory!` }), response.valid = false;
            let findComponentRes = await componentsConfig.find( x => x.file_name === file_name);
            if(findComponentRes) response.errors.push({ code: `${errorCodeKey}exists_already`, msg: `It seems the component with file_name of ${file_name} has already been registered!` }), response.valid = false;
        }
        else response.errors.push({ code: `${errorCodeKey}file_name_missing`, msg: `You must enter a valid file_name!` }), response.valid = false;

        // Valid
        if(verifyData.valid && response.valid) {
            // Base component object
            let componentObj: com_componentObj = {
                id: uuidv4(),
                file_name: file_name,
                name: data.name,
                description: data.description,
                preview_url: '',
                date_added: new Date().toString(),
                date_modified: new Date().toString(),
                fields: []
            }

            componentsConfig.push(componentObj)
            response.component = componentObj
            // write data
            let writeData = JSON.stringify(componentsConfig)
            fs.writeFileSync(`${themeDirectory}/config/components.json`, writeData)
            return response
        } else {
            response.errors = response.errors.concat(verifyData.errors)
            return response
        }
    }


    module.exports =  {
        getRegisteredComponents,
        getUnregisteredComponents,
        getComponentNames,
        registerNewComponent
    };
}