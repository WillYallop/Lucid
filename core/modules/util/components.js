const fs = require('fs');
const path = require('path');

const themeDirectory = path.resolve(__dirname, '../../theme');

const componentsConfig = require('../../theme/config/components.json');

// ------------------------------------ ------------------------------------
// return an array of all components within the theme directory
// ------------------------------------ ------------------------------------
function getComponentNames() {
    return new Promise((resolve) => {
        fs.readdir(`${themeDirectory}/components`, (err, files) => {
            var fileNames = [];
            files.forEach((file) => {
                fileNames.push(file);
            });
            resolve(fileNames);
        });
    })
}

// ------------------------------------ ------------------------------------
// return unregistered components
// ------------------------------------ ------------------------------------
async function getUnregisteredComponents() {
    let components = await getComponentNames();
    if(components.length) {
        var response = {
            has_components: true,
            unregistered: []
        };
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
async function getRegisteredComponents(mode) {
    // Mode: names | data

    let components = await getComponentNames();
    if(components.length) {
        var componentsResponse = {
            has_components: true,
            unregistered: [],
            registered: []
        };
        components.forEach((filename) => {
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


module.exports =  {
    getRegisteredComponents,
    getUnregisteredComponents,
    getComponentNames
};