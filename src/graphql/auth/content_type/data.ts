import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Get single content type data for pages component 
// Based on page_component_id and config_id
export const getSingleContentType = async (page_component_id: mod_contentTypesDatabaseModel["page_component_id"], content_type: mod_contentTypesConfigModel): Promise<mod_pageModelComponentContentType> => { 
    try {

        let response: mod_pageModelComponentContentType = {
            data: undefined,
            group_id: undefined
        }

        switch(content_type.type) {
            case 'text': {
                try {
                    const result = await db.one(`SELECT * FROM component_content_type_text WHERE page_component_id='${page_component_id}' AND config_id='${content_type._id}'`);
                    response.data = result.value;
                    response.group_id = result.group_id;
                }
                catch(err) {
                    response.data = 'Error: query failed, resave data to get working again!';
                    response.group_id = undefined;
                }
            }
            case 'number': {
                try {
                    const result = await db.one(`SELECT * FROM component_content_type_number WHERE page_component_id='${page_component_id}' AND config_id='${content_type._id}'`);
                    response.data = result.value;
                    response.group_id = result.group_id;
                }
                catch(err) {
                    response.data = 0;
                    response.group_id = undefined;
                }
            }
            case 'repeater': {
                response.data = undefined;
                response.group_id = undefined;
            }
        }

        return response;

    }
    catch(err) {
        throw err;
    }
}

// Save new content type row in the correct table
export const saveSingleContentType = async (data: cont_cont_updateSingleContentTypeInp) => { // page_component_id referes to the page_components tables _id - not the theme/config components ID
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
                throw 'Component content type repeater is never stored in the database! Update or add its children fields independently!';
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
export const deleteSingleContentType = async (data: cont_cont_deleteSingleContentTypeInp) => {
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
                throw 'Component content type repeater is never stored in the database! Delete its children fields independently!';
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
export const deleteAllPageComponentContentTypes = async (componentID: mod_componentModel["_id"], contentTypeID: mod_contentTypesConfigModel["_id"]) => {
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
        }
    }
    catch(err) {
        throw err;
    }
}