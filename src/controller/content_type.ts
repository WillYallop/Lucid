import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray, __convertStringLowerUnderscore } from './helper/shared';
import merge from 'lodash/merge';

// ------------------------------------ ------------------------------------
// save single component content type
// ------------------------------------ ------------------------------------
const saveSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_saveSingleInp): Promise<cont_cont_saveSingleRes> => {
    // Check if file ith component ID exists in theme/config/content_types and save a single component content type object to it
    // Else create the file and save a single component content type object to it
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'cont_name',
            value: __convertStringLowerUnderscore(contentType.name) // only the contentType.name is user inputted, so we assume the rest is correct
        }
    ]);
    if (verifyData.valid) {
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let findComponent = componentData.find(x => x._id === componentID);
        if (findComponent) {

            // Create the content type object 
            let contentTypeObj: mod_contentTypesConfigModel = {
                _id: uuidv1(),
                name: __convertStringLowerUnderscore(contentType.name),
                type: contentType.type,
                config: contentType.config
            };

            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
            let findDuplicateName = contentTypeFileData.findIndex(x => x.name === contentTypeObj.name);
            if (findDuplicateName === -1) {
                // Does not exist
                // Add to array and save
                contentTypeFileData.push(contentTypeObj);
                let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return {
                    saved: response,
                    content_type: contentTypeObj
                }
            }
            else {
                // Exists
                return {
                    saved: false,
                    errors: [
                        {
                            code: 403,
                            origin: 'contentTypeController.saveSingle',
                            title: 'Content Type Name Taken',
                            message: `Content type with name "${__convertStringLowerUnderscore(contentType.name)}" has already been registered.`
                        }
                    ]
                }
            }
        }
        else {
            return {
                saved: false,
                errors: [
                    {
                        code: 404,
                        origin: 'contentTypeController.saveSingle',
                        title: 'Component Not Found',
                        message: `Cannot get component with ID: "${componentID}" because it cannot be found!`
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
// get all component content types data
// ------------------------------------ ------------------------------------
const getAll = async (componentID: mod_componentModel["_id"]): Promise<cont_cont_getAllRes> => {
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        }
    ]);
    if (verifyData.valid) {
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        return {
            success: true,
            content_types: contentTypeFileData
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

const getSingle = async (componentID: mod_componentModel["_id"], _id: mod_contentTypesConfigModel["_id"]): Promise<cont_cont_getSingleRes> => {
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'uuidVerify',
            value: _id
        }
    ]);
    if (verifyData.valid) {
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        // Find single
        let findContentType = contentTypeFileData.find( x => x._id === _id);
        if(findContentType) 
        {
            return {
                success: true,
                content_type: findContentType
            }
        }
        else {
            return {
                success: false,
                errors: [
                    {
                        code: 404,
                        origin: 'contentTypeController.getSingle',
                        title: 'Content Type Not Found',
                        message: `Cannot find content type with ID: "${_id}" for component with ID: "${componentID}"!`
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
// delete single component content type
// ------------------------------------ ------------------------------------
const deleteSingle = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]): Promise<cont_cont_deleteSingleRes> => {
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'uuidVerify',
            value: contentTypeID
        }
    ]);
    if (verifyData.valid) {
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        let findContentTypeIndex = contentTypeFileData.findIndex(x => x._id === contentTypeID);
        if (findContentTypeIndex != -1) {
            // Remove from array and write to file
            contentTypeFileData.splice(findContentTypeIndex, 1);
            let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
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
                        origin: 'contentTypeController.deleteSingle',
                        title: 'Content Type Not Found',
                        message: `Cannot delete content type with ID: "${contentTypeID}" for component with ID: "${contentTypeID}" because it cannot be found!`
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
// update single component content type
// ------------------------------------ ------------------------------------
const updateSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp): Promise<cont_cont_updateSingleRes> => {
    if (Object.entries(contentType).length) {
        // Base validation object
        let validateObj: Array<vali_validateFieldObj> = [
            {
                method: 'uuidVerify',
                value: componentID
            },
            {
                method: 'uuidVerify',
                value: contentType._id
            }
        ];
        // Build out the validate object
        for (const [key, value] of Object.entries(contentType)) {
            switch (key) {
                case 'name': {
                    validateObj.push({
                        method: 'cont_name',
                        value: __convertStringLowerUnderscore(value)
                    });
                    break;
                }
                case 'type': {

                    break;
                }
                case 'config': {

                    break;
                }
            }
        }
        if(contentType.name) contentType.name = __convertStringLowerUnderscore(contentType.name);
        // Validate
        let verifyData = await validate(validateObj);
        // Update data
        if (verifyData.valid) {
            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
            let findContentTypeIndex = contentTypeFileData.findIndex(x => x._id === contentType._id);
            if (findContentTypeIndex != -1) {
                // Check object with same name doesnt exists - this has to be unique!
                if(contentType.name != undefined) {
                    let nameExistsIndex = contentTypeFileData.findIndex( x => x.name ===  contentType.name && x._id != contentType._id );
                    if(nameExistsIndex != -1) {
                        // Exists
                        return {
                            updated: false,
                            errors: [
                                {
                                    code: 409,
                                    origin: 'contentTypeController.updateSingle',
                                    title: 'Content Type Name Exists',
                                    message: `Content type with name: "${contentType.name}" already exists! Please choose another name!`
                                }
                            ]
                        }
                    }
                }
                // Update object and save
                let newContentTypeObj: mod_contentTypesConfigModel = merge(contentTypeFileData[findContentTypeIndex], contentType);
                contentTypeFileData[findContentTypeIndex] = newContentTypeObj;
                let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return {
                    updated: response,
                    content_type: contentTypeFileData[findContentTypeIndex]
                }
            }
            else {
                return {
                    updated: false,
                    errors: [
                        {
                            code: 404,
                            origin: 'contentTypeController.updateSingle',
                            title: 'Content Type Not Found',
                            message: `Cannot find content type with ID: "${contentType._id}" for component ID: "${componentID}" to update!`
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



export {
    saveSingle,
    getAll,
    getSingle,
    deleteSingle,
    updateSingle
}