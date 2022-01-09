import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Get single content type data for pages component 
// Based on page_component_id and config_id
export const getSingleContentType = async (page_component_id: mod_contentTypesDatabaseModel["page_component_id"], content_type: mod_contentTypesConfigModel) => { // page_component_id referes to the page_components tables _id - not the theme/config components ID
    try {
        // Query to search all content type tables
        // TODO - needs more content_types adding
        let response: mod_pageModelComponentContentType = {
            config_id: content_type._id,
            name: content_type.name,
            type: content_type.type,
            config: content_type.config,
            data: undefined
        }

        switch(content_type.type) {
            case 'text': {
                const { value } = await db.one(`SELECT * FROM component_content_type_text WHERE page_component_id='${page_component_id}' AND config_id='${content_type._id}'`);
                response.data = value;
                return response;
                break;
            }
            case 'number': {
                const { value } = await db.one(`SELECT * FROM component_content_type_number WHERE page_component_id='${page_component_id}' AND config_id='${content_type._id}'`);
                response.data = value;
                return response;
                break;
            }
            case 'repeater': {
                let data: Array<mod_pageModelComponentContentType> = [];
                // For now repeaters can only go one level deep - may change in the future
                if(content_type.fields) {
                    for await(const contentType of  content_type.fields) {
                        let subFiledRes = await getSingleContentType(page_component_id, contentType);
                        if(subFiledRes) data.push(subFiledRes);
                    }
                }
                response.data = JSON.stringify(data);
                return response;
                break;
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Save new content type row in the correct table
export const saveSingleContentType = async (page_component_id: mod_contentTypesDatabaseModel["page_component_id"], content_type: mod_contentTypesConfigModel) => { // page_component_id referes to the page_components tables _id - not the theme/config components ID
    try {
        switch(content_type.type) {
            case 'text': {
                await db.none('INSERT INTO component_content_type_text(page_component_id, config_id, value) VALUES(${page_component_id}, ${config_id}, ${value})', {
                    page_component_id: page_component_id,
                    config_id: content_type._id,
                    value: content_type.config.default_srt
                });
                break;
            }
            case 'number': {
                await db.none('INSERT INTO component_content_type_number(page_component_id, config_id, value) VALUES(${page_component_id}, ${config_id}, ${value})', {
                    page_component_id: page_component_id,
                    config_id: content_type._id,
                    value: content_type.config.default_num
                });
                break;
            }
            case 'repeater': {
                // loop over all fields and save rows for them!
                // For now repeaters can only go one level deep - may change in the future
                if(content_type.fields) {
                    for await(const contentType of  content_type.fields) {
                        await saveSingleContentType(page_component_id, contentType);
                    }
                }
                break;
            }
        }

    }
    catch(err) {
        throw err;
    }
}


// Update component_content_type_ rows
export const updateSingleContentType = async (data: cont_page_comp_updatePageComponentInp) => {
    try {
        let response;
        // Make the data paramater an array if the user passed in a single  
        switch(data.type) {
            case 'text': {
                let dataObj: cont_cont_updateSingleContentTypeObj = {};
                if(data.value != undefined) dataObj.value = data.value;
                response = await db.one(`UPDATE component_content_type_text SET ${__updateSetQueryGen(dataObj)} WHERE page_component_id='${data.page_component_id}' AND config_id='${data.config_id}' RETURNING *`, dataObj);
                break;
            }
            case 'number': {
                let dataObj: cont_cont_updateSingleContentTypeObj = {};
                if(data.value != undefined) dataObj.value = parseInt(data.value);
                response = await db.one(`UPDATE component_content_type_number SET ${__updateSetQueryGen(dataObj)} WHERE page_component_id='${data.page_component_id}' AND config_id='${data.config_id}' RETURNING *`, dataObj);
                break;
            }
            case 'repeater': {
                throw 'Component content type repeater is never stored in the database! Update its children fields independently!';
                break;
            }
        }
        // Get page id from page_components table
        let { page_id } = await db.one('SELECT page_id FROM page_components WHERE _id=$1', data.page_component_id);
        // Update pages last edited field
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${page_id}'`);
        return response;
    }
    catch(err) {
        throw err;
    }
}