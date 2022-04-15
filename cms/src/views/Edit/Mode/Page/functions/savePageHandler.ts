import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import axios from 'axios';
import getApiUrl from '../../../../../functions/getApiUrl';


// Handles generating the query to update the page
export const savePageHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_pageQueryObj = {
            mutation: {
                page: {
                    update_single: {
                        __args: {
                            _id: page._id
                        },
                        _id: true,
                        template: true
                    }
                }
            }
        };
        // template
        if(updateConfig.template) {
            send = true;
            queryObject.mutation.page.update_single.__args.template = page.template;
        }
        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';
        // 
        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while updating the page');
            return {
                send: send, 
                query: query,
                data: data
            }
        } 
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handles generating the query to update the seo 
export const saveSEOHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_seoQueryObj = {
            mutation: {
                seo: {
                    update_single: {
                        __args: {
                            page_id: page._id
                        },
                        page_id: true,
                        title: true,
                        description: true,
                        canonical: true,
                        robots: true,
                        og_type: true,
                        og_title: true,
                        og_description: true,
                        og_image: true,
                        twitter_card: true,
                        twitter_title: true,
                        twitter_description: true,
                        twitter_image: true,
                        twitter_creator: true,
                        twitter_site: true,
                        twitter_player: true
                    }
                }
            }
        };

        for (const key in updateConfig.seoFields) {
            // @ts-expect-error
            if(updateConfig.seoFields[key]) {
                send = true;
                // @ts-expect-error
                queryObject.mutation.seo.update_single.__args[key] = page.seo[key];
            }
        }

        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';
        // 
        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while updating the seo');
            return {
                send: send, 
                query: query,
                data: data
            }
        } 
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    } 
}

// Handles generating the query for all of the page components
export const savePageComponentsHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_pageComponentsQueryObj = {
            mutation: {
                page_components: {
                    update_multiple: {
                        __args: {
                            page_id: page._id,
                            page_components: []
                        },
                        _id: true,
                        page_id: true,
                        component_id: true,
                        position: true
                    },
                    add_multiple: {
                        __args: {
                            page_id: page._id,
                            page_components: []
                        },
                        _id: true,
                        page_id: true,
                        component_id: true,
                        position: true
                    }
                }
            }
        };
        // If updateConfig.componentPositions is true
        // For components that have not being added in this session create 
        page.page_components.forEach((pageComp) => {
            // Check if its a new component
            const newComponent = updateConfig.addComponents.findIndex( x => x === pageComp._id );
            // component position is the only thing that can be updated!
            if(updateConfig.componentPositions && newComponent === -1) {
                send = true;
                queryObject.mutation.page_components.update_multiple.__args.page_components.push({
                    _id: pageComp._id,
                    position: pageComp.position
                });
            }
            else {
                // If it a new component
                if(newComponent !== -1) {
                    send = true;
                    queryObject.mutation.page_components.add_multiple.__args.page_components.push({
                        _id: pageComp._id,
                        position: pageComp.position,
                        component_id: pageComp.component_id,
                        page_id: pageComp.page_id
                    });
                }
            }
        });

        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';

        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while updating the saving the page components');
            console.log(data);
            return {
                send: send, 
                query: query,
                data: data
            }
        }
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handle generating the query responsible for deleting page components
export const deletePageComponentsHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_deletePageComponentQueryObj = {
            mutation: {
                page_components: {
                    delete_multiple: {
                        __args: {
                            page_component_ids: []
                        },
                        deleted: true
                    }
                }
            }
        };

        updateConfig.deleteComponents.forEach((_id) => {
            send = true;
            queryObject.mutation.page_components.delete_multiple.__args.page_component_ids.push(_id);
        });

        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';

        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while deleting the page component');
            return {
                send: send, 
                query: query,
                data: data
            }
        }
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handles generating the query for the content_type_field_group table
export const saveGroupsHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_groupQueryObj = {
            mutation: {
                content_type_field : {
                    save_multiple_groups: {
                        __args: {
                            groups: []
                        },
                        _id: true
                    }
                }
            }
        };  

        // loop over group data and push to query object
        const handleGroupData = (groupData: Array<mod_contentTypeFieldGroupModel>) => {
            send = true;
            groupData.forEach((group) => {
                let obj: mod_contentTypeFieldGroupModel = {
                    _id: group._id,
                    page_component_id: group.page_component_id ,
                    position: group.position
                };
                if(group.parent_group != undefined) obj.parent_group = group.parent_group;
                if(group.parent_config_id != undefined) obj.parent_config_id = group.parent_config_id;
                queryObject.mutation.content_type_field.save_multiple_groups.__args.groups.push(obj);
            });
        }

        // add group data for modified components.
        updateConfig.modifiedComponents.forEach((compID) => {
            // Find the coressponding page component and
            const pageComp = page.page_components.find( x => x._id === compID);
            if(pageComp != undefined) handleGroupData(pageComp.groups);
        });
        // add group data for new components.
        updateConfig.addComponents.forEach((compID) => {
            const pageComp = page.page_components.find( x => x._id === compID);
            if(pageComp != undefined) handleGroupData(pageComp.groups);
        });


        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';

        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while saving the groups data');
            return {
                send: send, 
                query: query,
                data: data
            }
        }
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handles generating the query responsible for delteing the groups
export const deleteGroupsHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_deleteGroupQueryObj = {
            mutation: {
                content_type_field: {
                    delete_multiple_groups: {
                        __args: {
                            groups_ids: []
                        },
                        deleted: true
                    }
                }
            }
        };

        updateConfig.deleteGroups.forEach((_id) => {
            send = true;
            queryObject.mutation.content_type_field.delete_multiple_groups.__args.groups_ids.push(_id);
        });

        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';

        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while deleting groups');
            return {
                send: send, 
                query: query,
                data: data
            }
        }
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}

// Handles generating the query for the content type, component field data
export const saveFieldDataHandler = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_fieldDataQueryObj = {
            mutation: {
                content_type_field : {
                    save_multiple_fields: {
                        __args: {
                            page_id: page._id,
                            fields_data: []
                        },
                        page_component_id: true,
                        config_id: true,
                        value: true,
                        group_id: true
                    }
                }
            }
        };  

        // loop over data and push to query object
        const handleFieldData = (data: Array<mod_contentTypesDatabaseModel>, contentTypes: Array<mod_contentTypesConfigModel>) => {
            send = true;
            data.forEach((fieldData) => {
                // get contentType type
                const contentType = contentTypes.find( x => x._id === fieldData.config_id );
                if(contentType != undefined) {
                    let obj: sapa_gen_fieldDataQueryFieldDataObj = {
                        page_component_id: fieldData.page_component_id,
                        config_id: fieldData.config_id,
                        type: contentType.type,
                        value: fieldData.value,
                        root: fieldData.root
                    }
                    if(typeof fieldData.value === 'number') obj.value = obj.value.toString();
                    if(obj.type === 'repeater') delete obj.value;
                    if(fieldData.group_id != undefined) obj.group_id = fieldData.group_id;
                    queryObject.mutation.content_type_field.save_multiple_fields.__args.fields_data.push(obj);
                }
            });
        }

        // add group data for modified components.
        updateConfig.modifiedComponents.forEach((compID) => {
            // Find the coressponding page component and
            const pageComp = page.page_components.find( x => x._id === compID);
            if(pageComp != undefined) handleFieldData(pageComp.data, pageComp.content_types);
        });
        // add group data for new components.
        updateConfig.addComponents.forEach((compID) => {
            const pageComp = page.page_components.find( x => x._id === compID);
            if(pageComp != undefined) handleFieldData(pageComp.data, pageComp.content_types);
        });

        // Generate query string
        const query = send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : '';

        if(send) {
            const data = await __sendQuery(query, 'an unexpeted error occured while saving the fields data');
            return {
                send: send, 
                query: query,
                data: data
            }
        }
        else {
            return {
                send: send,
                query: query
            }
        }
    }
    catch(err) {
        throw err;
    }
}



// handle sending off the query
const __sendQuery = async (query: string, error: string) => {
    try {
        let res = await axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: query
            }
        });
        let data = res.data;
        return data;
    }
    catch(err) {
        throw err;
    }
}