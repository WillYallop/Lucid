import { Liquid } from 'liquidjs';
// Custom scripts
import { lucidAssetTagRegister } from './tags/lucidAsset';
import { lucidScriptTagRegister } from './tags/lucidScript';
// island
import { stripTempIslandObjEle } from './island';
// helpers
import { __convertStringLowerUnderscore } from '../../functions/shared';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid',
    strictVariables: false,
    strictFilters: false
});



const __generateComponentDataObj = async (data: gen_componentCompilerProps) => {
    try {
        const responseObj: any = {};
        // Build Repeaters Value 
        const buildRepeaterArray = async (contentTypeID: mod_contentTypesConfigModel["_id"], groupID: mod_contentTypesDatabaseModel["group_id"]): Promise<Array<any>> => {
            // For this content type ID, find all of its groups, and create an object with for them.
            // If they have a repeater in them call this functionm recursivly.
            const repeaterValue: Array<any> = [];
            // filter all of repeaters corresponding groups.
            const repeatersGroups = data.groups.filter((group) => {
                if(group.parent_config_id === contentTypeID && group.parent_group === groupID) return group;
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
                            groupObj[__convertStringLowerUnderscore(contentType.name)] = field.value; // TODO - atm these are potentially all strings, and will need updating to their corresponding content type
                        }
                        else {
                            const repeaterArray = await buildRepeaterArray(contentType._id, group._id);
                            groupObj[__convertStringLowerUnderscore(contentType.name)] = repeaterArray;
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
                        responseObj[__convertStringLowerUnderscore(contentType.name)] = dataObj.value; // TODO - atm these are potentially all strings, and will need updating to their corresponding content type
                    }
                    else {
                        const repeaterArray = await buildRepeaterArray(contentType._id, dataObj.group_id);
                        responseObj[__convertStringLowerUnderscore(contentType.name)] = repeaterArray;
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

export default async (config: Array<gen_componentCompilerProps>, stringify: boolean) => {
    try {
        // Create empty component map
        const componentsMap: gen_componentCompiledMap = new Map();
        // Build templates out
        for (const data of config) {
            // register tags - TODO - this may be able to be moved up out of the loop!
            lucidScriptTagRegister(engine, data.mode, data.relative_path); // lucidScript
            lucidAssetTagRegister(engine, data.mode, data.relative_path); // lucidAsset
            // generate component data 
            const componentData = await __generateComponentDataObj(data);
            // Build markup
            const componentDir = path.resolve(`${themeDir}/components/${data.component.file_path}`);
            let markup = await engine.renderFile(componentDir, componentData);
            // Check if it has islandScriptObj, strip it out
            const islandRes = await stripTempIslandObjEle(markup)
            componentsMap.set(data.component.page_component_id, {
                _id: data.component._id,
                page_component_id: data.component.page_component_id,
                markup: stringify ? JSON.stringify(islandRes.markup) : islandRes.markup,
                scriptConfig: islandRes.scriptConfig
            });
        }
        return componentsMap;
    }
    catch(err) {
        throw(err);
    }
}