import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
// Controller
import { componentController, contentTypeController } from '../../../index';
import { saveSingleContentType } from '../content_type/data';

// Used to update page_components table row data
export const updatePageComponent = async (_id: mod_pageComponentsModel["_id"], data: const_page_updatePageComponentInp) => {
    try {
        // We can only update the position atm
        // More may come TODO
        let updatePageComponentObj: const_page_updatePageComponentUpdateObj = {};
        if(data.position != undefined) updatePageComponentObj.position = data.position;
        // Update
        let pageComponentsRes = await db.one(`UPDATE page_components SET ${__updateSetQueryGen(updatePageComponentObj)} WHERE _id='${_id}' RETURNING *`, updatePageComponentObj);
        // Update pages last edited field
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${pageComponentsRes.page_id}'`);
        return pageComponentsRes;
    }
    catch(err) {
        throw err;
    }
}

// Update 
export const updatePageComponentField = async () => {
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
export const deletePageComponent = async (_id: mod_pageComponentsModel["_id"]) => {
    try {
        // Delete all data related to the page
        await db.none('DELETE FROM page_components WHERE _id=$1', _id);
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}