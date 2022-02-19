import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
// Controller
import { componentController, contentTypeController } from '../../../index';
import { getPageComponentContentTypeData } from '../content_type_fields/data';


// Handle adding and updating a page component and its content types
export const addAndUpdatePageComponent = async (pageComp: cont_page_addUpdatePageComponentInp) => {
    try {

        let savePageComponentRes: mod_pageComponentsModel;
        // UPDATE
        if(pageComp._id != undefined) {
            // We can only update the position atm
            let updatePageComponentObj: const_page_updatePageComponentUpdateObj = {};
            if(pageComp.position != undefined) updatePageComponentObj.position = pageComp.position;
            savePageComponentRes = await db.one(`UPDATE page_components SET ${__updateSetQueryGen(updatePageComponentObj)} WHERE _id='${pageComp._id}' RETURNING *`, updatePageComponentObj);
        }   
        // CREATE
        else {
            savePageComponentRes = await db.one('INSERT INTO page_components(page_id, component_id, position) VALUES(${page_id}, ${component_id}, ${position}) RETURNING *', {
                page_id: pageComp.page_id, // reference will verify if this exists
                component_id: pageComp.component_id,
                position: pageComp.position
            });
        }

        // Update pages last edited stat
        await db.none(`UPDATE pages SET last_edited='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE _id='${savePageComponentRes.page_id}'`);

        return savePageComponentRes
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
        let pageComponents: Array<mod_pageComponentsModel> = await db.manyOrNone('SELECT * FROM page_components WHERE page_id=$1', page_id);
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
                let data = await getPageComponentContentTypeData(pageComp._id);
                pageComp.data = data;
            }
        }
        return pageComponents;
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