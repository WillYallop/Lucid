import { Liquid } from 'liquidjs';
// Custom scripts
import { lucidAssetTagRegister } from './tags/lucidAsset';
import { lucidScriptTagRegister } from './tags/lucidScript';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid'
});


const __generateComponentDataObj = async (data: gen_componentCompilerProps) => {
    try {
        
        const responseObj: any = {};

        // Build Repeaters Value 
        const buildRepeaterArray = async (contentTypeID: mod_contentTypesConfigModel["_id"]): Promise<Array<any>> => {
            // For this content type ID, find all of its groups, and create an object with for them.
            // If they have a repeater in them call this functionm recursivly.
            const repeaterValue: Array<any> = [];
            // filter all of repeaters corresponding groups.
            const repeatersGroups = data.groups.filter((group) => {
                if(group.parent_config_id === contentTypeID) return group;
            });
            // For groups, find their corresponding data
            for await (const group of repeatersGroups) {
                const groupObj: any = {};
                // Find all data that belongs to this group
                const groupData = data.data.filter((fieldData) => {
                    if(fieldData.group_id === group._id) return fieldData;
                });
                // set data;
                for await (const field of groupData) {
                    // get its corresponding contentType
                    const contentType = data.content_types.find( x => x._id === field.config_id );
                    if(contentType !== undefined) {
                        if(contentType.type != 'repeater') {
                            groupObj[contentType.name] = field.value; // TODO - atm these are potentially all strings, and will need updating to their corresponding content type
                        }
                        else {
                            const repeaterArray = await buildRepeaterArray(contentType._id);
                            groupObj[contentType.name] = repeaterArray;
                        }
                    }
                }
                // push group to repeater
                repeaterValue.push(groupObj);
            }
            return repeaterValue;
        }

        // for the content types
        // for root types, if not repeater add, else add array and build out the repeater objects
        for await(const contentType of data.content_types) {
            // find corresponding data
            const dataObj = data.data.find( x => x.config_id === contentType._id );
            if(dataObj !== undefined) {
                if(contentType.parent === 'root') {
                    if(contentType.type != 'repeater') {
                        responseObj[contentType.name] = dataObj.value; // TODO - atm these are potentially all strings, and will need updating to their corresponding content type
                    }
                    else {
                        const repeaterArray = await buildRepeaterArray(contentType._id);
                        responseObj[contentType.name] = repeaterArray;
                    }
                }
            }
            else continue;
        }

        return responseObj
    }
    catch(err) {
        throw err;
    }
}


export default async (config: Array<gen_componentCompilerProps>) => {
    try {
        // Create empty component map
        const componentsMap: gen_componentCompiledMap = new Map();
        // Build templates out
        for (const data of config) {
            // register tags - TODO - this may be able to be moved up out of the loop!
            lucidScriptTagRegister(engine); // lucidScript
            lucidAssetTagRegister(engine); // lucidAsset
            const componentData = await __generateComponentDataObj(data);
            const componentDir = path.resolve(`${themeDir}/components/${data.component.file_path}`);
            const markup = await engine.renderFile(componentDir, componentData);
            componentsMap.set(data.component.name, {
                _id: data.component._id,
                markup: markup
            });
        }
        return componentsMap;
    }
    catch(err) {
        throw(err);
    }
}