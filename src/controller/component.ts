import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray } from './helper/shared';
import merge from 'lodash/merge';


// ------------------------------------ ------------------------------------
// delete single component
// ------------------------------------ ------------------------------------
// This doesnt remove the component file.liquid, it just unregisteres in from the components collection that stores its info and fields.
const deleteSingle = async (_id: mod_componentModel["_id"]): Promise<cont_comp_deleteSingleRes> => {
    // Validate the ID
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: _id
        }
    ]);
    if(verifyData.valid) {
        // theme/components.json
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let componentIndex = componentData.findIndex( x => x._id === _id);
        if(componentIndex != -1) {
            // Remove from array and write to file
            componentData.splice(componentIndex, 1);
            let response = await writeSingleFile('/config/components.json', 'json', componentData);
            return {
                deleted: response
            }
        }
        else {
            return {
                deleted: false,
                errors: [
                    {
                        code: 404,
                        origin: 'componentController.deleteSingle',
                        title: 'Component Not Found',
                        message: `Cannot delete component with ID: "${_id}" because it cannot be found!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            deleted: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// update single component
// ------------------------------------ ------------------------------------
// Handles updating a component, all fields must pass validation first, can pass any amount of value to update
// TO DO - add validation to the preview_url and fields paramaters
const updateSingle = async (_id: mod_componentModel["_id"], data: cont_comp_updateSingleInp): Promise<cont_comp_updateSingleRes> => {
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
        let verifyData = await validate(validateObj);
        // Update data
        if(verifyData.valid) {
            // theme/components.json
            let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');

            // Make sure it exists elseo throw
            let findCompIndex = componentData.findIndex( x => x._id === _id );
            if(findCompIndex != -1) {
                // Update object and save
                let newCompObj: mod_componentModel = merge(componentData[findCompIndex], data);
                componentData[findCompIndex] = newCompObj;
                let response = await writeSingleFile('/config/components.json', 'json', componentData);
                return {
                    updated: response,
                    component: componentData[findCompIndex]
                }
            }
            else {
                return {
                    updated: false,
                    errors: [
                        {
                            code: 404,
                            origin: 'componentController.updateSingle',
                            title: 'Component Not Found',
                            message: `Cannot find component with ID: "${_id}" to update!`
                        }
                    ]
                }
            }
        }
        else {
            // Define custom errors
            let errors: Array<core_errorMsg> = [];
            return {
                updated: false,
                errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
            }
        }
    }
    else {
        return {
            updated: false,
            errors: [
                {
                    code: 403,
                    origin: 'componentController.updateSingle',
                    title: 'No Paramaters',
                    message: 'No paramaters passed to componentController.updateSingle() function!'
                }
            ]
        }
    }
}

// ------------------------------------ ------------------------------------
// register a new component
// ------------------------------------ ------------------------------------
// Will handle saving a new component 
const saveSingle = async (data: cont_comp_saveSingleInp): Promise<cont_comp_saveSingleRes> => {
    // Validate the data
    let verifyData = await validate([
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
    // Validate input data
    if(verifyData.valid) {
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
            let response = await writeSingleFile('/config/components.json', 'json', componentData);
            return {
                saved: response,
                component: componentObj
            }
        }
        else {
            return {
                saved: false,
                errors: [
                    {
                        code: 403,
                        origin: 'componentController.saveSingle',
                        title: 'Component Already Registered',
                        message: `Component with the file_path: "${data.file_path}" has already been registered. Please use the componentController.updateSingle() function!`
                    }
                ]
            }
        }

    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            saved: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// get single component
// ------------------------------------ ------------------------------------
const getSingleByID = async (_id: mod_componentModel["_id"]): Promise<cont_comp_getSingleByIDRes> => {
    // Verify ID
    // Get component data
    // Return component
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: _id
        }
    ]);
    if(verifyData.valid) {

        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let findComponent = componentData.find( x => x._id === _id );
        if(findComponent) {
            return {
                success: true,
                component: findComponent
            }
        }
        else {
            return {
                success: false,
                errors: [
                    {
                        code: 404,
                        origin: 'componentController.getSingleByID',
                        title: 'Component Not Found',
                        message: `Cannot get component with ID: "${_id}" because it cannot be found!`
                    }
                ]
            }

        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            success: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// get multiple components
// ------------------------------------ ------------------------------------
const getMultiple = async (limit: number, skip: number): Promise<cont_comp_getMultipleRes> => {
    // Validate inputs are numbers
    // Get component data
    // Splice items before the skip value index
    // Return component array
    if(typeof limit != 'number' && typeof skip != 'number') {
        return {
            success: false,
            errors: [
                {
                    code: 400,
                    origin: 'componentController.getMultiple',
                    title: 'Type Error',
                    message: `Type of limit and skip paramater must be "number"! Not "${typeof limit}" and "${typeof skip}"!`
                }
            ]
        }
    }
    // Process
    else {
        // Get component data
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        componentData.splice(0, skip);
        componentData.splice(limit);
        return {
            success: true,
            components: componentData
        }
    }
}

export {
    saveSingle,
    updateSingle,
    deleteSingle,
    getSingleByID,
    getMultiple
}