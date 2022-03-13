import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';


// --------------------------------------------------------
// - Mutations --------------------------------------------
// --------------------------------------------------------

// Update/Create multiple groups
export const saveMultipleGroups = async (groups: Array<mod_contentTypeFieldGroupModel>) => {
    try {
        const savedGroups: Array<mod_contentTypeFieldGroupModel> = [];
        for await (const group of groups) {
            const checkExists = await db.oneOrNone('SELECT _id FROM content_type_field_group WHERE _id=$1', group._id);
            if(checkExists === null) {
                // create 
                const groupObj: mod_contentTypeFieldGroupModel = await db.one('INSERT INTO content_type_field_group(_id, page_component_id, parent_group, parent_config_id, position) VALUES(${_id}, ${page_component_id}, ${parent_group}, ${parent_config_id}, ${position}) ON CONFLICT (_id) DO NOTHING RETURNING *', {
                    _id: group._id,
                    page_component_id: group.page_component_id,
                    parent_group: group.parent_group,
                    parent_config_id: group.parent_config_id,
                    position: group.position
                });
                savedGroups.push(groupObj);
            }
            else {
                // Update
                const groupObj: mod_contentTypeFieldGroupModel = await db.one('UPDATE content_type_field_group SET '+__updateSetQueryGen(group)+' WHERE _id=${_id} RETURNING *', group);
                savedGroups.push(groupObj);
            }
        }
        return savedGroups;
    }
    catch(err) {
        throw err;
    }
}

// Delete multiple groups
export const deleteMultipleGroups = async (group_ids: Array<mod_contentTypeFieldGroupModel["_id"]>) => {
    try {
        const response = [];
        for await (const _id of group_ids) {
            await db.none('DELETE FROM content_type_field_group WHERE _id=$1', _id);
            response.push({ deleted: true });
        }
        return response;
    }
    catch(err) {
        throw err;
    }
}

// Update/Create multiple fields
export const saveMultipleFields = async (page_id: mod_pageModel["_id"], fields_data: Array<cont_cont_saveMultipleFieldsInp>) => {
    try {
        const saveFieldData: Array<mod_contentTypesDatabaseModel> = [];
        for await (const data of fields_data) {
            const queryGenObj = {...data};
            delete queryGenObj.type;
            switch(data.type) {
                case 'text': {
                    const checkExists = await db.oneOrNone('SELECT * FROM component_content_type_text WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root}', data);
                    if(checkExists === null) {
                        // Create
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('INSERT INTO component_content_type_text(page_component_id, config_id, value, group_id, root) VALUES(${page_component_id}, ${config_id}, ${value}, ${group_id}, ${root}) RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            value: data.value,
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);
                    }
                    else {
                        // Update
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('UPDATE component_content_type_text SET '+__updateSetQueryGen(queryGenObj)+' WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root} RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            value: data.value,
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);  
                    }
                    break;
                }
                case 'number': {
                    const checkExists = await db.oneOrNone('SELECT * FROM component_content_type_number WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root}', data);
                    if(checkExists === null) {
                        // Create
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('INSERT INTO component_content_type_number(page_component_id, config_id, value, group_id, root) VALUES(${page_component_id}, ${config_id}, ${value}, ${group_id}, ${root}) RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            value: parseInt(data.value),
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);
                    }
                    else {
                        // Update
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('UPDATE component_content_type_number SET '+__updateSetQueryGen(queryGenObj)+' WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root} RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            value: parseInt(data.value),
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);
                    }
                    break;
                }
                case 'repeater': {
                    const checkExists = await db.oneOrNone('SELECT * FROM component_content_type_repeater WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root}', data);
                    if(checkExists === null) {
                        // Create
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('INSERT INTO component_content_type_repeater(page_component_id, config_id, group_id, root) VALUES(${page_component_id}, ${config_id}, ${group_id}, ${root}) RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);
                    }
                    else {
                        // Update
                        const fieldResponse: mod_contentTypesDatabaseModel = await db.one('UPDATE component_content_type_repeater SET '+__updateSetQueryGen(queryGenObj)+' WHERE page_component_id=${page_component_id} AND config_id=${config_id} '+( data.root ? '' : 'AND group_id=${group_id}' )+' AND root=${root} RETURNING *', {
                            page_component_id: data.page_component_id,
                            config_id: data.config_id,
                            group_id: data.group_id,
                            root: data.root
                        });
                        saveFieldData.push(fieldResponse);
                    }
                    break;
                }
            }
        }
        // Update pages last edited field
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${page_id}'`);
        return saveFieldData;
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



// --------------------------------------------------------
// - Queries ----------------------------------------------
// --------------------------------------------------------

// Get page components content type fields 
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

// Get page components content type group fields
export const getPageComponentsGroups = async (page_component_id: mod_contentTypesDatabaseModel["page_component_id"]) => {
    try {
        const groupsRes: Array<mod_contentTypeFieldGroupModel> = await db.manyOrNone(`SELECT * FROM content_type_field_group WHERE page_component_id='${page_component_id}'`);
        return groupsRes;
    }
    catch(err) {
        throw err;
    }
}