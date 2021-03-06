import { getSingleFileContent, writeSingleFile, deleteSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __generateErrorString } from '../functions/shared';
import merge from 'lodash/merge';

/*
EXAMPLE CONTENT_TYPE CONFIG FILE
[
    {
        "_id": "",
        "name": "",
        "type": "",
        "parent": "",
        "config": {
            "max": "",
            "min": "",
            "default": ""
        }
    }
]
*/


// ------------------------------------ ------------------------------------
// save single component content type
// ------------------------------------ ------------------------------------
const saveSingle = async (componentID: mod_componentModel["_id"], contentType: mod_contentTypesConfigModel): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeConfigController.saveSingle';
        // Check if file ith component ID exists in theme/config/content_types and save a single component content type object to it
        // Else create the file and save a single component content type object to it
        let validateArray: Array<vali_validateFieldObj> = [
            {
                method: 'uuidVerify',
                value: componentID
            },
            {
                method: 'cont_name',
                value: contentType.name // only the contentType.name is user inputted, so we assume the rest is correct
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
                name: contentType.name,
                type: contentType.type,
                config: contentType.config,
                parent: contentType.parent
            };
            
            // Content type data
            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');

            // Find duplicate where the parent IDs are equal - a content type name must be unique to its parent ground 
            let findDuplicateName = contentTypeFileData.findIndex(x => x.name === contentTypeObj.name && x.parent === contentType.parent);

            if (findDuplicateName === -1) {
                // Does not exist
                // Add to array and save
                contentTypeFileData.push(contentTypeObj);
                await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return contentTypeObj
            }
            else {
                let message = `Content type with name "${contentType.name}" has already been registered.`;
                if(contentType.parent != 'root') message = `Content type with name "${contentType.name}" has already been registered for parent with ID of "${contentType.parent}".`;
                throw __generateErrorString({
                    code: 403,
                    origin: origin,
                    message: message
                });
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

// ------------------------------------ ------------------------------------
// get single content type config
// ------------------------------------ ------------------------------------
const getSingle = async (componentID: mod_componentModel["_id"], _id: mod_contentTypesConfigModel["_id"]): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeConfigController.getSingle';
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

// ------------------------------------ ------------------------------------
// delete single component content type
// ------------------------------------ ------------------------------------
const deleteSingle = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    try {
        const origin = 'contentTypeConfigController.deleteSingle';
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

        let index = contentTypeFileData.findIndex( x => x._id === contentTypeID);
        if(index != -1) {

            let deleteIndexs: Array<number> = [];
            const deleteRepeater = async (repeaterIndex: number) => {
                // Add repeater id to delete it later
                let repeaterID = contentTypeFileData[repeaterIndex]._id;
                deleteIndexs.push(repeaterIndex);
                // Find all objects with this repeater as its parent
                for(let i = 0; i < contentTypeFileData.length; i++) {
                    if(contentTypeFileData[i].parent === repeaterID) {
                        if(contentTypeFileData[i].type === 'repeater') {
                            await deleteRepeater(i);
                        }
                        else {
                            deleteIndexs.push(i);
                        }
                    }
                }
            }

            if(contentTypeFileData[index].type === 'repeater') {
                await deleteRepeater(index);
                // Loop over deleteIndexs array and delete them
                deleteIndexs.sort((a,b) => { return a - b; });
                for (let i = deleteIndexs.length -1; i >= 0; i--) {
                    contentTypeFileData.splice(deleteIndexs[i], 1);
                }
            }
            else {
                // Delete as useual
                contentTypeFileData.splice(index, 1);
            }
            
            // Save
            await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
        }
        else {
            throw __generateErrorString({
                code: 404,
                origin: origin,
                message: `Cannot delete content type with ID of: "${contentTypeID}" because it cannot be found!`
            });
        }
    }
    catch(err) {
        throw err;
    }
}

// delete component content type file
const unregister = async(componentID: mod_componentModel["_id"]): Promise<boolean> => {
    try {
        const origin = 'contentTypeConfigController.unregister';
        await validate([
            {
                method: 'uuidVerify',
                value: componentID
            }
        ]);
        const unregisterRes = await deleteSingleFile(`/config/content_types/${componentID}.json`);
        return unregisterRes;
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// update single component content type
// ------------------------------------ ------------------------------------
const updateSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp): Promise<mod_contentTypesConfigModel> => {
    try {
        const origin = 'contentTypeConfigController.updateSingle';
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
                            value: value
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
     
            // Validate
            await validate(validateObj);
    
            // Get Data
            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
    
            // Function to check name for duplicates
            const checkArrayForDuplicateNamesExisting = (arr: Array<mod_contentTypesConfigModel>) => {
                let nameExistsIndex = arr.findIndex( x => x.name === contentType.name && x.parent === contentType.parent );
                if(nameExistsIndex != -1) {
                    // Verify its contentType
                    if(arr[nameExistsIndex]._id === contentType._id) return false;
                    else return true;
                }
                else return false;
            }

            // content Type Top Level
            let contentTypeIndex = contentTypeFileData.findIndex(x => x._id === contentType._id);
            if(contentTypeIndex != -1) {
                if(checkArrayForDuplicateNamesExisting(contentTypeFileData)) {
                    throw __generateErrorString({
                        code: 409,
                        origin: origin,
                        message: `Content type with name: "${contentType.name}" already exists! Please choose another name!`
                    });
                }

                const originalType = contentTypeFileData[contentTypeIndex].type;

                // Merge and save data - for the given content type!
                contentTypeFileData[contentTypeIndex] = merge(contentTypeFileData[contentTypeIndex], contentType);
                if(contentType.config) contentTypeFileData[contentTypeIndex].config = contentType.config;

                // Recusive function to delete all reapters children 
                let deleteIndexs: Array<number> = [];
                const deleteRepeaterChildren = async (repeaterIndex: number, firstIteration: boolean) => {
                    // Add repeater id to delete it later
                    let repeaterID = contentTypeFileData[repeaterIndex]._id;
                    if(!firstIteration) deleteIndexs.push(repeaterIndex);
                    // Find all objects with this repeater as its parent
                    for(let i = 0; i < contentTypeFileData.length; i++) {
                        if(contentTypeFileData[i].parent === repeaterID) {
                            if(contentTypeFileData[i].type === 'repeater') {
                                await deleteRepeaterChildren(i, false);
                            }
                            else {
                                deleteIndexs.push(i);
                            }
                        }
                    }
                }

                if(originalType === 'repeater' && contentTypeFileData[contentTypeIndex].type != 'repeater') {
                    await deleteRepeaterChildren(contentTypeIndex, true);
                    // Loop over deleteIndexs array and delete them
                    deleteIndexs.sort((a,b) => { return a - b; });
                    for (let i = deleteIndexs.length -1; i >= 0; i--) {
                        contentTypeFileData.splice(deleteIndexs[i], 1);
                    }
                }

                await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return contentTypeFileData[contentTypeIndex];
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
    unregister,
    updateSingle
}