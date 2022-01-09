import db from '../../../db';

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

// 
// export const updateSingleContentType = async (page_component_id)