import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

export const getPageComponentContentTypeData = async(page_component_id: mod_contentTypesDatabaseModel["page_component_id"]) => {
    try {
        let data: Array<mod_contentTypesDatabaseModel> = [];

        // Text
        const textResults = await db.manyOrNone(`SELECT * FROM component_content_type_text WHERE page_component_id='${page_component_id}'`);
        data = data.concat(textResults);
        // Number 
        const numberResults = await db.manyOrNone(`SELECT * FROM component_content_type_number WHERE page_component_id='${page_component_id}'`);
        data = data.concat(numberResults);
        // Number 
        const repeaterResults = await db.manyOrNone(`SELECT * FROM component_content_type_repeater WHERE page_component_id='${page_component_id}'`);
        data = data.concat(repeaterResults);

        return data;
    }
    catch(err) {
        throw err;
    }
}

// Save new content type row in the correct table
export const saveSingleContentTypeField = async (data: cont_cont_updateSingleContentTypeInp) => { // page_component_id referes to the page_components tables _id - not the theme/config components ID
    try {
        switch(data.type) {
            case 'text': {
                if(data.update) {
                    let dataObj: cont_cont_updateSingleContentTypeObj = {};
                    if(data.value != undefined) dataObj.value = data.value;
                    if(data.group_id != undefined) dataObj.group_id = data.group_id;
                    await db.none(`UPDATE component_content_type_text SET ${__updateSetQueryGen(dataObj)} WHERE page_component_id='${data.page_component_id}' AND config_id='${data.config_id}'`, dataObj);
                }
                else {
                    await db.none('INSERT INTO component_content_type_text(page_component_id, config_id, value, group_id) VALUES(${page_component_id}, ${config_id}, ${value}, ${group_id})', {
                        page_component_id: data.page_component_id,
                        config_id: data.config_id,
                        value: data.value,
                        group_id: data.group_id
                    });
                }
                break;
            }
            case 'number': {
                if(data.update) {
                    let dataObj: cont_cont_updateSingleContentTypeObj = {};
                    if(data.value != undefined) dataObj.value = parseInt(data.value);
                    if(data.group_id != undefined) dataObj.group_id = data.group_id;
                    await db.none(`UPDATE component_content_type_number SET ${__updateSetQueryGen(dataObj)} WHERE page_component_id='${data.page_component_id}' AND config_id='${data.config_id}'`, dataObj);
                }
                else {
                    await db.none('INSERT INTO component_content_type_number(page_component_id, config_id, value, group_id) VALUES(${page_component_id}, ${config_id}, ${value}, ${group_id})', {
                        page_component_id: data.page_component_id,
                        config_id: data.config_id,
                        value: parseInt(data.value),
                        group_id: data.group_id
                    });
                }
                break;
            }
            case 'repeater': {
                if(data.update) {
                    let dataObj: cont_cont_updateSingleContentTypeObj = {};
                    if(data.group_id != undefined) dataObj.group_id = data.group_id;
                    await db.none(`UPDATE component_content_type_repeater SET ${__updateSetQueryGen(dataObj)} WHERE page_component_id='${data.page_component_id}' AND config_id='${data.config_id}'`, dataObj);
                }
                else {
                    await db.none('INSERT INTO component_content_type_repeater(page_component_id, config_id, group_id) VALUES(${page_component_id}, ${config_id}, ${group_id})', {
                        page_component_id: data.page_component_id,
                        config_id: data.config_id,
                        group_id: data.group_id
                    });
                }
            }
        }

        // Get page id from page_components table
        let { page_id } = await db.one('SELECT page_id FROM page_components WHERE _id=$1', data.page_component_id);
        // Update pages last edited field
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${page_id}'`);
    }
    catch(err) {
        throw err;
    }
}

// Delete component_content_type row
export const deleteSingleContentTypeField = async (data: cont_cont_deleteSingleContentTypeInp) => {
    try {
        switch(data.type) {
            case 'text': {
                // component_content_type_text
                await db.none('DELETE FROM component_content_type_text WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                    page_component_id: data.page_component_id,
                    config_id: data.config_id
                });
                break;
            }
            case 'number': {
                // component_content_type_number
                await db.none('DELETE FROM component_content_type_number WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                    page_component_id: data.page_component_id,
                    config_id: data.config_id
                });
                break;
            }
            case 'repeater': {
                await db.none('DELETE FROM component_content_type_repeater WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                    page_component_id: data.page_component_id,
                    config_id: data.config_id
                });
                break;
            }
        }
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}

// DELETE ALL INSTANCES OF CONTENT TYPE FOR PAGE COMPONENT
export const deleteAllPageComponentContentTypesField = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
    try {
        let pageComponents = await db.manyOrNone('SELECT _id FROM page_components WHERE component_id=$1', componentID);
        for await(const pageComp of pageComponents) {
            db.none('DELETE FROM component_content_type_text WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                page_component_id: pageComp._id,
                config_id: contentTypeID
            });
            db.none('DELETE FROM component_content_type_number WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                page_component_id: pageComp._id,
                config_id: contentTypeID
            });
            db.none('DELETE FROM component_content_type_repeater WHERE page_component_id=${page_component_id} AND config_id=${config_id}', {
                page_component_id: pageComp._id,
                config_id: contentTypeID
            });
        }
    }
    catch(err) {
        throw err;
    }
}


// ---------------------------------------------
// Content type field groups
// ---------------------------------------------

export const getPageComponentsGroups = async (page_component_id: mod_contentTypesDatabaseModel["page_component_id"]) => {
    try {
        const groupsRes: Array<mod_contentTypeFieldGroupModel> = await db.manyOrNone(`SELECT * FROM content_type_field_group WHERE page_component_id='${page_component_id}'`);
        return groupsRes;
    }
    catch(err) {
        throw err;
    }
}

export const createUpdateContentTypeFieldGroup = async (group: mod_contentTypeFieldGroupModel) => {
    try {
        const groupObj: mod_contentTypeFieldGroupModel = await db.none('INSERT INTO content_type_field_group(_id, page_component_id, parent_group, parent_config_id, position) VALUES(${group._id}, ${group.page_component_id}, ${group.parent_group}, ${group.parent_config_id}, ${group.position}) ON CONFLICT (_id) DO UPDATE', {
            _id: group._id,
            page_component_id: group.page_component_id,
            parent_group: group.parent_group,
            parent_config_id: group.parent_config_id,
            position: group.position
        });
        return true
    }
    catch(err) {
        throw err;
    }
}