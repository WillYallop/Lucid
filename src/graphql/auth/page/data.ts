import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
import { generateSlug } from "random-word-slugs";
import validate from '../../../validator';
import { getSinglePostTypeByName } from '../../../controller/posts';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));

// Controllers
import { getSingleSEO, saveSingleSEO } from '../seo/data';
import { getAllPageComponents } from '../page_component/data';
import { __generateErrorString } from '../../../functions/shared';

export const __buildPageLivePath = async (page: mod_pageModel) => {
    try {

        // recursivly get parent
        const getParentPath = async (_id: mod_pageModel["_id"], slug: mod_pageModel["slug"]) => {
            // Query for parent slug
            let res = await db.one('SELECT slug, has_parent, parent_id FROM pages WHERE _id=$1', _id);
            slug = '/'+res.slug + slug;
            if(res.has_parent) slug = await getParentPath(res.parent_id, slug);
            return slug;
        }

        let path = '/'
        if(!page.is_homepage) path += page.slug;
        if(page.has_parent) {
            path = await getParentPath(page.parent_id, path);
        }
        if(page.type === 'post') {
            const postObj = await getSinglePostTypeByName(page.post_name);
            // find post parent page
            const parentPage = await db.oneOrNone('SELECT _id FROM pages WHERE post_type_id=$1', postObj._id);
            if(parentPage) path = await getParentPath(parentPage._id, path);
        }

        return path;
    }
    catch(err) {
        throw err;
    }
}

// Get single page
export const getSingle = async (appendAppUrl: boolean, _id?: mod_pageModel["_id"], slug?: mod_pageModel["slug"]) => {
    try {
        let page_id;
        let page: mod_pageModel;
        if(_id != undefined) {
            page_id = _id;
            page = await db.one('SELECT * FROM pages WHERE _id=$1', page_id);
        }
        else if(slug != undefined) {
            page = await db.one('SELECT * FROM pages WHERE slug=$1', slug);
            page_id = page._id;
        }
        else {
            throw __generateErrorString({
                code: 500,
                origin: 'pageController.getSingle',
                message: `You must call the function with either the "_id" or the "slug" paramater!`
            });
        }
        // Get SEO Object
        page.seo = await getSingleSEO(page_id);
        page.page_components = await getAllPageComponents(page_id);

        // Build full slug
        page.path = appendAppUrl ? config.app_urL : ''  + await __buildPageLivePath(page);

        return page;
    }
    catch(err) {
        throw err;
    }
}

// Get multiple pages
export const getMultiple = async (type: mod_pageModel["type"], post_name: mod_pageModel["post_name"],  limit: number, skip: number) => {
    try {
        let pages: any;
        if(type === 'post') {
            let queryStr = 'SELECT * FROM pages WHERE type=${type} AND post_name=${post_name}' + ` LIMIT ${limit} OFFSET ${skip}`;
            pages = await db.manyOrNone(queryStr, {
                type: type,
                post_name: post_name
            });
        }
        else {
            let queryStr = 'SELECT * FROM pages WHERE type=${type}' + ` LIMIT ${limit} OFFSET ${skip}`;
            pages = await db.manyOrNone(queryStr, {
                type: type
            });
        }
        return pages;
    }
    catch(err) {
        throw err;
    }
}

// Create new page
export const saveSingle = async (data: cont_page_saveSingleInp) => {
    try {

        // Validate the data
        await validate([
            {
                method: 'page_name',
                value: data.name
            },
            {
                method: 'page_slug',
                value: data.is_homepage ? '/' : data.slug
            },
            {
                method: 'page_slug_blacklist',
                value: data.is_homepage ? '/' : data.slug
            },
            {
                method: 'temp_verifyFileExists',
                value: data.template
            }
        ]);

        // Page object
        let newPageObj: const_page_saveSinglePageObj = {
            template: data.template,
            slug: data.is_homepage ? '/' : data.slug,
            name: data.name,
            type: data.type,
            has_parent: data.has_parent,
            author: data.author,
            is_homepage: data.is_homepage,
            date_created: moment().format('YYYY-MM-DD HH:mm:ss'),
            last_edited: moment().format('YYYY-MM-DD HH:mm:ss'),
            post_name: undefined,
            parent_id: undefined,
            post_type_id: undefined
        };

        if(data.type === 'post' && data.post_name) newPageObj['post_name'] = data.post_name;
        if(data.has_parent && data.parent_id) newPageObj['parent_id'] = data.parent_id;
        if(data.post_type_id != undefined) newPageObj.post_type_id = data.post_type_id;

        // If we are setting the new page to is_homepage, check all other pages for is_homepage true and set to false;
        if(newPageObj.is_homepage) await pageResetHandler('unset_is_homepage');
        // if the post_type_id is being set, unset the same one from other pages if it exists
        if(newPageObj.post_type_id) await pageResetHandler('unset_post_type_id', newPageObj.post_type_id);

        // Save page row
        let getPageRes = await db.one('INSERT INTO pages(template, slug, name, type, post_name, has_parent, parent_id, date_created, last_edited, author, is_homepage, post_type_id) VALUES(${template}, ${slug}, ${name}, ${type}, ${post_name}, ${has_parent}, ${parent_id}, ${date_created}, ${last_edited}, ${author}, ${is_homepage}, ${post_type_id}) RETURNING *', newPageObj);
        // Save SEO row
        getPageRes.seo = await saveSingleSEO({
            page_id: getPageRes._id,
            title: data.name,
            description: "",
            canonical: "",
            robots: "",
            og_type: "",
            og_title: data.name,
            og_description: "",
            og_image: "",
            twitter_card: "summary",
            twitter_title: data.name,
            twitter_description: "",
            twitter_image: "",
            twitter_creator: "",
            twitter_site: "",
            twitter_player: ""
        });
        return getPageRes;
    }
    catch(err) {
        throw err;
    }
}

// Update page
export const updateSingle = async (_id: mod_pageModel["_id"], data: cont_page_updateSingleInp) => {
    try {

        // Validate the data
        let validationArr: Array<vali_validateFieldObj> = [];
        if(data.name != undefined) {
            validationArr.push({
                method: 'page_name',
                value: data.name
            });
        }
        if(data.slug != undefined) {
            validationArr.push({
                method: 'page_slug',
                value: data.slug
            });
            validationArr.push({
                method: 'page_slug_blacklist',
                value: data.slug
            })
        }
        if(data.template != undefined) {
            validationArr.push({
                method: 'temp_verifyFileExists',
                value: data.template
            });
        }
        await validate(validationArr);

        // Create new object to update the page with
        let updatePageObj: const_page_updatePageObj = {
            last_edited: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        // Grab page from DB and check if whether its a post or page
        let checkPage = await db.one('SELECT * FROM pages WHERE _id=$1', _id);
        // If its a post it means we cant update the template
        if(checkPage.type === 'page') {
            if(data.template != undefined) updatePageObj.template = data.template;
        }
        // Set other data
        if(data.slug != undefined) {
            if(data.is_homepage) updatePageObj.slug = '/';
            else updatePageObj.slug = data.slug;
        }
        if(data.name != undefined) updatePageObj.name = data.name;
        if(data.has_parent != undefined) updatePageObj.has_parent = data.has_parent;
        if(data.parent_id != undefined) updatePageObj.parent_id = data.parent_id;
        if(data.is_homepage != undefined) updatePageObj.is_homepage = data.is_homepage;
        if(data.post_type_id != undefined) updatePageObj.post_type_id = data.post_type_id;

        // If we are setting the new page to is_homepage, check all other pages for is_homepage true and set to false;
        if(updatePageObj.is_homepage) await pageResetHandler('unset_is_homepage');
        // if the post_type_id is being set, unset the same one from other pages if it exists
        if(updatePageObj.post_type_id) await pageResetHandler('unset_post_type_id', updatePageObj.post_type_id);

        // Check if the page is changing its parent or slug!
        if(checkPage.slug != updatePageObj.slug || checkPage.parent_id != updatePageObj.parent_id) {
            // Update
            await db.none(`UPDATE pages SET ${__updateSetQueryGen(updatePageObj)} WHERE _id='${_id}'`, updatePageObj);
        }
        else {
            // Update
            await db.none(`UPDATE pages SET ${__updateSetQueryGen(updatePageObj)} WHERE _id='${_id}'`, updatePageObj);
        }

        // Get page
        let page = await getSingle(true, _id);
        return page;

    }
    catch(err) {
        throw(err)
    }
}

// Delete page
export const deleteSingle = async (_id: mod_pageModel["_id"]) => {
    try {
        // Update all childrent with parent_id of _id to parent false and parent_id NULL
        await db.none('UPDATE pages SET has_parent=${has_parent}, parent_id=${parent_id} WHERE parent_id=${_id}', {
            has_parent: false,
            parent_id: null,
            _id: _id
        });
        // Delete all data related to the page
        await db.none('DELETE FROM pages WHERE _id=$1', _id);
        return {
            deleted: true
        }
    }
    catch(err) {
        throw err;
    }
}

// Handles resetting certain data for the page
export const pageResetHandler = async (action: 'unset_is_homepage' | 'unset_post_type_id', data?: any) => {
    try {
        switch(action) {
            case 'unset_is_homepage': {
                // find the current page that has is_homepage = true and set to false
                let page = await db.oneOrNone(`UPDATE pages SET is_homepage=false WHERE is_homepage=true RETURNING *`);
                if(page) {
                    // set the pages slug 
                    await db.none('UPDATE pages SET slug=${slug} WHERE _id=${_id}', {
                        slug: generateSlug(),
                        _id: page._id
                    });
                }
                return true;
            }
            case 'unset_post_type_id': {
                // unset all pages post_type_id that match data
                await db.none(`UPDATE pages SET post_type_id=NULL WHERE post_type_id=$1`, data);
                return true;
            }
        }
    }
    catch(err) {
        throw err;
    }
}

interface pageSearchRes {
    name: mod_pageModel["name"]
    slug: mod_pageModel["slug"]
    has_parent: mod_pageModel["has_parent"]
    parent_id: mod_pageModel["parent_id"]
    _id: mod_pageModel["_id"]
}
// page serach via partial name, return array and page slug
export const pageSearch = async (query: string, fullSlug: boolean, allowHome: boolean, type: 'page' | 'post' | 'all') => {
    try {
        let matches: Array<pageSearchRes>;
        if(type === 'all') {
            matches = await db.manyOrNone("SELECT _id, name, slug, has_parent, parent_id FROM pages WHERE levenshtein(${query}, name) <= 5 ORDER BY levenshtein(${query}, name) LIMIT 4", {
                query: query
            });
        }
        else {
            matches = await db.manyOrNone("SELECT _id, name, slug, has_parent, parent_id FROM pages WHERE type=${type} AND levenshtein(${query}, name) <= 5 ORDER BY levenshtein(${query}, name) LIMIT 4", {
                query: query,
                type: type
            });
        }

        const pageFullSlug = async (_id: mod_pageModel["_id"], slug: mod_pageModel["slug"]) => {
            try {
                // Query for parent slug
                let res = await db.one('SELECT slug, has_parent, parent_id FROM pages WHERE _id=$1', _id);
                slug = '/'+res.slug + slug;
                if(res.has_parent) slug = await pageFullSlug(res.parent_id, slug);
                return slug;
            }
            catch(err) {
                throw err;
            }
        }

        if(!allowHome) {
            let homePageInd = matches.findIndex( x => x.slug === '/');
            if(homePageInd != -1) matches.splice(homePageInd, 1);
        }

        if(fullSlug) {
            for await (const match of matches) {
                match.slug = '/'+match.slug;
                // For each match, if its has a parent recursivly query for the parent slug and prepend to child slug
                if(match.has_parent) {
                    match.slug = await pageFullSlug(match.parent_id, match.slug);
                }
            }
        }
      
        return matches;
    }
    catch(err) {
        throw err;
    }
}

// Find page via post  ID
export const getSinglePageViaPostId = async (_id: cont_post_postDeclaration["_id"]) => {
    try {
        // Get page
        let page = await db.one('SELECT * FROM pages WHERE post_type_id=$1', _id);
        return page;
    }
    catch(err) {
        throw err;
    }
}

// Get page live url
export const getPathLiveURL = async (_id: mod_pageModel["_id"]) => {
    try {
        const page = await db.one('SELECT is_homepage, has_parent, slug, type, parent_id, post_name FROM pages WHERE _id=$1', _id);
        const path = await __buildPageLivePath(page);
        return {
            url: config.app_urL + path
        }
    }
    catch(err) {
        throw err;
    }
}