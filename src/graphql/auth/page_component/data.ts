import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
// Controller
import { componentController, contentTypeController } from '../../../index';
import { saveSingleContentType } from '../content_type/data';

// Update component_content_type for a page_components row
export const updatePageComponent = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}

// Add page_components table row 
// This doesnt add allow any data to be added to them - it simply creates the empty tables needed.
// Only fire when adding a new component to a page.
// For updating a component use the updatePageComponent() function
// If a new config field has been added, but this was fired before - the table for that type wont exist yet, but that will handle that case
export const addPageComponent = async (page_id: mod_pageModel["_id"], component_id: mod_componentModel["_id"], position: mod_pageComponentsModel["position"]) => {
    try {
        // Verify component_id
        let getComponent = await componentController.getSingleByID(component_id);
        if(getComponent.success) {
            // Create a new page_components row
            let savePageComponentRes: mod_pageComponentsModel = await db.one('INSERT INTO page_components(page_id, component_id, position) VALUES(${page_id}, ${component_id}, ${position}) RETURNING *', {
                page_id: page_id, // reference will verify if this exists
                component_id: component_id,
                position: position
            });
            // Grab component theme/config/content_types file to get a list of all config_ids
            // Update page last edited field
            let { success, content_types } = await contentTypeController.getAll(component_id);
            if(success) {
                if(content_types != undefined) {
                    for await(const contentType of content_types) {
                        // Save a new empty table row for the correct content type
                        await saveSingleContentType(savePageComponentRes._id, contentType);
                    }
                    return {
                        _id: savePageComponentRes._id,
                        component_id: savePageComponentRes.component_id,
                        position: savePageComponentRes.position
                    }
                }
                else {
                    throw 'Cannot verify components content_type config!'
                }
            }
            else {
                throw 'Cannot verify components content_type config!'
            }
        }
        else {
            throw 'Cannot verify component exists!'
        }

    }
    catch(err) {
        throw err;
    }
}

// Delete corresponding page_components table row
export const deleteComponent = async () => {
    try {

    }
    catch(err) {
        throw err;
    }
}




/*

SQL Querie to insert a page_components row as we dont have a graphql field for that yet:
Along with queries to enter a content_type for that pages component for type text, number and repeater!


INSERT INTO page_components(page_id, component_id)
VALUES ('', '74cd38a0-6415-11ec-bc21-d53d7ba49e21')
RETURNING *;


-- insert into TEXT type
INSERT INTO component_content_type_text(component_id, config_id, value)
VALUES ('', '2d3e64d0-64fd-11ec-8688-635a3ff32370', 'I am the text type data')
RETURNING *;

-- insert into NUMBER type
INSERT INTO component_content_type_number(component_id, config_id, value)
VALUES ('', '445a92a0-64fe-11ec-aab2-15b263b74864', 22)
RETURNING *;

*/