import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
import { generateSlug } from "random-word-slugs";

// Controllers
import { getSingleSEO, saveSingleSEO } from '../seo/data';
import { getSingleContentType } from '../content_type/data';
import { componentController, contentTypeController } from '../../../index';
import { __generateErrorString } from '../../../controller/helper/shared';



// Get single page
export const getSingle = async (_id: mod_pageModel["_id"]) => {
    try {

        // Get page
        let page = await db.one('SELECT * FROM pages WHERE _id=$1', _id);
        // Get SEO Object
        page.seo = await getSingleSEO(_id);

        // For each component
        // For each content type row for pages - no matter the type
        // Loop over them and find the matching content type config form the theme and merge them into one obj
        let pageComponents: Array<mod_pageComponentsModel> = await db.manyOrNone('SELECT * FROM page_components WHERE page_id=$1', _id);
        let componentsArray: Array<mod_pageModelComponent> = [];
        for await(const pageComponent of pageComponents) { 
            let component = await componentController.getSingleByID(pageComponent.component_id);
            let content_types = await contentTypeController.getAll(pageComponent.component_id);
            // Throw if not found
            if(component === undefined) throw 'Component undefined.';
            if(content_types === undefined) throw 'Content Types undefined.';
            // Find all content type data for this component
            let contentTypesArray: Array<mod_pageModelComponentContentType> = [];
            for await(const contentType of content_types) {
                // Find component_content_type_ table data based on configs id and component_id
                // components config shoudl be the source of truth for what page component data to query
                let componentsContentTypeData = await getSingleContentType(pageComponent._id, contentType);
                // Set data based on the content type
                if(componentsContentTypeData) contentTypesArray.push(componentsContentTypeData);
            }

            // Create page component object
            let obj: mod_pageModelComponent = {
                _id: component._id,
                page_components_id: pageComponent._id,
                file_name: component.file_name,
                file_path: component.file_path,
                name: component.name,
                description: component.description,
                preview_url: component.preview_url,
                date_added: component.date_added,
                date_modified: component.date_modified,
                content_types: contentTypesArray
            }
            componentsArray.push(obj)
        }

        // Build into object and store in page.components
        page.components = componentsArray;
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
            og_title: data.name,
            og_description: "",
            og_image: ""
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
        let page = await getSingle(_id);
        return page;

    }
    catch(err) {
        throw(err)
    }
}

// Delete page
export const deleteSingle = async (_id: mod_pageModel["_id"]) => {
    try {
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
                db.none(`UPDATE pages SET post_type_id=NULL WHERE post_type_id=$1`, data);
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
export const pageSearch = async (query: string) => {
    try {
        let matches: Array<pageSearchRes> = await db.manyOrNone("SELECT _id, name, slug, has_parent, parent_id FROM pages WHERE type=${type} AND levenshtein(${query}, name) <= 5 ORDER BY levenshtein(${query}, name) LIMIT 4", {
            query: query,
            type: 'page'
        });
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
        for await (const match of matches) {
            match.slug = '/'+match.slug;
            // For each match, if its has a parent recursivly query for the parent slug and prepend to child slug
            if(match.has_parent) {
                match.slug = await pageFullSlug(match.parent_id, match.slug);
            }
        }

        let homePageInd = matches.findIndex( x => x.slug === '/');
        if(homePageInd != -1) matches.splice(homePageInd, 1);
      
        return matches;
    }
    catch(err) {
        throw err;
    }
}