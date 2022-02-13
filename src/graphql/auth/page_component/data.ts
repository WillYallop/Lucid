import db from '../../../db';
import moment from 'moment';
import { __updateSetQueryGen } from '../shared/functions';
// Controller
import { componentController, contentTypeController } from '../../../index';
import { saveSingleContentType, getSingleContentType } from '../content_type/data';


// let content_types = await contentTypeController.getAll(component_id);
// if(content_types != undefined) {
//     for await(const contentType of content_types) {
//         if(contentType.type != 'repeater') {
//             // Save a new empty table row for the correct content type
//             await saveSingleContentType(savePageComponentRes._id, contentType);
//         }
//     }
//     return {
//         _id: savePageComponentRes._id,
//         component_id: savePageComponentRes.component_id,
//         position: savePageComponentRes.position
//     }
// }


// Handle adding and updating a page component and its content types
export const addAndUpdatePageComponent = async (pageComp: cont_page_addUpdatePageComponentInp,) => {
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

        // Handle creating/updating content type data objs


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
                                data: 
                                group_id
                                config: {

                                }
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
                // Assign component and get content type data
                let componentDatas = componentDataMap.get(pageComp.component_id);
                pageComp.component = componentDatas.component;
                for await(let contentType of componentDatas.content_type) {
                    let { data, group_id } = await getSingleContentType(pageComp._id, contentType);
                    contentType.data = data;
                    contentType.group_id = group_id;
                }
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