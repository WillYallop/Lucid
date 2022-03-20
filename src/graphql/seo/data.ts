import db from '../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Update single SEO obj - TODO
export const updateSingleSEO = async (page_id: mod_pageModel["_id"], data: cont_seo_updateSingleInp) => {
    try {
        // Add some validation for the field - refer to controllers 

        // Create new object to update the page with
        let updateObj: cont_seo_updateSingleInp = {};
        // Set other data
        if(data.title != undefined) updateObj.title = data.title;
        if(data.description != undefined) updateObj.description = data.description;
        if(data.canonical != undefined) updateObj.canonical = data.canonical;
        if(data.robots != undefined) updateObj.robots = data.robots;

        if(data.og_type != undefined) updateObj.og_type = data.og_type;
        if(data.og_title != undefined) updateObj.og_title = data.og_title;
        if(data.og_description != undefined) updateObj.og_description = data.og_description;
        if(data.og_image != undefined) updateObj.og_image = data.og_image;

        if(data.twitter_card != undefined) updateObj.twitter_card = data.twitter_card;
        if(data.twitter_title != undefined) updateObj.twitter_title = data.twitter_title;
        if(data.twitter_description != undefined) updateObj.twitter_description = data.twitter_description;
        if(data.twitter_image != undefined) updateObj.twitter_image = data.twitter_image;
        if(data.twitter_creator != undefined) updateObj.twitter_creator = data.twitter_creator;
        if(data.twitter_site != undefined) updateObj.twitter_site = data.twitter_site;
        if(data.twitter_player != undefined) updateObj.twitter_player = data.twitter_player;
        
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

// Get single SEO 
export const getSingleSEO = async (page_id: mod_pageModel["_id"]) => {
    try {
        let seoRes = await db.one('SELECT * FROM page_seo WHERE page_id=$1', page_id);
        return seoRes;
    }
    catch(err) {
        throw err;
    }
}

// Save single SEO
export const saveSingleSEO = async (data: mod_pageModel["seo"]) => {
    try {
        let seoRes = await db.one('INSERT INTO page_seo(page_id, title, description, canonical, robots, og_type, og_title, og_description, og_image, twitter_card, twitter_title, twitter_description, twitter_image, twitter_creator, twitter_site, twitter_player) VALUES(${page_id}, ${title}, ${description}, ${canonical}, ${robots}, ${og_type}, ${og_title}, ${og_description}, ${og_image}, ${twitter_card}, ${twitter_title}, ${twitter_description}, ${twitter_image}, ${twitter_creator}, ${twitter_site}, ${twitter_player}) RETURNING *', {
            page_id: data.page_id,
            title: data.title,
            description: "",
            canonical: "",
            robots: "",

            og_type: "",
            og_title: data.og_title,
            og_description: "",
            og_image: "",

            twitter_card: data.twitter_card,
            twitter_title: data.twitter_title,
            twitter_description: "",
            twitter_image: "", 
            twitter_creator: "",
            twitter_site: "",
            twitter_player: ""
        });
        return seoRes;
    }
    catch(err) {
        throw err;
    }
}