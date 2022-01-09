import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray, __convertStringLowerUnderscore } from './helper/shared';
import merge from 'lodash/merge';

/*

EXAMPLE CONTENT_TYPE CONFIG FILE

[
    {
        "_id": "2d3e64d0-64fd-11ec-8688-635a3ff32370",
        "name": "test_text",
        "type": "text",
        "config": {
            "max_length": 0,
            "min_length": 200
        }
    },
    {
        "_id": "445a92a0-64fe-11ec-aab2-15b263b74864",
        "name": "test_number",
        "type": "number",
        "config": {

        }
    },
    {
        "_id": "74cd38a0-6415-11ec-bc21-d53d7ba49e21",
        "name": "test_repeater",
        "type": "repeater",
        "config": {

        },
        "fields": [
            {
                "_id": "5ff5b4ae-70ca-11ec-9817-dfdf56df382f",
                "name": "test_text_2",
                "type": "text",
                "config": {
                    "max_length": 0,
                    "min_length": 200
                }
            },
            {
                "_id": "5acc6cac-70ca-11ec-9816-e327d0e79f79",
                "name": "test_number_2",
                "type": "number",
                "config": {
        
                }
            }
        ]
    }
]

*/


// ------------------------------------ ------------------------------------
// save single component content type
// ------------------------------------ ------------------------------------
const saveSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_saveSingleInp): Promise<cont_cont_saveSingleRes> => {
    // Check if file ith component ID exists in theme/config/content_types and save a single component content type object to it
    // Else create the file and save a single component content type object to it
    let validateArray: Array<vali_validateFieldObj> = [
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'cont_name',
            value: __convertStringLowerUnderscore(contentType.name) // only the contentType.name is user inputted, so we assume the rest is correct
        }
    ];
    // If we are saving a repeater with fields - verify their data as well!
    let newRepeaterFieldArray: Array<mod_contentTypesConfigModel> = [];
    if(contentType.type === 'repeater' && contentType.fields != undefined) {
        for(let i = 0; i < contentType.fields.length; i++) {
            validateArray.push({
                method: 'cont_name',
                value: __convertStringLowerUnderscore(contentType.fields[i].name) 
            });
            newRepeaterFieldArray.push({
                _id: uuidv1(),
                name: __convertStringLowerUnderscore(contentType.fields[i].name),
                type: contentType.fields[i].type,
                config: contentType.fields[i].config
            });
        }
    };

    // Verify
    let verifyData = await validate(validateArray);
    // If valid
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
            if(contentType.type === 'repeater') contentTypeObj.fields = newRepeaterFieldArray;

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
const updateSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp, repeaterField: boolean, repeaterID: mod_contentTypesConfigModel["_id"]): Promise<cont_cont_updateSingleRes> => {
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
           

            // Function to check name for duplicates
            const checkArrayForDuplicateNamesExisting = (arr: Array<mod_contentTypesConfigModel>) => {
                let nameExistsIndex = arr.findIndex( x => x.name ===  contentType.name && x._id != contentType._id );
                if(nameExistsIndex != -1) {
                    // Exists
                    return true;
                }
                else {
                    return false;
                }
            }
            // save data
            const mergeAndSaveContentTypeFileData = async (existing: mod_contentTypesConfigModel, topLevelInd: number, filedLevelInd?: number) => {
                let newContentTypeObj: mod_contentTypesConfigModel = merge(existing, contentType);
                if(repeaterField) {
                    // @ts-ignore: Unreachable code error
                    contentTypeFileData[topLevelInd].fields[filedLevelInd] = newContentTypeObj;
                }
                else {
                    contentTypeFileData[topLevelInd] = newContentTypeObj;
                }
                let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return {
                    response,
                    newContentTypeObj
                };
            }
            const duplicateNameErrorMsg = {
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
            const contentTypeNotFoundErrorMsg = {
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
            
            // content Type Top Level
            let objId = repeaterField ? repeaterID : contentType._id;
            let contentTypeTopLevelIndex = contentTypeFileData.findIndex(x => x._id === objId);
            if(contentTypeTopLevelIndex != -1) {

                // In case of repeaterField = true - get its field object ID that mataches the contentType._id
                if(repeaterField && contentTypeFileData[contentTypeTopLevelIndex].fields != undefined) {
                    // FOR repeater field
                    // Check name doesnt exists in fields array already
                    // @ts-ignore: Unreachable code error
                    if(checkArrayForDuplicateNamesExisting(contentTypeFileData[contentTypeTopLevelIndex].fields)) {
                        return duplicateNameErrorMsg;
                    }
                    // @ts-ignore: Unreachable code error
                    let contentTypeFieldIndex = contentTypeFileData[contentTypeTopLevelIndex].fields.findIndex(x => x._id ===  contentType._id);
                    if(contentTypeFieldIndex != -1) {
                        // Merge and save data!
                        // @ts-ignore: Unreachable code error
                        let { response, newContentTypeObj } = await mergeAndSaveContentTypeFileData(contentTypeFileData[contentTypeTopLevelIndex].fields[contentTypeFieldIndex], contentTypeTopLevelIndex, contentTypeFieldIndex);
                        return {
                            updated: response,
                            content_type: newContentTypeObj
                        }
                    }
                    else {
                        return contentTypeNotFoundErrorMsg;
                    }
                }
                else {
                    // For standard field
                    if(checkArrayForDuplicateNamesExisting(contentTypeFileData)) {
                        return duplicateNameErrorMsg;
                    }
                    // Merge and save data!
                    let { response, newContentTypeObj } = await mergeAndSaveContentTypeFileData(contentTypeFileData[contentTypeTopLevelIndex], contentTypeTopLevelIndex);
                    return {
                        updated: response,
                        content_type: newContentTypeObj
                    }
                }

            }
            else {
                return contentTypeNotFoundErrorMsg;
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