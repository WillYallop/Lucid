import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __generateErrorString } from './helper/shared';
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
                if(contentType.parent != false) message = `Content type with name "${contentType.name}" has already been registered for parent with ID of "${contentType.parent}".`;
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

        const findContentTypeIndex = contentTypeFileData.findIndex( x => x._id === contentTypeID);
        if(findContentTypeIndex != -1) {
            // Remove from array and write to file
            contentTypeFileData.splice(findContentTypeIndex, 1);
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

// ------------------------------------ ------------------------------------
// update single component content type
// ------------------------------------ ------------------------------------
const updateSingle = async (componentID: mod_componentModel["_id"], contentType: cont_cont_updateSingleInp, repeaterField: boolean, repeaterID: mod_contentTypesConfigModel["_id"]): Promise<mod_contentTypesConfigModel> => {
    try {

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