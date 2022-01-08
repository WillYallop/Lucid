import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';

// Controllers
import { getSingleSEO, saveSingleSEO } from '../seo/data';
import { componentController, contentTypeController } from '../../../index';


// Get single page
export const getSingle = async (_id: mod_pageModel["_id"]) => {
    try {

        // Get page
        let page = await db.one('SELECT * FROM pages WHERE _id=$1', _id);
        // Get SEO Object
        page.seo = await getSingleSEO(_id);

        // Get pages components
        // Query DB for pages saved components
        let pageComponents: Array<sch_pageDBComponent> = await db.manyOrNone('SELECT * FROM page_components WHERE page_id=$1', page._id);

        // Based on component_id in that, grab all corresponding component and content_types config from the theme directory
        let componentsArray: Array<mod_pageModelComponent> = [];
        for await(const pageComponent of pageComponents) {
            let { component } = await componentController.getSingleByID(pageComponent.component_id);
            let { content_types } = await contentTypeController.getAll(pageComponent.component_id);
            
            if(component === undefined) throw 'Component undefined.';
            if(content_types === undefined) throw 'Content Types undefined.';

            let contentTypesArray: Array<mod_pageModelComponentContentType> = [];
            // Build out content type array
            for await(const contentType of content_types) {
                let contentTypeData = pageComponent.component_data.find( x => x.config_id === contentType._id );
                if(contentTypeData) {
                    contentTypesArray.push({
                        config_id: contentType._id,
                        name: contentType.name,
                        type: contentType.type,
                        config: contentType.config,
                        data: contentTypeData.data
                    })
                }
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


INSERT INTO page_components(page_id, component_id, component_data)
VALUES ('e6422602-7091-11ec-b80c-7b4399a42990', '74cd38a0-6415-11ec-bc21-d53d7ba49e21', '[
    {
        "config_id": "2d3e64d0-64fd-11ec-8688-635a3ff32370",
        "data": "This is a title"
    },
    {
        "config_id": "445a92a0-64fe-11ec-aab2-15b263b74864",
        "data": "This is the description"
    }
]')
RETURNING *;

*/