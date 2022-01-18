import { getSingleFileContent, writeSingleFile, listDirectoryFiles } from './theme';
import { __generateErrorString } from './helper/shared';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import merge from 'lodash/merge';


// ------------------------------------ ------------------------------------
// delete single component
// ------------------------------------ ------------------------------------
// This doesnt remove the component file.liquid, it just unregisteres in from the components collection that stores its info and fields.
const deleteSingle = async (_id: mod_componentModel["_id"]) => {
    try {
        const origin = 'componentController.deleteSingle';
        // Validate the ID
        await validate([
            {
                method: 'uuidVerify',
                value: _id
            }
        ]);
        // theme/components.json
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let componentIndex = componentData.findIndex( x => x._id === _id);
        if(componentIndex != -1) {
            // Remove from array and write to file
            componentData.splice(componentIndex, 1);
            await writeSingleFile('/config/components.json', 'json', componentData);
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot delete component with ID: "${_id}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// update single component
// ------------------------------------ ------------------------------------
// Handles updating a component, all fields must pass validation first, can pass any amount of value to update
// TO DO - add validation to the preview_url and fields paramaters
const updateSingle = async (_id: mod_componentModel["_id"], data: cont_comp_updateSingleInp): Promise<mod_componentModel> => {
    try {
        const origin = 'componentController.updateSingle';
        if(Object.entries(data).length) {
            let validateObj: Array<vali_validateFieldObj> = [
                {
                    method: 'uuidVerify',
                    value: _id
                }
            ];
            // Build out the validate object
            for (const [key, value] of Object.entries(data)) {
                switch(key) {
                    case 'name': {
                        validateObj.push({
                            method: 'comp_name',
                            value: value
                        });
                        break;
                    }
                    case 'description': {
                        validateObj.push({
                            method: 'comp_description',
                            value: value
                        });
                        break;
                    }
                    case 'preview_url': {
    
                        break;
                    }
                }
            }
            // Validate
            await validate(validateObj);

            // theme/components.json
            let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
            // Make sure it exists elseo throw
            let findCompIndex = componentData.findIndex( x => x._id === _id );
            if(findCompIndex != -1) {
                // Update object and save
                let newCompObj: mod_componentModel = merge(componentData[findCompIndex], data);
                componentData[findCompIndex] = newCompObj;
                await writeSingleFile('/config/components.json', 'json', componentData);
                return componentData[findCompIndex]
            }
            else {
                throw __generateErrorString({
                    code: 404,
                    origin: origin,
                    message: `Cannot find component with ID: "${_id}" to update!`
                });
            }
        }
        else {
            throw __generateErrorString({
                code: 403,
                origin: origin,
                message: 'No paramaters passed to componentController.updateSingle() function!'
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// register a new component
// ------------------------------------ ------------------------------------
// Will handle saving a new component 
const saveSingle = async (data: cont_comp_saveSingleInp): Promise<mod_componentModel> => {
    try {
        const origin = 'componentController.saveSingle';
        // Validate the data
        await validate([
            {
                method: 'comp_name',
                value: data.name
            },
            {
                method: 'comp_description',
                value: data.description
            },
            {
                method: 'comp_verifyFileExists',
                value: data.file_path
            },
        ]);
        // theme/components.json
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        // Make sure it doesnt exist, else throw
        let findComponent = componentData.findIndex( x => x.file_path === data.file_path );
        if(findComponent === -1) {
            // Base component object
            let componentObj: mod_componentModel = {
                _id: uuidv1(),
                file_name: data.file_path.replace(/^.*[\\\/]/, ''),
                file_path: data.file_path,
                name: data.name,
                description: data.description,
                preview_url: '',
                date_added: new Date().toString(),
                date_modified: new Date().toString()
            }
            // Add to array and save
            componentData.push(componentObj);
            await writeSingleFile('/config/components.json', 'json', componentData);
            return componentObj
        }
        else {
            throw __generateErrorString({
                code: 403,
                origin: origin,
                message: `Component with the file_path: "${data.file_path}" has already been registered. Please use the componentController.updateSingle() function!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get single component
// ------------------------------------ ------------------------------------
const getSingleByID = async (_id: mod_componentModel["_id"]): Promise<mod_componentModel> => {
    try {
        const origin = 'componentController.getSingleByID';
        // Verify ID
        // Get component data
        // Return component
        await validate([
            {
                method: 'uuidVerify',
                value: _id
            }
        ]);
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let findComponent = componentData.find( x => x._id === _id );
        if(findComponent) {
            return findComponent
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot get component with ID: "${_id}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get multiple components
// ------------------------------------ ------------------------------------
const getMultiple = async (limit: number, skip: number): Promise<Array<mod_componentModel>> => {
    try {
        const origin = 'componentController.getMultiple';
        // Validate inputs are numbers
        // Get component data
        // Splice items before the skip value index
        // Return component array
        if(typeof limit != 'number' && typeof skip != 'number') {
            throw __generateErrorString({
                code: 400,
                origin: origin,
                message: `Type of limit and skip paramater must be "number"! Not "${typeof limit}" and "${typeof skip}"!`
            });
        }
        // Process
        else {
            // Get component data
            let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
            componentData.splice(0, skip);
            componentData.splice(limit);
            return componentData
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get unregistered components
// ------------------------------------ ------------------------------------
const getUnregistered = async (): Promise<cont_comp_getUnregisteredRes> => {
    try {
        let unregisteredComponents: Array<cont_the_listDirectoryFiles> = [];
        let componentFiles = await listDirectoryFiles('/components');
        // Get all registed components from the config/components.json file and compare against these paths to find no registered.
        let registeredComponents: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        componentFiles.forEach((component) => {
            // Remove the /components/ from the file_path res
            component.file_path = component.file_path.replace('/components/', '');
            let findMatch = registeredComponents.findIndex( x => x.file_path === component.file_path);
            if(findMatch != -1) {
                // Is unregistered!
                unregisteredComponents.push(component);
            }
        });
        return {
            unregistered: unregisteredComponents,
            totals: {
                unregistered: unregisteredComponents.length,
                registered: registeredComponents.length
            }
        }
    }
    catch(err) {
        throw err;
    }
}


export {
    saveSingle,
    updateSingle,
    deleteSingle,
    getSingleByID,
    getMultiple,
    getUnregistered
}