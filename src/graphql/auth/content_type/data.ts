import db from '../../../db';

// Get single content type data for pages component 
// Based on component_id and config_id
export const getSingleContentType = async (component_id: mod_contentTypesDatabaseModel["component_id"], content_type: mod_contentTypesConfigModel) => { // component_id referes to the page_components tables _id - not the theme/config components ID
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
                const { value } = await db.one(`SELECT * FROM component_content_type_text WHERE component_id='${component_id}' AND config_id='${content_type._id}'`);
                response.data = value;
                return response;
                break;
            }
            case 'number': {
                const { value } = await db.one(`SELECT * FROM component_content_type_number WHERE component_id='${component_id}' AND config_id='${content_type._id}'`);
                response.data = value;
                return response;
                break;
            }
            case 'repeater': {
                let data: Array<mod_pageModelComponentContentType> = [];
                // For now repeaters can only go one level deep - may change in the future
                if(content_type.fields) {
                    for await(const contentType of  content_type.fields) {
                        let subFiledRes = await getSingleContentType(component_id, contentType);
                        if(subFiledRes) data.push(subFiledRes);
                    }
                }
                response.data = data;
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
export const saveSingleContentType = async (component_id: mod_contentTypesDatabaseModel["component_id"], content_type: mod_contentTypesConfigModel) => { // component_id referes to the page_components tables _id - not the theme/config components ID
    try {
        switch(content_type.type) {
            case 'text': {
                await db.none('INSERT INTO component_content_type_text(component_id, config_id, value) VALUES(${component_id}, ${config_id}, ${value})', {
                    component_id: component_id,
                    config_id: content_type._id,
                    value: ''
                });
                break;
            }
            case 'number': {
                await db.none('INSERT INTO component_content_type_number(component_id, config_id, value) VALUES(${component_id}, ${config_id}, ${value})', {
                    component_id: component_id,
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
                        await saveSingleContentType(component_id, contentType);
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