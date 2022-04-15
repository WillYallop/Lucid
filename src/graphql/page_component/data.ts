import db from '../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
// Controller
import { componentController, contentTypeController } from '../../index';
import { getPageComponentContentTypeData, getPageComponentsGroups } from '../content_type_fields/data';



// Add multiple page components
export const addMultiplePageComponents = async (pageComps: Array<cont_page_addPageComponentInp>, pageId: mod_pageModel["_id"]) => {
    try {
        const savedPages = [];
        if(pageComps.length > 0) {
            for await (const pageComp of pageComps) {
                const savePageRes = await db.one('INSERT INTO page_components(_id, page_id, component_id, position) VALUES(${_id}, ${page_id}, ${component_id}, ${position}) RETURNING *', {
                    _id: pageComp._id,
                    page_id: pageId,
                    component_id: pageComp.component_id,
                    position: pageComp.position
                });
                savedPages.push(savePageRes);
            }   
            // Update pages last edited stat
            await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${pageId}'`);
        }
        return savedPages;
    }
    catch(err) {
        throw err;
    }
}

// Update multiple page components
export const updateMultiplePageComponents = async (pageComps: Array<cont_page_updatePageComponentInp>, pageId: mod_pageModel["_id"]) => {
    try {
        const updatedPages = [];
        if(pageComps.length > 0) {
            for await (const pageComp of pageComps) {
                // We can only update the position atm
                let updatePageComponentObj: const_page_updatePageComponentUpdateObj = {};
                if(pageComp.position != undefined) updatePageComponentObj.position = pageComp.position;
                const updatePageRes = await db.one(`UPDATE page_components SET ${__updateSetQueryGen(updatePageComponentObj)} WHERE _id='${pageComp._id}' RETURNING *`, updatePageComponentObj);
                updatedPages.push(updatePageRes);
            }   
            // Update pages last edited stat
            await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${pageId}'`);
        }
        return updatedPages;
    }
    catch(err) {
        throw err;
    }
}

// Get All page components
export const getAllPageComponents = async (page_id: mod_pageModel["_id"]) => {
    try {
        /*
            {
                page_components: [
                    {
                        _id: 
                        page_id: 
                        component_id:
                        position: 
                        component: {
                            _id: 
                            name: 
                        }
                        content_types: [
                            {
                                _id: 
                                name: 
                                type: 
                                config: {

                                }
                            }
                        ],
                        groups: [
                            {
                                _id: 
                                page_component_id: 
                                parent_group: 
                                parent_config_id: 
                                position: 
                            }
                        ],
                        data: [
                            {
                                page_component_id: 
                                config_id:
                                value: 
                                group_id:
                            }
                        ]
                    }
                ]
            }
        */
        // Get all page components
        let pageComponents: Array<mod_pageComponentsModel> = await db.manyOrNone('SELECT * FROM page_components WHERE page_id=$1 ORDER BY position ASC', page_id);
        if(pageComponents.length) {
            const componentDataMap = new Map();
            for await(let pageComp of pageComponents) {
                // Ensure we only query for a component and its content types once.
                if(componentDataMap.get(pageComp.component_id) === undefined) {
                    let component = await componentController.getSingleByID(pageComp.component_id);
                    let content_types = await contentTypeController.getAll(pageComp.component_id);
                    componentDataMap.set(pageComp.component_id, {
                        component: component,
                        content_types: content_types
                    })
                }
                // Assign component and get data
                let componentDatas = componentDataMap.get(pageComp.component_id);
                pageComp.component = componentDatas.component;
                pageComp.content_types = componentDatas.content_types;
                let data = await getPageComponentContentTypeData(pageComp._id);
                pageComp.data = data;
                let groups = await getPageComponentsGroups(pageComp._id);
                pageComp.groups = groups;
            }
        }
        return pageComponents;
    }
    catch(err) {
        throw err;
    }
}

// Get single page component
export const getSingle = async (_id: mod_pageComponentsModel["_id"]) => {
    try {
        const pageComponent: mod_pageComponentsModel = await db.oneOrNone('SELECT * FROM page_components WHERE _id=$1', _id);
        let component = await componentController.getSingleByID(pageComponent.component_id);
        let content_types = await contentTypeController.getAll(pageComponent.component_id);
        // Assign component and get data
        pageComponent.component = component;
        pageComponent.content_types = content_types;
        let data = await getPageComponentContentTypeData(pageComponent._id);
        pageComponent.data = data;
        let groups = await getPageComponentsGroups(pageComponent._id);
        pageComponent.groups = groups;

        return pageComponent;
    }
    catch(err) {
        throw err;
    }
}

// Delete multiple corresponding page_component table rows
export const deleteMultiplePageComponenets = async (ids: Array<mod_pageComponentsModel>) => {
    try {
        let response = [];
        for await (const id of ids) {
            await db.none('DELETE FROM page_components WHERE _id=$1', id);
            response.push({ deleted: true });
        }
        return response;
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