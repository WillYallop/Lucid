import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __convertStringLowerUnderscore, __generateErrorString } from './helper/shared';
import merge from 'lodash/merge';

/*

EXAMPLE CONTENT_TYPE CONFIG FILE

[
    {
        "_id": "2d3e64d0-64fd-11ec-8688-635a3ff32370",
        "name": "test_text",
        "type": "text",
        "config": {
            "max": "0",
            "min": "200"
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
                    "max": "0",
                    "min": "200"
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
const saveSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_saveSingleInp, repeaterField: boolean, repeaterID?: mod_contentTypesConfigModel["_id"]): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeController.saveSingle';
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

        // Verify
        await validate(validateArray);
        // If valid
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
            if(contentType.type === 'repeater') contentTypeObj.fields = [];
            
            // Content type data
            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');

            if(repeaterField) {
                // We are saving a repeater field to a repeater content type
                let repeaterContentType = contentTypeFileData.find( x => x._id === repeaterID );
                if(repeaterContentType && repeaterContentType.fields) {
                    // Find duplicate
                    let findDuplicateFieldName = repeaterContentType.fields.findIndex( x => x.name === contentTypeObj.name );
                    if (findDuplicateFieldName === -1) {
                        // Does not exist
                        // Add to array and save
                        repeaterContentType.fields.push(contentTypeObj);
                        await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                        return contentTypeObj
                    }
                    else {
                        throw __generateErrorString({
                            code: 403,
                            origin: origin,
                            message: `Content type with name "${__convertStringLowerUnderscore(contentType.name)}" has already been registered for repeater content type with ID "${repeaterID}"!.`
                        });
                    }
                }
                else {
                    throw __generateErrorString({
                        code: 403,
                        origin: origin,
                        message: `Repeater content type with ID "${repeaterID}" cannot be found!`
                    });
                }
            }
            else {
                // We are saving a top level content type
                let findDuplicateName = contentTypeFileData.findIndex(x => x.name === contentTypeObj.name);
                if (findDuplicateName === -1) {
                    // Does not exist
                    // Add to array and save
                    contentTypeFileData.push(contentTypeObj);
                    await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                    return contentTypeObj
                }
                else {
                    throw __generateErrorString({
                        code: 403,
                        origin: origin,
                        message: `Content type with name "${__convertStringLowerUnderscore(contentType.name)}" has already been registered.`
                    });
                }
            }

        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot get component with ID: "${componentID}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// get all component content types data
// ------------------------------------ ------------------------------------
const getAll = async (componentID: mod_componentModel["_id"]): Promise<Array<mod_contentTypesConfigModel>> => {
    try {
        await validate([
            {
                method: 'uuidVerify',
                value: componentID
            }
        ]);
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        return contentTypeFileData;
    }
    catch(err) {
        throw err;
    }
}

const getSingle = async (componentID: mod_componentModel["_id"], _id: mod_contentTypesConfigModel["_id"]): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeController.getSingle';
        await validate([
            {
                method: 'uuidVerify',
                value: componentID
            },
            {
                method: 'uuidVerify',
                value: _id
            }
        ]);
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        // Find single
        let findContentType = contentTypeFileData.find( x => x._id === _id);
        if(findContentType) {
            return findContentType;
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot find content type with ID: "${_id}" for component with ID: "${componentID}"!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// delete single component content type
// ------------------------------------ ------------------------------------
const deleteSingle = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    try {
        const origin = 'contentTypeController.deleteSingle';
        await validate([
            {
                method: 'uuidVerify',
                value: componentID
            },
            {
                method: 'uuidVerify',
                value: contentTypeID
            }
        ]);
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');

        let foundIndex = -1;
        let repeaterIndex = -1;
        let inRepeater = false;
        // Find content type and repeater field content with matching ID 
        for(let i = 0; i < contentTypeFileData.length; i++) {
            let contentType = contentTypeFileData[i];
            if(contentType._id === contentTypeID) {
                foundIndex = i;
                break;
            }
            if(contentType.type === 'repeater') {
                console.log('REPEATER')
                // check all of its fields for the match
                if(contentType.fields) {
                    for(let ii = 0; ii < contentType.fields.length; ii++) {
                        let subContentType =  contentType.fields[ii];
                        if(subContentType._id === contentTypeID) {
                            console.log('FOUND');
                            foundIndex = ii;
                            repeaterIndex = i;
                            inRepeater = true;
                            break;
                        }
                    }
                }
            }
        }

        if(foundIndex != -1) {
            // Remove from array and write to file
            if(!inRepeater) contentTypeFileData.splice(foundIndex, 1);
            else {
                if(repeaterIndex != -1) {
                    contentTypeFileData[repeaterIndex].fields?.splice(foundIndex, 1);
                }
            }
            await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot delete content type with ID: "${contentTypeID}" for component with ID: "${contentTypeID}" because it cannot be found!`
            });
        }

    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// update single component content type
// ------------------------------------ ------------------------------------
const updateSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp, repeaterField: boolean, repeaterID: mod_contentTypesConfigModel["_id"]): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeController.updateSingle';
        if(Object.entries(contentType).length) {
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
            await validate(validateObj);
    
            // Update data
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
                try {
                    // Merge object minus, config which overwrites
                    let newContentTypeObj: mod_contentTypesConfigModel = merge(existing, contentType);
                    if(contentType.config) newContentTypeObj.config = contentType.config;
                    // Delete fields object if going from a repeater type to another
                    if(newContentTypeObj.type != 'repeater' && newContentTypeObj.fields) delete newContentTypeObj['fields'];

                    if(repeaterField) {
                        // @ts-ignore: Unreachable code error
                        contentTypeFileData[topLevelInd].fields[filedLevelInd] = newContentTypeObj;
                    }
                    else {
                        contentTypeFileData[topLevelInd] = newContentTypeObj;
                    }
                    await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                    return newContentTypeObj;
                }
                catch(err) {
                    throw err;
                }
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
                        throw __generateErrorString({
                            code: 409,
                            origin: origin,
                            message: `Content type with name: "${contentType.name}" already exists! Please choose another name!`
                        });
                    }
                    // @ts-ignore: Unreachable code error
                    let contentTypeFieldIndex = contentTypeFileData[contentTypeTopLevelIndex].fields.findIndex(x => x._id ===  contentType._id);
                    if(contentTypeFieldIndex != -1) {
                        // Merge and save data!
                        // @ts-ignore: Unreachable code error
                        let newContentTypeObj = await mergeAndSaveContentTypeFileData(contentTypeFileData[contentTypeTopLevelIndex].fields[contentTypeFieldIndex], contentTypeTopLevelIndex, contentTypeFieldIndex);
                        return newContentTypeObj
                    }
                    else {
                        throw __generateErrorString({
                            code: 404,
                            origin: origin,
                            message: `Cannot find content type with ID: "${contentType._id}" for component ID: "${componentID}" to update!`
                        });
                    }
                }
                else {
                    // For standard field
                    if(checkArrayForDuplicateNamesExisting(contentTypeFileData)) {
                        throw __generateErrorString({
                            code: 409,
                            origin: origin,
                            message: `Content type with name: "${contentType.name}" already exists! Please choose another name!`
                        });
                    }
                    // Merge and save data!
                    let newContentTypeObj = await mergeAndSaveContentTypeFileData(contentTypeFileData[contentTypeTopLevelIndex], contentTypeTopLevelIndex);
                    return newContentTypeObj
                }
    
            }
            else {
                throw __generateErrorString({
                    code: 404,
                    origin: origin,
                    message: `Cannot find content type with ID: "${contentType._id}" for component ID: "${componentID}" to update!`
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



export {
    saveSingle,
    getAll,
    getSingle,
    deleteSingle,
    updateSingle
}