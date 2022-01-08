import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Controllers
import { getSingleSEO, saveSingleSEO } from '../seo/data';
import { getSingleContentType } from '../content_type/data';
import { componentController, contentTypeController } from '../../../index';


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
        let pageComponents: Array<const_page_pageComponentsRes> = await db.manyOrNone('SELECT * FROM page_components WHERE page_id=$1', _id);
        let componentsArray: Array<mod_pageModelComponent> = [];
        for await(const pageComponent of pageComponents) { 
            let { component } = await componentController.getSingleByID(pageComponent.component_id);
            let { content_types } = await contentTypeController.getAll(pageComponent.component_id);
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
            slug: data.slug,
            name: data.name,
            type: data.type,
            has_parent: data.has_parent,
            author: data.author,
            is_homepage: data.is_homepage,
            date_created: moment().format('YYYY-MM-DD HH:mm:ss'),
            last_edited: moment().format('YYYY-MM-DD HH:mm:ss'),
            post_name: undefined,
            parent_id: undefined
        };

        if(data.type === 'post' && data.post_name) newPageObj['post_name'] = data.post_name;
        if(data.has_parent && data.parent_id) newPageObj['parent_id'] = data.parent_id;

        // Save page row
        let getPageRes = await db.one('INSERT INTO pages(template, slug, name, type, post_name, has_parent, parent_id, date_created, last_edited, author, is_homepage) VALUES(${template}, ${slug}, ${name}, ${type}, ${post_name}, ${has_parent}, ${parent_id}, ${date_created}, ${last_edited}, ${author}, ${is_homepage}) RETURNING *', newPageObj);
        // Save SEO row
        getPageRes.seo = await saveSingleSEO({
            page_id: getPageRes._id,
            title: data.name,
            description: "",
            og_title: data.name,
            og_description: "",
            og_image: ""
        })

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
        if(data.slug != undefined) updatePageObj.slug = data.slug;
        if(data.name != undefined) updatePageObj.name = data.name;
        if(data.has_parent != undefined) updatePageObj.has_parent = data.has_parent;
        if(data.parent_id != undefined) updatePageObj.parent_id = data.parent_id;
        if(data.is_homepage != undefined) updatePageObj.is_homepage = data.is_homepage;

        // Update
        await db.none(`UPDATE pages SET ${__updateSetQueryGen(updatePageObj)} WHERE _id='${_id}'`, updatePageObj);

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
        let deletePage = await db.none('DELETE FROM pages WHERE _id=$1', _id);
        console.log(deletePage);
        return {
            deleted: true
        }
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