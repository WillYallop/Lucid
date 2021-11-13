{
    const fs = require('fs');
    const path = require('path');
    const { v4: uuidv4 } = require('uuid');

    const themeDirectory = path.resolve(__dirname, '../../../theme');

    // Modules
    const validateComponentName = require('./validation/components/name')
    const validateComponentDescription = require('./validation/components/description')
    const verifyFileExists = require('./verify-file')

    // Data
    const errorCodeKey = 'component_';

    // Types


    // Functions

    // ------------------------------------ ------------------------------------
    // return an array of all components within the theme directory
    // ------------------------------------ ------------------------------------
    async function getComponentNames() {
        let files = await fs.readdirSync(`${themeDirectory}/components`);
        var fileNames: Array<string> = [];
        files.forEach((file: string) => {
            fileNames.push(file);
        });
        return fileNames;
    }

    // ------------------------------------ ------------------------------------
    // return unregistered components
    // ------------------------------------ ------------------------------------
    interface unregisterResponse {
        has_components: boolean,
        unregistered: Array<string>
    }
    async function getUnregisteredComponents() {
        let components = await getComponentNames();
        if(components.length) {
            var response: unregisterResponse = {
                has_components: true,
                unregistered: []
            };
            let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
            let componentsConfig: Array<conifgRegisteredComponentObj> = JSON.parse(componentsConfigRaw);
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
    interface registeredComponentsResponse {
        has_components: boolean,
        unregistered: Array<string>,
        registered: Array<conifgRegisteredComponentObj | string>
    }
    async function getRegisteredComponents(mode: 'names' | 'data') {
        // Mode: names | data
        let components = await getComponentNames();
        if(components.length) {
            var componentsResponse: registeredComponentsResponse = {
                has_components: true,
                unregistered: [],
                registered: []
            };
            let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
            let componentsConfig: Array<conifgRegisteredComponentObj> = JSON.parse(componentsConfigRaw);

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
    interface componentDataInpConfig {
        name: string,
        description: string,
        file_name: string
    }
    interface errorResponse {
        code: string,
        msg: string
    }
    interface registerComponentRes {
        valid: boolean,
        component?: conifgRegisteredComponentObj,
        errors: Array<errorResponse>
    }
    async function registerNewComponent(data: componentDataInpConfig) {
        // includes: 
        // name: String, description: String, file_name: String

        const file_name = data.file_name

        // Get components.json
        let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`) ;
        var componentsConfig: Array<conifgRegisteredComponentObj> = JSON.parse(componentsConfigRaw);


        // Res obj
        var response: registerComponentRes = {
            valid: true,
            errors: []
        }

        // Verify name and description
        var verifyNameRes = await validateComponentName(data.name);
        if(!verifyNameRes.valid) response.errors = response.errors.concat(verifyNameRes.errors), response.valid = false;
        var verifyDescRes = await validateComponentDescription(data.description)
        if(!verifyDescRes.valid) response.errors = response.errors.concat(verifyDescRes.errors), response.valid = false;

        // Verify file_name exists in theme directory, and doesnt have an entry in the components.json

        if(file_name) {
            let verifyFileRes = await verifyFileExists(`${themeDirectory}/components/${file_name}`);
            if(!verifyFileRes) response.errors.push({ code: `${errorCodeKey}not_found`, msg: `Cannot find component with file_name of ${file_name} in the theme directory!` }), response.valid = false;
            let findComponentRes = await componentsConfig.find( x => x.file_name === file_name);
            if(findComponentRes) response.errors.push({ code: `${errorCodeKey}exists_already`, msg: `It seems the component with file_name of ${file_name} has already been registered!` }), response.valid = false;
        }
        else response.errors.push({ code: `${errorCodeKey}file_name_missing`, msg: `You must enter a valid file_name!` }), response.valid = false;


        // If we have passed, create the new component object and write to components.json
        // Else return response
        if(response.valid) {
            // Base component object
            let componentObj: conifgRegisteredComponentObj = {
                id: uuidv4(),
                file_name: file_name,
                name: verifyNameRes.uriComponentEncoded,
                description: verifyDescRes.uriComponentEncoded,
                preview_url: '',
                date_added: new Date().toString(),
                date_modified: new Date().toString(),
                fields: []
            }

            componentsConfig.push(componentObj)
            response.component = componentObj
            // write data
            let data = JSON.stringify(componentsConfig)
            fs.writeFileSync(`${themeDirectory}/config/components.json`, data)
            return response
        }
        else {
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