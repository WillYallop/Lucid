import { updateDataObjInterface } from '../index';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';


// Handles generating the query to update the page
const gen_pageQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_pageQueryObj = {
            mutation: {
                page: {
                    update_single: {
                        __args: {
                            _id: 'id'
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

        return {
            send: send,
            query: send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for all of the page components
const gen_pageComponentsQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
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
        return {
            send: send,
            query: send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handle generating the query responsible for deleting page components
const gen_deletePageComponentQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_deletePageComponentQueryObj = {
            mutation: {
                page_components: {
                    delete_multiple: {
                        __args: {
                            data: []
                        },
                        deleted: true
                    }
                }
            }
        };

        updateConfig.deleteComponents.forEach((_id) => {
            queryObject.mutation.page_components.delete_multiple.__args.data.push(_id);
        });

        return {
            send: send,
            query: send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content_type_field_group table
const gen_groupQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
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
                queryObject.mutation.content_type_field.save_multiple_groups.__args.groups.push(group);
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

        return {
            send: send,
            query: send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}

// Handles generating the query for the content type, component field data
const gen_fieldDataQuery = async (page: mod_pageModel, updateConfig: updateDataObjInterface): Promise<sapa_queryGenRes> => {
    try {
        let send = false;
        let queryObject: sapa_gen_fieldDataQueryObj = {
            mutation: {
                content_type_field : {
                    update_multiple_fields: {
                        __args: {
                            page_id: page._id,
                            fields_data: []
                        },
                        _id: true
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
                    queryObject.mutation.content_type_field.update_multiple_fields.__args.fields_data.push({
                        page_component_id: fieldData.page_component_id,
                        config_id: fieldData.config_id,
                        type: contentType.type,
                        value: fieldData.value,
                        group_id: fieldData.group_id
                    });
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

        return {
            send: send,
            query: send ? jsonToGraphQLQuery(queryObject, { pretty: true }) : ''
        }
    }
    catch(err) {
        throw(err);
    }
}



export {
    gen_pageQuery,
    gen_pageComponentsQuery,
    gen_deletePageComponentQuery,
    gen_groupQuery,
    gen_fieldDataQuery
}