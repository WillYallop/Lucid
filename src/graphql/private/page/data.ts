import mongoose from 'mongoose';

//
import { componentController, contentTypeController } from 'lucid-core';

// Schemas
import Page from './schema';
import SEO from '../seo/schema';
import PageComponents from '../page_component/schema';

// Get single page
export const getSingle = async (_id: mod_pageModel["_id"]) => {
    try {
        // Get page
        let page = await Page.findById(_id);
        // Get SEO Object
        page.seo = await SEO.findOne({ page_id: page._id });


        // Get pages components
        // Query DB for pages saved components
        let pageComponents: Array<sch_pageDBComponent> = await PageComponents.find({ page_id: page._id });
        // Based on component_id in that, grab all corresponding component and content_types config from the theme directory
        let componentsArray: Array<mod_pageModelComponent> = [];
        for await(const pageComponent of pageComponents) {
            let { component } = await componentController.getSingleByID(pageComponent.component_id);
            let { content_types } = await contentTypeController.getAll(pageComponent.component_id);
  
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
        if(type === 'post') pages = await Page.find({ type: type, post_name: post_name }).skip(skip).limit(limit);
        else pages = await Page.find({ type: type }).skip(skip).limit(limit);
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
        let newPageObj = {
            _id: new mongoose.Types.ObjectId,
            template: data.template,
            slug: data.slug,
            name: data.name,
            type: data.type,
            has_parent: data.has_parent,
            author: data.author,
            is_homepage: data.is_homepage
        };
        if(data.type === 'post' && data.post_name) newPageObj['post_name'] = data.post_name;
        if(data.has_parent && data.parent_id) newPageObj['parent_id'] = data.parent_id;
        // Save page
        let page = await new Page(newPageObj).save();

        // SEO Object
        let newSEOObj = {
            _id: new mongoose.Types.ObjectId,
            page_id: newPageObj._id,
            title: data.name,
            description: '',
            og_title: data.name,
            og_description: '',
            og_image: ''
        }
        // Save seo
        let seo = await new SEO(newSEOObj).save();
        page['seo'] = seo;

        return page;
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
            last_edited: new Date().toString()
        };
        // Grab page from DB and check if whether its a post or page
        let checkPage = await Page.findById(_id);
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
        let pageUpdated = await Page.updateOne({ _id: _id }, updatePageObj);

        // Get page
        let page = await getSingle(_id);
        return page;

    }
    catch(err) {
        throw(err)
    }
}

// Delete page
export const deleteSingle = async () => {

}