import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Update single SEO obj - TODO
export const updateSingle = async (page_id: mod_pageModel["_id"], data: cont_seo_updateSingleInp) => {
    try {
        // Add some validation for the field - refer to controllers 

        // Create new object to update the page with
        let updateObj: cont_seo_updateSingleUpdateObj = {};
        // Set other data
        if(data.title != undefined) updateObj.title = data.title;
        if(data.description != undefined) updateObj.description = data.description;
        if(data.og_title != undefined) updateObj.og_title = data.og_title;
        if(data.og_description != undefined) updateObj.og_description = data.og_description;
        if(data.og_image != undefined) updateObj.og_image = data.og_image;
        // Update
        let pageUpdatated = await db.one(`UPDATE page_seo SET ${__updateSetQueryGen(updateObj)} WHERE page_id='${page_id}'  RETURNING *`, updateObj);
        // Update corresponding pages last_edited field:
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${page_id}'`);
        return pageUpdatated;
    }
    catch(err) {
        throw err;
    }
};